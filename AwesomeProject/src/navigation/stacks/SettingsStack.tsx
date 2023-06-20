import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from '../../screens/Settings';
import Inventar from '../../screens/Inventar';
import Sifarish from '../../screens/Sifarish';
import Scan from '../../screens/Scan';
import Home from '../../screens/Home';
import ScanStack from './ScanStack';
import { SharedComponent } from '../../components/sharedComponents';

const SettingsStackScreen = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const SettingsStack = ({navigation}:any) => {
  return (
    <SettingsStackScreen.Navigator>
    <SettingsStackScreen.Screen
      name="Home"
      component={Settings}
      options={{headerShown:false}}
    />

    <SettingsStackScreen.Screen
      name="Inventar"
      component={Inventar}
      options={{headerShown:false}}
    />
        <SettingsStackScreen.Screen
      name="Sifarish"
      component={Sifarish}
      
      options={{headerShown:false}}
    />
    
    <SettingsStackScreen.Screen
      name="Scan"
      component={ScanStack}
      options={{headerShown:false}}
    />
    <SettingsStackScreen.Screen
      name="HomeScreen"
      component={Home}
      options={{headerShown:false}}
    />
  </SettingsStackScreen.Navigator>
  )
}

export default SettingsStack