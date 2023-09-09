import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, Animated, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import base64 from 'base-64';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../components/store';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface Item {
  Barcode: string;
  // Add other properties here if needed
}

interface JsonData {
  Item: Item[];
  // Add other properties here if needed
}

const Scan: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<TextInput>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const animatedDotsOpacity = useRef(new Animated.Value(0)).current;
  const [jsonData, setJsonData] = useState<JsonData | null>(null);

  const dispatch = useDispatch();
  const { api, username, password } = useSelector((state: RootState) => state.service);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (inputValue) {
      console.log(inputValue);
      // Perform any additional actions with the input value

      // Reset the input value after processing
      setInputValue('');
    }
  }, [inputValue]);

  useEffect(() => {
    const animateDots = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedDotsOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(animatedDotsOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    if (isLoading) {
      animateDots();
    } else {
      animatedDotsOpacity.setValue(0);
    }
  }, [isLoading, animatedDotsOpacity]);

  const handleInputChange = (text: string) => {
    setInputValue(text);
    fetchItemDetails(text); // Send request every time input value changes
  };

  const fetchItemDetails = async (barcode: string) => {
    try {
      setStatus('Sorğu başladı');

      if (jsonData) {
        // Get the Items array from the parsed data
        const itemsArray = jsonData.Item;

        if (itemsArray && itemsArray.length > 0) {
          // Find the item with the matching barcode
          const foundItem = itemsArray.find((item: Item) => item.Barcode === barcode);

          if (foundItem) {
            console.log('Item details:', foundItem);
            setStatus('Sorğu uğurlu oldu');
          } else {
            console.log('Item not found.');
            setStatus('Sorğu uğursuz oldu');
          }
        } else {
          console.log('Items array is empty or not found.');
          setStatus('Items array is empty or not found.');
        }
      } else {
        console.log('JSON data not available. Please import first.');
        setStatus('JSON data not available. Please import first.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Sorğu alınmadı');
    }
  };

  const getLastImportedJson = async () => {
    try {
      const fileUri = `${RNFS.DocumentDirectoryPath}/jsonData.json`;
      const fileContent = await RNFS.readFile(fileUri, 'utf8');

      if (fileContent) {
        const parsedData = JSON.parse(fileContent);
        setJsonData(parsedData);
        // console.log('Last imported JSON data loaded:', parsedData);
      }
    } catch (error) {
      console.error('Error reading JSON data:', error);
    }
  };

  const Import = async () => {
    let uname = 'sa';
    let pword = 'abc';

    try {
      setIsLoading(true);
      setStatus('Sorğu başladı');
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + base64.encode(`${username}:${password}`),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          typReport: 'Catalogs',
          Usr: { Name: 'Admin' },
        }),
      });

      if (response.ok) {
        console.log(api)
        console.log(username)
        console.log(password)

        setStatus('Sorğu uğurlu oldu');

        const jsonData = await response.json();
        setJsonData(jsonData); // Update jsonData state with the new data

        // Save the JSON data to AsyncStorage
        const fileUri = `${RNFS.DocumentDirectoryPath}/jsonData.json`;
        await RNFS.writeFile(fileUri, JSON.stringify(jsonData), 'utf8');
        console.log('JSON file saved to local storage:', fileUri);

        // Load the last imported JSON data after successfully saving it
        getLastImportedJson();
      } else {
        console.log(api)
        console.log(username)
        console.log(password)
        const errorMessage = 'Request failed. Please try again later.';
        setStatus('Sorğu uğursuz oldu');
        Alert.alert('Import Error', errorMessage);
        console.log(response.status, errorMessage);
      }
    } catch (error) {
      console.log(api)
      console.log(username)
      console.log(password)
      console.error('Error:', error);
      setStatus('Sorğu alınmadı');
      Alert.alert('Xəta', 'Giriş zamanı xəta baş verdi.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const savedApi = await AsyncStorage.getItem('api');
        const savedUsername = await AsyncStorage.getItem('username');
        const savedPassword = await AsyncStorage.getItem('password');

        if (savedApi) {
          dispatch({ type: 'service/setApi', payload: savedApi });
        }

        if (savedUsername) {
          dispatch({ type: 'service/setUsername', payload: savedUsername });
        }

        if (savedPassword) {
          dispatch({ type: 'service/setPassword', payload: savedPassword });
        }
      } catch (error) {
        console.error('Error fetching saved data:', error);
      }
    };

    fetchStoredData();
  }, []);

  const handleExport = async () => {
    try {
      setIsLoading(true);
      setStatus('Export başladı');
  
      const fileUri = `${RNFS.DocumentDirectoryPath}/qaimeler.json`;
  
      // Read the content of the JSON file
      const fileContent = await RNFS.readFile(fileUri, 'utf8');
  
      // Check if the file content is available
      if (fileContent) {
        // Remove all forward slashes from the JSON content
        const jsonString = JSON.stringify(JSON.parse(fileContent));
  
        // Prepare the request body as per your API structure
        const requestBody = {
          TypReport: 'Documents',
          Doc: jsonString,
        };
  
        // Send the request
        const response = await fetch(api, {
          method: 'POST',
          headers: {
            Authorization: 'Basic ' + base64.encode(`${username}:${password}`),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
  
        if (response.ok) {
          console.log('Export successful');
          console.log('Sent File-',jsonString);
  
          // Delete the JSON file from local storage
          // await RNFS.unlink(fileUri);
          console.log('JSON file deleted:', fileUri);
  
          setStatus('Export uğurlu oldu');
          console.log(JSON.parse(fileContent)); // Parse the JSON content here
        } else {
          console.log('Export failed');
          console.log('Sent File-',jsonString);
          setStatus('Export uğursuz oldu');
          // await RNFS.unlink(fileUri);
          console.log('JSON file deleted:', fileUri);
          Alert.alert('Export Error', 'Request failed. Please try again later.');
          console.log(response.status);
          console.log(JSON.parse(fileContent)); // Parse the JSON content here
        }
      } else {
        console.log('JSON file content not available.');
        setStatus('JSON file content not available.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Export alınmadı');
      Alert.alert('Error', 'An error occurred during export.');
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
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

      <View style={{ flex: 2.5, marginTop: 20, marginHorizontal: 20, marginBottom: 20, flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../assets&styles/menu.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        <Text style={{ marginLeft: 30, fontSize: 20, color: '#F4F9FD', fontWeight: '700' }}>Text ABC</Text>
      </View>

      <View style={{ flex: 8.6, paddingHorizontal: 20, flexDirection: 'row', marginBottom: 50 }}>
        <TouchableOpacity onPress={Import} disabled={isLoading} style={{ flex: 4.3, backgroundColor: '#F4F9FD', marginRight: 20, borderRadius: 8, flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('../assets&styles/download.png')}
            style={{ width: 30, height: 30 }}
          />
          <Text style={{ marginLeft: 10, fontSize: 20, color: '#1F1D2B', fontWeight: '700' }}>Import</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={handleExport} style={{ flex: 4.3, backgroundColor: '#F4F9FD', borderRadius: 8, flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('../assets&styles/upload.png')}
            style={{ width: 30, height: 30 }}
          />
          <Text style={{ marginLeft: 10, fontSize: 20, color: '#1F1D2B', fontWeight: '700' }}>Export</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 25, marginBottom: 50, marginHorizontal: 20 }}>
        <AnimatedTextInput
          editable={false}
          value={status}
          placeholderTextColor={'#F4F9FD'}
          style={{
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#F4F9FD',
            width: '100%',
            height: '100%',
            textAlignVertical: 'top',
            fontWeight: '500',
            fontSize: 16,
            color: '#F4F9FD',
          }}
          placeholder='Textline'
        />
        {isLoading && (
          <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#F4F9FD" />
          </View>
        )}
      </View>
    </View>
  );
};

export default Scan;
