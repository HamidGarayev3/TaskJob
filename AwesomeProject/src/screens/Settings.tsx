import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Home from './Home'
import Inventar from './Inventar'
import Sifarish from './Sifarish'
import Scan from './Scan'
import { Drawer } from 'react-native-paper';


const Settings = ({navigation}:any) => {
 
  return (
    <View style={{flex:1,backgroundColor:'#1F1D2B'}}>

             <TouchableOpacity onPress={() =>
            navigation.navigate('Scan')
            }  style={{paddingHorizontal:10,marginTop:10}}>
        <Image
        source={require('../assets&styles/back.png')}
        style={{ width: 30, height: 30,}}
      />
        </TouchableOpacity>
      <View style={{flexDirection:'row',paddingHorizontal:50,marginTop:20}}>
 
      <View style={{}}>
     
      <Image
        source={require('../assets&styles/human.png')}
        style={{ width: 56, height: 56,}}
      />
      </View>
      <View style={{flexDirection:'column'}}>
        <View style={{}}>
        <Text style={{fontSize:20,color:'#F4F9FD',fontWeight:"700",marginLeft:10}}>Devon Lane</Text>
        </View>
        <View style={{}}>
        <Text style={{fontSize:18,color:'#F4F9FD',marginLeft:10}}>Duis aute irure</Text>
        </View>
      </View>
      </View>
      
      <TouchableOpacity style={{padding:7,backgroundColor:'#3A3D4A',marginHorizontal:50,borderRadius:15,marginTop:20,flexDirection:'row',justifyContent:'center'}}>
      <Text style={{marginLeft:30,fontSize:20,color:'#F4F9FD',fontWeight:"700"}}>Qaimələr</Text>
      <Image
        source={require('../assets&styles/qaime.png')}
        style={{ width: 30, height: 30,marginLeft:140}}
      />
      </TouchableOpacity>

      <View >
      <TouchableOpacity style={{padding:7,marginHorizontal:50,borderRadius:15,marginTop:10,flexDirection:'row',justifyContent:'center'}}>
      
<View style={{marginRight:85,flexDirection:'row'}}>
<Image
        source={require('../assets&styles/plus.png')}
        style={{ width: 30, height: 30,}}
      />
      <Text style={{fontSize:20,color:'#F4F9FD',fontWeight:"700",marginLeft:10}}>Mal mədaxil</Text>
</View>
      </TouchableOpacity>
      <TouchableOpacity style={{padding:7,marginHorizontal:50,borderRadius:15,marginTop:10,flexDirection:'row',justifyContent:'center'}}>
      
      <View style={{marginRight:85,flexDirection:'row'}}>
      <Image
              source={require('../assets&styles/minus.png')}
              style={{ width: 30, height: 30,}}
            />
            <Text style={{fontSize:20,color:'#F4F9FD',fontWeight:"700",marginLeft:10}}>Mal məxaric</Text>
      </View>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:7,marginHorizontal:50,borderRadius:15,marginTop:10,flexDirection:'row',justifyContent:'center'}}>
      
      <View style={{marginRight:85,flexDirection:'row'}}>
      <Image
              source={require('../assets&styles/plus.png')}
              style={{ width: 30, height: 30,}}
            />
            <Text style={{fontSize:20,color:'#F4F9FD',fontWeight:"700",marginLeft:10}}>Mal Mədaxil</Text>
      </View>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:7,marginHorizontal:50,borderRadius:15,marginTop:10,flexDirection:'row',justifyContent:'center'}}>
      
      <View style={{marginRight:85,flexDirection:'row'}}>
      <Image
              source={require('../assets&styles/minus.png')}
              style={{ width: 30, height: 30,}}
            />
            <Text style={{fontSize:20,color:'#F4F9FD',fontWeight:"700",marginLeft:10}}>Mal məxaric</Text>
      </View>
            </TouchableOpacity>
      </View>
      <TouchableOpacity style={{padding:7,backgroundColor:'#3A3D4A',marginHorizontal:50,borderRadius:15,marginTop:20,flexDirection:'row',justifyContent:'center'}}>
      <Text style={{marginLeft:30,fontSize:20,color:'#F4F9FD',fontWeight:"700"}}>Sənədlər</Text>
      <Image
        source={require('../assets&styles/doc.png')}
        style={{ width: 30, height: 30,marginLeft:140}}
      />
      </TouchableOpacity>

      <TouchableOpacity onPress={() =>
            navigation.navigate('Inventar')
            }  style={{padding:7,marginHorizontal:50,borderRadius:15,marginTop:10,flexDirection:'row',justifyContent:'center'}}>
      
      <View style={{marginRight:105,flexDirection:'row'}}>
      <Image
              source={require('../assets&styles/plusminus.png')}
              style={{ width: 30, height: 30,}}
            />
            <Text style={{fontSize:20,color:'#F4F9FD',fontWeight:"700",marginLeft:10}}>İnventar</Text>
      </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>
            navigation.navigate('Sifarish')
            }  style={{padding:7,marginHorizontal:50,borderRadius:15,marginTop:10,flexDirection:'row',justifyContent:'center'}}>
      
      <View style={{marginRight:95,flexDirection:'row'}}>
      <Image
              source={require('../assets&styles/percent.png')}
              style={{ width: 30, height: 30,}}
            />
            <Text style={{fontSize:20,color:'#F4F9FD',fontWeight:"700",marginLeft:10}}>Sifarişlər</Text>
      </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>
            navigation.navigate('Home')
            } style={{paddingHorizontal:50,flexDirection:'row',marginBottom:20,marginTop:50}}>
            <Image
              source={require('../assets&styles/logout.png')}
              style={{ width: 24, height: 24,marginLeft:35}}
            />
            <Text style={{fontSize:20,color:'#F4F9FD',fontWeight:"700",marginLeft:10}}>Logout</Text>
            </TouchableOpacity>

    </View>
  )
}

export default Settings