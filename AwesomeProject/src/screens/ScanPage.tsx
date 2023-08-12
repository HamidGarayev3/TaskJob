import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import { useIsFocused,useFocusEffect } from '@react-navigation/native'; // Import useIsFocused hook

const ScanPage = ({ navigation }: any) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<TextInput>(null);
  const [status, setStatus] = useState('');
  const [itemName, setItemName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [InPrice, setInPrice] = useState('');
  const [OutPrice, setOutPrice] = useState('');
  const [StockPrice, setStockPrice] = useState('');
  const [Stock, setStock] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [itemsHashTable, setItemsHashTable] = useState<{ [key: string]: any }>({});

 useFocusEffect(
  React.useCallback(() => {
    // Code to run when the screen comes into focus
    // You can add your component initialization logic here
    // For example, you can reset your state variables
    
    setInputValue('');
    setStatus('');
    setItemName('');
    setBarcode('');
    setInPrice('');
    setOutPrice('');
    setStockPrice('');
    setStock('');
    setItemsHashTable({});

    // Return a cleanup function that will be run when the screen goes out of focus
    return () => {
      // Clean up logic, if needed
      // For example, you can reset state variables, clear timeouts, unsubscribe from subscriptions, etc.
      setInputValue('');
    setStatus('');
    setItemName('');
    setBarcode('');
    setInPrice('');
    setOutPrice('');
    setStockPrice('');
    setStock('');
    setItemsHashTable({});
    };
  }, [])
);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (inputValue) {
      console.log('Barcode:', inputValue);
      // Reset the input value after processing
      setInputValue('');
    }
  }, [inputValue]);

  useEffect(() => {
    createHashTable();
  }, []);

  const handleInputChange = (text: string) => {
    setInputValue(text);
    fetchItemDetails(text); // Send request every time input value changes
  };

  const createHashTable = async () => {
    const fileUri = `${RNFS.DocumentDirectoryPath}/jsonData.json`;
    const fileContent = await RNFS.readFile(fileUri, 'utf8');

    if (fileContent) {
      const parsedData = JSON.parse(fileContent);
      const itemsArray = parsedData.Item;

      if (itemsArray && itemsArray.length > 0) {
        const newItemsHashTable: { [key: string]: any } = {};
        itemsArray.forEach((item: any) => {
          newItemsHashTable[item.Barcode] = item;
        });
        setItemsHashTable(newItemsHashTable);
      }
    }
  };

  const fetchItemDetails = async (barcode: string) => {
    try {
      setIsLoading(true);
      setStatus('Sorğu başladı');

      const foundItem = itemsHashTable[barcode];
      if (foundItem) {
        console.log('Item details:', foundItem);
        setStatus('Sorğu uğurlu oldu');

        // Set the item details in the state
        setItemName(foundItem.Name);
        setBarcode(foundItem.Barcode);
        setInPrice(foundItem.InPrice);
        setOutPrice(foundItem.OutPrice);
        setStock(foundItem.Stock);
        setStockPrice(foundItem.StockPrice);

        // Save the item details to AsyncStorage
        const itemDetails = {
          itemName: foundItem.Name,
          barcode: foundItem.Barcode,
          inPrice: foundItem.InPrice,
          outPrice: foundItem.OutPrice,
          stock: foundItem.Stock,
          stockPrice: foundItem.StockPrice,
        };
        await AsyncStorage.setItem('lastItemDetails', JSON.stringify(itemDetails));
      } else {
        Alert.alert('Item not found')
        console.log('Item not found.');
        setStatus('Sorğu uğursuz oldu');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Sorğu alınmadı');
    } finally {
      setIsLoading(false);
    }
  };

  const getLastItemDetails = async () => {
    try {
      const lastItemDetails = await AsyncStorage.getItem('lastItemDetails');
      if (lastItemDetails) {
        const itemDetails = JSON.parse(lastItemDetails);
        setItemName(itemDetails.itemName);
        setBarcode(itemDetails.barcode);
        setInPrice(itemDetails.inPrice);
        setOutPrice(itemDetails.outPrice);
        setStock(itemDetails.stock);
        setStockPrice(itemDetails.stockPrice);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getLastItemDetails();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#1F1D2B' }}>
      <View style={{ display: 'none' }}>
        <TextInput
          ref={inputRef}
          value={inputValue}
          onChangeText={handleInputChange}
          style={{ height: 0 }}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>

      <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('../assets&styles/menu.png')} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ fontSize: 20, color: 'white', fontFamily: 'digital-7', marginLeft: 45, fontWeight: 'bold' }}>{barcode}</Text>
        </View>
      </View>

      <View style={{ flex: 3, paddingHorizontal: 20, marginTop: 30 }}>
        <View
          style={{
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#F4F9FD',
            width: '100%',
            height: '100%',
          }}>
          <Text
            style={{
              textAlignVertical: 'top',
              fontWeight: '500',
              fontSize: 12,
              color: '#F4F9FD',
              marginLeft: 7,
              marginTop: 7,
            }}>
            {itemName}
          </Text>
          <Text style={{ textAlignVertical: 'top', fontWeight: '500', fontSize: 12, color: '#91929E', marginLeft: 7 }}>
            {barcode}
          </Text>
        </View>
      </View>

      <View style={{ flex: 2 }}></View>

      <View style={{ flex: 2.4, flexDirection: 'row', paddingHorizontal: 20 }}>
        <TouchableOpacity
          style={{
            flex: 0.8,
            paddingHorizontal: 10,
            backgroundColor: '#FFA523',
            marginHorizontal: 5,
            borderRadius: 8,
            borderColor: 'white',
            borderWidth: 1,
          }}>
          <Text style={{ fontSize: 11, color: 'white', marginTop: 7 }}>maya deyeri</Text>
          <Text style={{ fontSize: 11, color: 'white', textAlign: 'center', alignSelf: 'center', marginTop: 12 }}>
            {StockPrice}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 0.8,
            paddingHorizontal: 10,
            backgroundColor: '#1F1D2B',
            marginHorizontal: 5,
            borderRadius: 8,
            borderColor: 'white',
            borderWidth: 1,
          }}>
          <Text style={{ fontSize: 11, color: 'white', marginTop: 7 }}>alış</Text>
          <Text style={{ fontSize: 11, color: 'white', textAlign: 'center', alignSelf: 'center', marginTop: 12 }}>
            {InPrice}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 0.8,
            paddingHorizontal: 10,
            backgroundColor: '#525298',
            marginHorizontal: 5,
            borderRadius: 8,
            borderColor: 'white',
            borderWidth: 1,
          }}>
          <Text style={{ fontSize: 11, color: 'white', marginTop: 7 }}>topdan</Text>
          <Text style={{ fontSize: 11, color: 'white', textAlign: 'center', alignSelf: 'center', marginTop: 12 }}>
            {StockPrice}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 2.4, flexDirection: 'row', paddingHorizontal: 20, marginTop: 10 }}>
        <TouchableOpacity
          style={{
            flex: 0.8,
            paddingHorizontal: 10,
            backgroundColor: '#1F1D2B',
            marginHorizontal: 5,
            borderRadius: 8,
            borderColor: 'white',
            borderWidth: 1,
          }}>
          <Text style={{ fontSize: 11, color: 'white', marginTop: 7 }}>qalıq</Text>
          <Text style={{ fontSize: 11, color: 'white', textAlign: 'center', alignSelf: 'center', marginTop: 12 }}>
            {Stock}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 0.8,
            paddingHorizontal: 10,
            backgroundColor: '#22B07D',
            marginHorizontal: 5,
            borderRadius: 8,
            borderColor: 'white',
            borderWidth: 1,
          }}>
          <Text style={{ fontSize: 10.5, color: 'white', marginTop: 7 }}>satış qiyməti</Text>
          <Text style={{ fontSize: 11, color: 'white', textAlign: 'center', alignSelf: 'center', marginTop: 12 }}>
            {OutPrice}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 0.8,
            paddingHorizontal: 10,
            backgroundColor: '#1F1D2B',
            marginHorizontal: 5,
            borderRadius: 8,
            borderColor: 'white',
            borderWidth: 1,
          }}>
          <Text style={{ fontSize: 11, color: 'white', marginTop: 7 }}>topdan</Text>
          <Text style={{ fontSize: 11, color: 'white', textAlign: 'center', alignSelf: 'center', marginTop: 12 }}>
            {StockPrice}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 2 }}></View>

      <View style={{ flex: 3, paddingHorizontal: 5, flexDirection: 'row', marginBottom: 50 }}>
        <TouchableOpacity
          style={{
            flex: 2.2,
            backgroundColor: '#F4F9FD',
            marginHorizontal: 15,
            borderRadius: 8,
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={require('../assets&styles/price.png')} style={{ width: 17.86, height: 17.86 }} />
          <Text style={{ marginLeft: 10, fontSize: 18, color: '#1F1D2B', fontWeight: '700' }}>Price</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 2.2,
            backgroundColor: '#F4F9FD',
            borderRadius: 8,
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 15,
          }}>
          <Image source={require('../assets&styles/print.png')} style={{ width: 17.86, height: 17.86 }} />
          <Text style={{ marginLeft: 10, fontSize: 18, color: '#1F1D2B', fontWeight: '700' }}>Print</Text>
        </TouchableOpacity>
      </View>

      {isLoading && (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}
    </View>
  );
};

export default ScanPage;
