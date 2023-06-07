import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTab from './tabs/HomeTab';
import ScanStack from './stacks/ScanStack';
import Home from '../screens/Home';
import Scan from '../screens/Scan';
import Service from '../screens/Service';


const Stack = createNativeStackNavigator();


const index = () => {
  return (
    <Stack.Navigator>
   
<>
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