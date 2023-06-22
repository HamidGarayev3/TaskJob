import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTab from './tabs/HomeTab';
import ScanStack from './stacks/ScanStack';
import Home from '../screens/ScanPage';
import Scan from '../screens/HomePage';
import Service from '../screens/Service';
import 'react-native-gesture-handler';
import LoginScreen from '../screens/LoginScreen';


const Stack = createNativeStackNavigator();


const index = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
   
<>
<Stack.Screen options={{
   headerShown: false
}}             name="LoginScreen" component={LoginScreen} />
 <Stack.Screen options={{
   headerShown: false
}}             name="HomeTab" component={HomeTab} />
</>
<Stack.Screen
    options={{
        headerShown: false
    }}
    name="ScanStack"
    component={ScanStack} />
 <Stack.Screen
    options={{
        headerShown: false
    }}
    name="Home"
    component={Home} />
    
    <Stack.Screen
    options={{
        headerShown: false
    }}
    name="Scan"
    component={Scan} />
     <Stack.Screen
    options={{
        headerShown: false
    }}
    name="Service"
    component={Service} />

</Stack.Navigator>

  )
}

export default index