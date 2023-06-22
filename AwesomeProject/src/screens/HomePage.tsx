import { View, Text, TextInput, Pressable, Image, TouchableOpacity,Switch } from 'react-native'
import React, { useRef, useState } from 'react'
import 'react-native-gesture-handler';
import Settings from './Settings';
import Home from './ScanPage';




const Scan = ({navigation}:any) => {


  return (
    <View style={{flex:1,backgroundColor:'#1F1D2B'}}>
      <View style={{flex:2,marginTop:20,marginHorizontal:20,marginBottom:20,flexDirection:'row'}}>
        <TouchableOpacity onPress={() =>
            navigation.openDrawer()
            } >
        <Image
        source={require('../assets&styles/menu.png')}
        style={{ width: 24, height: 24 }}
      />
        </TouchableOpacity>
        <Text style={{marginLeft:30,fontSize:20,color:'#F4F9FD',fontWeight:"700"}}>Text ABC</Text>
      </View>
    
    
      <View style={{flex:8.6,paddingHorizontal:20,flexDirection:'row',marginBottom:50}}>
      <TouchableOpacity style={{flex:4.3,backgroundColor:'#F4F9FD',marginRight:20,borderRadius:8,flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
      <Image
        source={require('../assets&styles/download.png')} 
        style={{ width: 30, height: 30 }}
      />
      <Text style={{marginLeft:10,fontSize:20,color:'#1F1D2B',fontWeight:"700"}}>Import</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flex:4.3,backgroundColor:'#F4F9FD',borderRadius:8,flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
      <Image
        source={require('../assets&styles/upload.png')} 
        style={{ width: 30, height: 30 }}
      />
      <Text style={{marginLeft:10,fontSize:20,color:'#1F1D2B',fontWeight:"700"}}>Export</Text>
      </TouchableOpacity>
      </View>


      <View style={{flex:25,marginBottom:50,marginHorizontal:20}}>
        <TextInput placeholderTextColor={'#F4F9FD'} style={{borderRadius:10,borderWidth:2,borderColor:'#F4F9FD',width:'100%',height:'100%',textAlignVertical:'top',fontWeight:'500',fontSize:16,color:'#F4F9FD'}} placeholder='Textline'></TextInput>
      </View>
    </View>
  )
}

export default Scan