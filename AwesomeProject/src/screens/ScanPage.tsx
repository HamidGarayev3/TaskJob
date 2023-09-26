import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import { useIsFocused,useFocusEffect } from '@react-navigation/native'; // Import useIsFocused hook
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../components/store';
var base64 = require("base-64");
import { setScanTabActive } from '../components/tabSlice';


const ScanPage = ({ navigation }: any) => {
  let [inputValue, setInputValue] = useState('');
  const inputRef = useRef<TextInput>(null);
  const [status, setStatus] = useState('');
  const [itemName, setItemName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [Id, setId] = useState('');
  const [InPrice, setInPrice] = useState('');
  const [OutPrice, setOutPrice] = useState('');
  const [StockPrice, setStockPrice] = useState('');
  const [Stock, setStock] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [itemsHashTable, setItemsHashTable] = useState<{ [key: string]: any }>({});
  const isScanTabActive = useSelector((state: RootState) => state.tab.scanTabActive);
  
  // Use the useIsFocused hook to determine if the screen is focused
  const isScreenFocused = useIsFocused();

  const [rerenderKey, setRerenderKey] = useState(0);

  // useEffect(() => {
  //   // Add a focus event listener to the navigation
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // Focus the TextInput when the screen comes into focus
  //     if (inputRef.current) {
  //       inputRef.current.focus();
  //     }
  //   });

  //   // Return the cleanup function to unsubscribe from the event listener
  //   return unsubscribe;
  // }, [navigation,isScreenFocused]);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Clear input value when the screen comes into focus
  //     setInputValue('');
  //     // Focus the input when the screen comes into focus
  //     if (inputRef.current) {
  //       inputRef.current.focus();
  //     }
  //     console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
  //   }, [isScreenFocused])
  // );

  // Move the search logic to this useEffect, which triggers on inputValue changes
  useEffect(() => {
    if (inputValue) {
      console.log('Barcode:', inputValue);
      // Reset the input value after processing
      setInputValue('');
      fetchItemDetails(inputValue); // Send request every time input value changes
    }
  }, [inputValue]);
  const [focusState, setFocusState] = useState(false); // Focus state

  useEffect(() => {
    if (isScreenFocused) {
      // When the screen is focused, set focusState to true
      setFocusState(true);

      // Focus the TextInput when the screen comes into focus
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      // When the screen is unfocused, set focusState to false
      setFocusState(false);
      
    }
  }, [isScreenFocused, inputValue]);

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

  let handleInputChange = (text: string) => {
    console.log('Input Value Changed:', text);
  
    setInputValue(text);
    console.log("setting input value here");
    
    // Move the fetchItemDetails call to a separate useEffect
  };
  useEffect(() => {
    createHashTable();
  }, []);
  useEffect(() => {
    if (inputValue) {
      console.log('Barcode:', inputValue);
      // Reset the input value after processing
      setInputValue('');
      console.log("calling the dog");
      
      fetchItemDetails(inputValue); // Send request every time input value changes
    }
  }, [inputValue]);



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
      console.log(barcode, "im here")
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
        setId(foundItem.ID)

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
        
        //const clearItem =foundItem('')
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
  }, [inputValue]);

  const { api, username, password } = useSelector((state: RootState) => state.service);

  const handlePricePrintPress = async (type: 'Price' | 'Print') => {
    try {
      setIsLoading(true);

      const data = {
        TypReport: 'PriceCheker',
        Itemid: Id,
        Typ: type,
        
      };

      const jsonFilePath = `${RNFS.DocumentDirectoryPath}/request.json`;

      await RNFS.writeFile(jsonFilePath, JSON.stringify(data), 'utf8');

      // Make the API request here using your API and headers
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: "Basic " + base64.encode(username + ":" + password),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle the success response here
        Alert.alert('Request sent successfully');
        console.log(Id)
        await RNFS.unlink(jsonFilePath); // Delete the JSON file
      } else {
        // Handle the error response here
        Alert.alert('Error sending request');
      }
    } catch (error) {
      console.error('Error sending request:', error);
      Alert.alert('Error sending request');
    } finally {
      setIsLoading(false);
    }
  };
  const handleInputFocus = () => {
    console.log('active')
  };

  const handleInputBlur = () => {
    console.log('passiveee')

  };
 
  return (
    <View style={{ flex: 1, backgroundColor: '#1F1D2B' }}>
      <View style={{ display: 'none' }}>
      {focusState && (
        <TextInput
          ref={inputRef}
          value={inputValue}
          onChangeText={handleInputChange}
          style={{ height: 0 }}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          autoCapitalize="none"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          autoFocus={true}
        />
      )}
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
         onPress={() => handlePricePrintPress('Price')}
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
         onPress={() => handlePricePrintPress('Print')}
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
