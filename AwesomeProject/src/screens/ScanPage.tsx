import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const ScanPage = ({navigation}:any) => {
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

        <Text style={{fontSize:20,color:'white',fontFamily:''}}>PN0001245</Text>
      </View>

      <View style={{flex:3}}></View>

      <View style={{flex:2}}></View>

      <View style={{flex:2.4}}></View>

      <View style={{flex:2.4}}></View>

      <View style={{flex:2}}></View>

      <View style={{flex:2.4}}></View>

      <View style={{flex:2}}></View>



    </View>
  )
}

export default ScanPage