import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Scan from '../../screens/Scan';
import Inventar from '../../screens/Inventar';
import Sifarish from '../../screens/Sifarish';
import Settings from '../../screens/Settings';
import Home from '../../screens/Home';
import SettingsStack from './SettingsStack';

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
    <ScanStackScreen.Screen
      name="Settings"
      component={SettingsStack}
      options={{
        headerBackVisible:false,
        headerBackTitleVisible:false,
        headerShown:false,
      headerTintColor:'#FFA523'
    }}
    />
        <ScanStackScreen.Screen
      name="HomeScreen"
      component={Home}
      options={{headerShown:false
      }}
    />
  </ScanStackScreen.Navigator>
  )
}

export default ScanStack