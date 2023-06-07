import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Scan from '../../screens/Scan';
import Inventar from '../../screens/Inventar';
import Sifarish from '../../screens/Sifarish';

const ScanStackScreen = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const ScanStack = ({navigation}:any) => {
  return (
    <ScanStackScreen.Navigator>
    <ScanStackScreen.Screen
      name="Home"
      component={Scan}
      options={{headerShown:false}}
    />

    <ScanStackScreen.Screen
      name="Inventar"
      component={Inventar}
      options={{
      headerTransparent:true,
      headerTitle:'Inventar',
      headerTitleStyle:{
        color:'blue',
        fontSize:24
      },
      headerTintColor:'red'
    }}
    />
        <ScanStackScreen.Screen
      name="Sifarish"
      component={Sifarish}
      options={{
      headerTransparent:true,
      headerTitle:'Sifarish',
      headerTitleStyle:{
        color:'yellow',
        fontSize:24
      },
      headerTintColor:'green'
    }}
    />
  </ScanStackScreen.Navigator>
  )
}

export default ScanStack