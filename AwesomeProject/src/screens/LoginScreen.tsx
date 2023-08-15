import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text, Dimensions, ActivityIndicator } from 'react-native';
var base64 = require("base-64");
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen: React.FC = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Doğrulama Xətası', 'Zəhmət olmasa istifadəçi adı və şifrə sahələrini doldurun.');
      return;
    }
    const serverName: string = 'sa'; // Replace with the actual server name
    const serverPassword: string = 'abc'; // Replace with the actual server password
    let uname = "sa";
    let pword = "abc";

    try {
      setIsLoading(true);
      const response = await fetch(`http://46.32.169.71/DEMO/hs/MobileApi/Connect`, {
        method: 'POST',
        headers: {
          Authorization: "Basic " + base64.encode(uname + ":" + pword),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "typReport": "LoginMenu",
          "Usr": { "Name": username, "Pass": password }
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const user = responseData.User
        if (responseData.ResulCode === '0') {
          // Login successful
          console.log('Login successful');
          navigation.navigate('HomeTab');

          const clonedResponse = response.clone(); // Clone the response before reading it
          const responseData = await clonedResponse.text(); // Parse the cloned response as text

          console.log('Response:', responseData);
        } else {
          // Login failed
          Alert.alert('Giriş uğursuz oldu', 'Yanlış istifadəçi adı və ya şifrə.');
        }
      } else {
        const errorMessage = 'Unexpected error. Please try again later.';
        const clonedResponse = response.clone(); // Clone the response before reading it
        const responseData = await clonedResponse.text(); // Parse the cloned response as text
        Alert.alert('Giriş uğursuz oldu', errorMessage,);
        console.log(response.status, errorMessage,clonedResponse);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Xəta', 'Giriş zamanı xəta baş verdi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: windowHeight / 18 }}>
        <Text style={{ fontSize: 20, color: 'white', fontWeight: '700', textAlign: 'center', alignSelf: 'center', marginBottom: 12 }}>Giriş</Text>
        <TextInput
          style={styles.input}
          placeholder="İstifadəçi adı"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={'white'}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifrə"
          placeholderTextColor={'white'}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
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
