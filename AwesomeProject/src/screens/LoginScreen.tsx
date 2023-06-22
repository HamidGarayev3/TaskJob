import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet,TouchableOpacity,Text,Dimensions } from 'react-native';
import { encode } from 'base-64';
import HomeTab from '../navigation/tabs/HomeTab';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const LoginScreen: React.FC = ({navigation}:any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const authHeader = "Basic " + encode(username + ":" + password);
    if (!username || !password) {
      Alert.alert('Doğrulama Xətası', 'Zəhmət olmasa istifadəçi adı və şifrə sahələrini doldurun.');
      return;
    }

    try {
      const response = await fetch('http://46.32.169.71/DEMO/hs/PdaServis/catalog/', {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'TypeReport': 'Login',
          'User': username,
          'Password': password,
        },
      });

      if (response.ok) {
        const result = await response.text();
       
        if (result === '0') {
          // Login failed
          Alert.alert('Giriş uğursuz oldu', 'Yanlış istifadəçi adı və ya şifrə.');
        } else {
          // Login successful
          console.log('Login successful');
          console.log('Login successful');
          // Navigate to the home screen or perform other actions
          navigation.navigate('HomeTab')
        }
      } else {
        // Handle other response statuses if needed
        Alert.alert('Giriş uğursuz oldu', 'Yanlış istifadəçi adı və ya şifrə.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Xəta', 'Giriş zamanı xəta baş verdi.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{marginBottom:windowHeight/18}}>
      <Text style={{fontSize:20,color:'white',fontWeight:"700",textAlign:'center',alignSelf:'center',marginBottom:12}}>Giriş</Text>
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
      {/* <Button style={styles.input} title="Login"  /> */}

      <TouchableOpacity onPress={handleLogin} style={{width:windowWidth/2.5,height:windowHeight/18,backgroundColor:'#F4F9FD',borderRadius:8,flexDirection:'row',alignSelf:'center',alignContent:'center',alignItems:'center',justifyContent:'center',marginTop:12}}>

      <Text style={{fontSize:20,color:'#1F1D2B',fontWeight:"700",textAlign:'center',alignSelf:'center'}}>Daxil ol</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#1F1D2B',
  },
  input: {
    width:windowWidth/1.5,
    height:windowHeight/14,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingLeft: 10,
    color:'white',
    marginTop:12,
    borderRadius:8
  },
});

export default LoginScreen;
