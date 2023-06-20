import { View, Text } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper';

const Service = () => {
  const [checked, setChecked] = React.useState('first');
  
  return (
    <View style={{flex:1,backgroundColor:'#1F1D2B'}}>
      <Text style={{fontSize:20,color:'#F4F9FD',fontWeight:"700",textAlign:'center',textAlignVertical:'center',paddingTop:300}}>Welcome to the app!</Text>
    </View>
  )
}

export default Service