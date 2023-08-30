import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import Home from './ScanPage'
import Inventar from './Inventar'
import Sifarish from './Sifarish'
import Scan from './HomePage'
import { Drawer } from 'react-native-paper';
import LoginScreen from './LoginScreen'
import { ScrollView } from 'react-native-gesture-handler'
import MalMedaxil from './MalMedaxil'
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../components/authSlice'; // Import the logout action
import { RootState } from '../components/store'; // Update this import path
import RNFS from 'react-native-fs'; // Import the rnfs library
import { setSelectedValue } from '../components/selectedItemSlice'; 


interface Item {
  Mal_Mədaxil: string;
  Id: string;
}
interface Item {
  [key: string]: string;
}
interface SettingsData {
  Qaimeler: Item[];
  Senedler: Item[];
}

const Settings = ({navigation,route }:any) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn); // Get authentication state from Redux

  const [qaimelerData, setQaimelerData] = useState<Item[]>([]);
  const [senedlerData, setSenedlerData] = useState<Item[]>([]);
  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
    navigation.navigate('LoginScreen')
    // ... any other logout logic ...
  };
  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const jsonFilePath = RNFS.DocumentDirectoryPath + '/settingsTabs.json';
        const fileContent = await RNFS.readFile(jsonFilePath, 'utf8');
        const settingsData = JSON.parse(fileContent);

        if (settingsData && settingsData.Qaimeler) {
          setQaimelerData(settingsData.Qaimeler);
        }

        if (settingsData && settingsData.Senedler) {
          setSenedlerData(settingsData.Senedler);
        }
      } catch (error) {
        console.error('Error fetching settings data:', error);
      }
    };

    fetchSettingsData();
  }, []);
  return (
    <View style={{flex:1,backgroundColor:'#1F1D2B'}}>
      <ScrollView>
<View >

             
<View style={{flexDirection:'row',paddingHorizontal:20,marginVertical:35}}>

<View style={{}}>

<Image
  source={require('../assets&styles/human.png')}
  style={{ width: 56, height: 56,}}
/>
</View>
<View style={{flexDirection:'column'}}>
  <View style={{marginLeft:20}}>
  <Text style={{fontSize:20,color:'#F4F9FD',fontWeight:"700"}}>Admin</Text>
  </View>
  <View style={{marginLeft:20}}>
  <Text style={{fontSize:18,color:'#F4F9FD'}}>rDuis aute irure</Text>
  </View>
</View>
</View>


{isLoggedIn && (
  <>
    <TouchableOpacity style={{padding:10,backgroundColor:'#3A3D4A',marginHorizontal:20,borderRadius:15,marginTop:20,flexDirection:'row',justifyContent:'center'}}>
      <Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700"}}>Qaimələr</Text>
      <Image
        source={require('../assets&styles/doc.png')}
        style={{ width: 24, height: 24,marginLeft:100}}
      />
    </TouchableOpacity>

    {qaimelerData.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          const selectedKey = Object.keys(item)[0];
          const selectedValue = item[selectedKey];
          dispatch(setSelectedValue(selectedValue)); // Dispatch the selected value
          navigation.navigate('MalMedaxil');
        }}
        style={{ padding: 7, marginHorizontal: 20, borderRadius: 15, marginTop: 10, flexDirection: 'row', justifyContent: 'center', }}>

        <View style={{ flexDirection: 'row', marginRight: 65 }}>
          <Image
            source={require('../assets&styles/plus.png')}
            style={{ width: 24, height: 24 }}
          />
           {Object.keys(item).map((key) => (
                        <View key={key} style={{ flexDirection: 'row' }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#F4F9FD',
                              fontWeight: '700',
                              marginLeft: 10,
                            }}>
                            {key}:
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#F4F9FD',
                              fontWeight: '700',
                            }}>
                            {' '}
                            {item[key]}
                          </Text>
                        </View>
                      ))}
        </View>
      </TouchableOpacity>
    ))}

    <TouchableOpacity style={{padding:10,backgroundColor:'#3A3D4A',marginHorizontal:20,borderRadius:15,marginTop:20,flexDirection:'row',justifyContent:'center'}}>
      <Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700"}}>Sənədlər</Text>
      <Image
        source={require('../assets&styles/doc.png')}
        style={{ width: 24, height: 24,marginLeft:100}}
      />
    </TouchableOpacity>

    {senedlerData.map((item, index) => (
      <TouchableOpacity
      onPress={() => {
        const selectedKey = Object.keys(item)[0];
        const selectedValue = item[selectedKey];
        dispatch(setSelectedValue(selectedValue)); // Dispatch the selected value
        navigation.navigate('MalMedaxil');
      }}
        style={{ padding: 7, marginHorizontal: 20, borderRadius: 15, marginTop: 10, flexDirection: 'row', justifyContent: 'center', }}>

        <View style={{ flexDirection: 'row', marginRight: 65 }}>
          <Image
            source={require('../assets&styles/plus.png')}
            style={{ width: 24, height: 24 }}
          />
           {Object.keys(item).map((key) => (
                        <View key={key} style={{ flexDirection: 'row' }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#F4F9FD',
                              fontWeight: '700',
                              marginLeft: 10,
                            }}>
                            {key}:
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#F4F9FD',
                              fontWeight: '700',
                            }}>
                            {' '}
                            {item[key]}
                          </Text>
                        </View>
                      ))}
        </View>
      </TouchableOpacity>
    ))}
  </>
)}

     

      <TouchableOpacity onPress={handleLogout} style={{paddingHorizontal:40,flexDirection:'row',marginBottom:20,marginTop:100}}>
      <Image
        source={require('../assets&styles/logout.png')}
        style={{ width: 24, height: 24}}
      />
      <Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700",marginLeft:10}}> {isLoggedIn ? 'Logout' : 'Login'}</Text>
      </TouchableOpacity>

</View>
</ScrollView>
    </View>

  )
}

export default Settings