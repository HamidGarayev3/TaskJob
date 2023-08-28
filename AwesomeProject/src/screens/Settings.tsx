import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
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



const Settings = ({navigation,route }:any) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn); // Get authentication state from Redux


  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
    navigation.navigate('LoginScreen')
    // ... any other logout logic ...
  };
  
  return (
<ScrollView>
<View style={{flex:1,backgroundColor:'#1F1D2B'}}>

             
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

<TouchableOpacity style={{backgroundColor:'#3A3D4A',padding:10,flexDirection:'row',justifyContent:'center',marginHorizontal:20,borderRadius:15}}>
<Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700"}}>Qaimələr</Text>
<Image
  source={require('../assets&styles/qaime.png')}
  style={{ width: 24, height: 24,marginLeft:100}}
/>
</TouchableOpacity>

<View >
<TouchableOpacity onPress={() =>
      navigation.navigate('MalMedaxil')
      } style={{padding:7,marginHorizontal:20,borderRadius:15,marginTop:10,flexDirection:'row',justifyContent:'center',}}>

<View style={{flexDirection:'row',marginRight:65}}>
<Image
  source={require('../assets&styles/plus.png')}
  style={{ width: 24, height: 24,}}
/>
<Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700",marginLeft:10}}>Mal mədaxil</Text>
</View>
</TouchableOpacity>
<TouchableOpacity  onPress={() =>
      navigation.navigate('MalMedaxil')
      } style={{padding:7,marginHorizontal:50,borderRadius:15,marginTop:10,flexDirection:'row',justifyContent:'center'}}>

<View style={{flexDirection:'row',marginLeft:-65}}>
<Image
        source={require('../assets&styles/minus.png')}
        style={{ width: 24, height: 24,}}
      />
      <Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700",marginLeft:10}}>Mal məxaric</Text>
</View>
      </TouchableOpacity>
      <TouchableOpacity style={{padding:7,marginHorizontal:50,borderRadius:15,marginTop:10,flexDirection:'row',justifyContent:'center'}}>

<View style={{flexDirection:'row',marginLeft:-65}}>
<Image
        source={require('../assets&styles/plus.png')}
        style={{ width: 24, height: 24,}}
      />
      <Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700",marginLeft:10}}>Mal Mədaxil</Text>
</View>
      </TouchableOpacity>
      <TouchableOpacity style={{padding:7,marginHorizontal:50,borderRadius:15,marginTop:10,flexDirection:'row',justifyContent:'center'}}>

<View style={{flexDirection:'row',marginLeft:-65}}>
<Image
        source={require('../assets&styles/minus.png')}
        style={{ width: 24, height: 24,}}
      />
      <Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700",marginLeft:10}}>Mal məxaric</Text>
</View>
      </TouchableOpacity>
</View>
<TouchableOpacity style={{padding:10,backgroundColor:'#3A3D4A',marginHorizontal:20,borderRadius:15,marginTop:20,flexDirection:'row',justifyContent:'center'}}>
<Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700"}}>Sənədlər</Text>
<Image
  source={require('../assets&styles/doc.png')}
  style={{ width: 24, height: 24,marginLeft:100}}
/>
</TouchableOpacity>

<TouchableOpacity onPress={() =>
      navigation.navigate('Inventar')
      }  style={{padding:7,borderRadius:15,marginTop:10,flexDirection:'row',justifyContent:'center'}}>

<View style={{flexDirection:'row',marginRight:85}}>
<Image
        source={require('../assets&styles/plusminus.png')}
        style={{ width: 24, height: 24,}}
      />
      <Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700",marginLeft:10}}>İnventar</Text>
</View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() =>
      navigation.navigate('Sifarish')
      }  style={{padding:7,marginHorizontal:20,borderRadius:15,marginTop:10,flexDirection:'row',justifyContent:'center'}}>

<View style={{flexDirection:'row',marginRight:78}}>
<Image
        source={require('../assets&styles/percent.png')}
        style={{ width: 24, height: 24,}}
      />
      <Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700",marginLeft:10}}>Sifarişlər</Text>
</View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={{paddingHorizontal:40,flexDirection:'row',marginBottom:20,marginTop:100}}>
      <Image
        source={require('../assets&styles/logout.png')}
        style={{ width: 24, height: 24}}
      />
      <Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700",marginLeft:10}}> {isLoggedIn ? 'Logout' : 'Login'}</Text>
      </TouchableOpacity>

</View>
</ScrollView>
  )
}

export default Settings