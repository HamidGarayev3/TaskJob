import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, Image, TouchableOpacity, Alert, Animated } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
var base64 = require("base-64");

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Scan = ({ navigation }: { navigation: any }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (inputValue) {
      console.log('Barcode:', inputValue);
      // Perform any additional actions with the input value
  
      // Reset the input value after processing
      setInputValue('');
    }
  }, [inputValue]);

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const animatedDotsOpacity = useRef(new Animated.Value(0)).current;

 

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
        ]),
      ).start();
    };

    if (isLoading) {
      animateDots();
    } else {
      animatedDotsOpacity.setValue(0);
    }
  }, [isLoading, animatedDotsOpacity]);

  const Import = async () => {
    let uname = "sa";
    let pword = "abc";
  
    try {
      setIsLoading(true);
      setStatus('Sorğu başladı');
      const response = await fetch(`http://46.32.169.71/DEMO/hs/MobileApi/Connect`, {
        method: 'POST',
        headers: {
          Authorization: "Basic " + base64.encode(uname + ":" + pword),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "typReport": "Catalogs",
          "Usr": { "Name": 'Admin' }
        }),
      });
  
      if (response.ok) {
        setStatus('Sorğu uğurlu oldu');
  
        const jsonData = await response.json();
        const fileUri = `${RNFS.DocumentDirectoryPath}/jsonData.json`;
        await RNFS.writeFile(fileUri, JSON.stringify(jsonData), 'utf8');
        console.log('JSON file saved to local storage:', fileUri);
  
        // Retrieve the first data item from the JSON file
        const fileContent = await RNFS.readFile(fileUri, 'utf8');
        const parsedData = JSON.parse(fileContent);
        const firstDataItem = parsedData[0];
        console.log('First data item:', firstDataItem);
  
        // Perform further actions with the JSON file
        // You can navigate to another screen and access the file there
        navigation.navigate('Settings');
      } else {
        const errorMessage = 'Request failed. Please try again later.';
        setStatus('Sorğu uğursuz oldu');
        Alert.alert('Import Error', errorMessage);
        console.log(response.status, errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Sorğu alınmadı');
      Alert.alert('Xəta', 'Giriş zamanı xəta baş verdi.');
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
        <Text style={{ marginLeft: 30, fontSize: 20, color: '#F4F9FD', fontWeight: "700" }}>Text ABC</Text>
      </View>


      <View style={{ flex: 8.6, paddingHorizontal: 20, flexDirection: 'row', marginBottom: 50 }}>
        <TouchableOpacity onPress={Import} disabled={isLoading} style={{ flex: 4.3, backgroundColor: '#F4F9FD', marginRight: 20, borderRadius: 8, flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('../assets&styles/download.png')}
            style={{ width: 30, height: 30 }}
          />
          <Text style={{ marginLeft: 10, fontSize: 20, color: '#1F1D2B', fontWeight: "700" }}>Import</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 4.3, backgroundColor: '#F4F9FD', borderRadius: 8, flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('../assets&styles/upload.png')}
            style={{ width: 30, height: 30 }}
          />
          <Text style={{ marginLeft: 10, fontSize: 20, color: '#1F1D2B', fontWeight: "700" }}>Export</Text>
        </TouchableOpacity>
      </View>


      <View style={{ flex: 25, marginBottom: 50, marginHorizontal: 20 }}>
        <View style={{ position: 'relative' }}>
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
            <View style={{ position: 'absolute', bottom: '88.5%', right: 230, transform: [{ translateY: -8 }] }}>
              <Animated.Text style={{ opacity: animatedDotsOpacity, color: '#F4F9FD', fontSize: 20 }}>
                ...
              </Animated.Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Scan;
