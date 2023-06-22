import { View, Text } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View style={{flex:1,backgroundColor:'#1F1D2B'}}>
       <Text style={{fontSize:20,color:'#F4F9FD',fontWeight:"700",textAlign:'center',textAlignVertical:'center',paddingTop:300}}>Welcome to the app!</Text>
    </View>
  )
}

export default Home