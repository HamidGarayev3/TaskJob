import React, { useState,useEffect } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text, Dimensions, ActivityIndicator } from 'react-native';
var base64 = require("base-64");
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../components/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, logout } from '../components/authSlice'; // Import the login and logout actions
import RNFS from 'react-native-fs';





const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen: React.FC = ({ navigation }: any) => {

  


  const [Ad, setAd] = useState('');
  const [Parol, setParol] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { api, username, password } = useSelector((state: RootState) => state.service);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  // console.log('isLoggedIn:', isLoggedIn);


  const handleLogin = async () => {
    if (!Ad || !Parol) {
      Alert.alert('Doğrulama Xətası', 'Zəhmət olmasa istifadəçi adı və şifrə sahələrini doldurun.');
      return;
    }
    console.log('API-',api,Ad,Parol)
    const serverName: string = 'sa'; // Replace with the actual server name
    const serverPassword: string = 'abc'; // Replace with the actual server password
    let uname = "sa";
    let pword = "abc";
    if (!api || !Ad || !Parol) {
      let errorMsg = "Service ekranın tam doğru məlumatlarla doldurulduğuna əmin olun !";
      
      if (!api) errorMsg += "- API URL\n";
      if (!Ad) errorMsg += "- Username\n";
      if (!Parol) errorMsg += "- Password\n";
      
      Alert.alert('Validation Error', errorMsg, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
          
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ] );
      navigation.navigate('HomeTab');
    }

    try {
      setIsLoading(true);
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: "Basic " + base64.encode(username + ":" + password),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "typReport": "LoginMenu",
          "Usr": { "name": Ad, "pass": Parol }
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const user = responseData.User
        if (responseData.Result === 'OK') {
 
          // Login successful
          dispatch(login());
        
          const jsonFileName = 'settingsTabs.json';
          const jsonFilePath = RNFS.DocumentDirectoryPath + '/' + jsonFileName;
          

          // Convert the response data to JSON string
          const jsonData = JSON.stringify(responseData);

          // Write the JSON data to the file
          await RNFS.writeFile(jsonFilePath, jsonData, 'utf8');

          console.log('Response data saved to JSON file.');




          console.log('Login successful');
          navigation.navigate('HomeTab');

          // Parse the cloned response as text

          console.log('Response:', responseData);
        } else {
          // Login failed
          Alert.alert('Giriş uğursuz oldu', 'Yanlış istifadəçi adı və ya şifrə.');
          // navigation.navigate('HomeTab');
        }
      } else {
        const errorMessage = 'Unexpected error. Please try again later.';
        const clonedResponse = response.clone(); // Clone the response before reading it
        const responseData = await clonedResponse.text(); // Parse the cloned response as text
        let errorMsg = "Service ekranın tam doğru məlumatlarla doldurulduğuna əmin olun !";
        Alert.alert('Validation Error', errorMsg, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ] );
        navigation.navigate('HomeTab');
        console.log(response.status, errorMessage,clonedResponse);
      }
    } catch (error) {
      console.error('Error:', error);
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

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: windowHeight / 18 }}>
        <Text style={{ fontSize: 20, color: 'white', fontWeight: '700', textAlign: 'center', alignSelf: 'center', marginBottom: 12 }}>Giriş</Text>
        <TextInput
          style={styles.input}
          placeholder="İstifadəçi adı"
          value={Ad}
          onChangeText={setAd}
          placeholderTextColor={'white'}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifrə"
          placeholderTextColor={'white'}
          secureTextEntry
          value={Parol}
          onChangeText={setParol}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Daxil ol</Text>
        </TouchableOpacity>

        {isLoading && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F1D2B',
  },
  input: {
    width: windowWidth / 1.5,
    height: windowHeight / 14,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingLeft: 10,
    color: 'white',
    marginTop: 12,
    borderRadius: 8
  },
  button: {
    width: windowWidth / 2.5,
    height: windowHeight / 18,
    backgroundColor: '#F4F9FD',
    borderRadius: 8,
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12
  },
  buttonText: {
    fontSize: 20,
    color: '#1F1D2B',
    fontWeight: '700',
    textAlign: 'center',
    alignSelf: 'center'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default LoginScreen;
