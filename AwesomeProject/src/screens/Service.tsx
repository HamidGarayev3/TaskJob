import { View, Text,Image,TouchableOpacity,Switch,Dimensions,Alert } from 'react-native'
import React, { useState,useEffect } from 'react'
import { RadioButton } from 'react-native-paper';
import 'react-native-gesture-handler';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setApi, setUsername, setPassword } from '../components/serviceSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Service = ({navigation}:any) => {
  const [checked, setChecked] = React.useState('first');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const dispatch = useDispatch();
  const { api, username, password } = useSelector((state: RootState) => state.service);

  const [inputApi, setInputApi] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleTestPress = async () => {
    dispatch(setApi(inputApi));
    dispatch(setUsername(inputUsername));
    dispatch(setPassword(inputPassword));
  
    try {
      // Save the input data to AsyncStorage
      await AsyncStorage.setItem('api', inputApi);
      await AsyncStorage.setItem('username', inputUsername);
      await AsyncStorage.setItem('password', inputPassword);
  
      // Other logic
      // Show an alert indicating that data is saved
      Alert.alert('Success', 'Input data saved successfully.');
    } catch (error) {
      console.error('Error saving input data:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedApi = await AsyncStorage.getItem('api');
        const savedUsername = await AsyncStorage.getItem('username');
        const savedPassword = await AsyncStorage.getItem('password');

        if (savedApi) setInputApi(savedApi);
        if (savedUsername) setInputUsername(savedUsername);
        if (savedPassword) setInputPassword(savedPassword);
      } catch (error) {
        console.error('Error fetching saved input data:', error);
      }
    };

    fetchData();
  }, []);

  const handleResetPress = () => {
    setInputApi('');
    setInputUsername('');
    setInputPassword('');
  };
  return (
    <View style={{flex:1,backgroundColor:'#1F1D2B'}}>


      <View style={{flex:1,flexDirection:'row',paddingHorizontal:20,marginTop:20}}>
      <TouchableOpacity onPress={() =>
            navigation.openDrawer()
            } >
        <Image
        source={require('../assets&styles/menu.png')}
        style={{ width: 24, height: 24 }}
      />
        </TouchableOpacity>
        <View style={{marginLeft:290}}>
        <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
        </View>
      </View>

      <View style={{flex:3, marginTop:10}}>
      <View style={{flex:1}}>
      <Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700",marginLeft:20}}>API</Text>
      </View>
      <View style={{flex:2,paddingHorizontal:20}}>
      <TextInput value={inputApi}
            onChangeText={setInputApi} placeholderTextColor={'white'} placeholder='API' style={{borderRadius:5,height:54,flexDirection:'row',borderWidth:1,borderColor:'#D8E0F0',color:'white',fontSize:16,fontWeight:'700'}}>
      </TextInput>
      </View>
      </View>

      <View style={{flex:3, marginTop:10}}>
      <View style={{flex:1}}>
      <Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700",marginLeft:20}}>User Name</Text>
      </View>
      <View style={{flex:2,paddingHorizontal:20}}>
      <TextInput value={inputUsername}
            onChangeText={setInputUsername} placeholderTextColor={'white'} placeholder='User Name' style={{borderRadius:5,height:54,flexDirection:'row',borderWidth:1,borderColor:'#D8E0F0',color:'white',fontSize:16,fontWeight:'700'}}>
      </TextInput>
      </View>
      </View>


      <View style={{flex:3, marginTop:10}}>
      <View style={{flex:1}}>
      <Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700",marginLeft:20}}>Password</Text>
      </View>
      <View style={{flex:2,paddingHorizontal:20}}>
      <TextInput value={inputPassword}
            onChangeText={setInputPassword} placeholderTextColor={'white'} placeholder='Password' style={{borderRadius:5,height:54,flexDirection:'row',borderWidth:1,borderColor:'#D8E0F0',color:'white',fontSize:16,fontWeight:'700'}}>
      </TextInput>
      </View>
      </View>

      <View style={{flex: 3}}>
</View>

<View style={{flex: 2, flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20}}>
  {/* <TouchableOpacity style={{flex: 0.5, paddingHorizontal: 10, backgroundColor: '#F4F9FD', marginHorizontal: 5, borderRadius: 8}}>
    <Text style={{fontSize: 11, color: 'black', fontWeight: "700", textAlign: 'center',alignSelf:'center',marginTop:12}}>Parametrlər</Text>
  </TouchableOpacity> */}

  <TouchableOpacity  onPress={handleResetPress} style={{flex: 1, paddingHorizontal: 10, backgroundColor: '#FFA523', marginHorizontal: 5, borderRadius: 8,justifyContent:'center'}}>
    <Text style={{fontSize: 16, color: 'white', fontWeight: "700", textAlign: 'center',alignSelf:'center',alignContent:'center',alignItems:'center',justifyContent:'center'}}>Sıfırlamaq</Text>
  </TouchableOpacity>

  <TouchableOpacity  onPress={handleTestPress} style={{flex: 1, paddingHorizontal: 10, backgroundColor: '#22B07D', marginHorizontal: 5, borderRadius: 8,justifyContent:'center'}}>
    <Text style={{fontSize: 16, color: 'white', fontWeight: "700", textAlign: 'center',alignSelf:'center'}}>Test</Text>
  </TouchableOpacity>
</View>




    </View>
  )
}

export default Service

interface RootState {
  service: {
    api: string;
    username: string;
    password: string;
  };
}