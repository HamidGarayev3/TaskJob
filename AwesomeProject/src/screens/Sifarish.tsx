import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import Scan from './HomePage'
import { useNavigation } from '@react-navigation/native';





const Sifarish = ({navigation}:any) => {
  
  return (
    <View style={{flex:1,backgroundColor:'#1F1D2B'}}>
      <View style={{flex:2,flexDirection:'row',marginTop:30,paddingHorizontal:20}}>
      <TouchableOpacity onPress={() =>
            navigation.goBack()
            }  style={{backgroundColor:'#1F1D2B',borderRadius:5,borderWidth:1,borderColor:'white',width:40,height:44,alignContent:'center',alignItems:'center',justifyContent:'center'}}>
        <Image
        source={require('../assets&styles/back.png')}
        style={{ width: 24, height: 24,}}
      />
        </TouchableOpacity>
        <TextInput placeholderTextColor={'#F4F9FD'} style={{marginLeft:10, borderRadius:5,borderWidth:1,borderColor:'#F4F9FD',width:300,height:44,textAlignVertical:'top',fontWeight:'500',fontSize:14,color:'#F4F9FD'}} placeholder='Type to search'></TextInput>
      </View>
      
    </View>
  )
}

export default Sifarish