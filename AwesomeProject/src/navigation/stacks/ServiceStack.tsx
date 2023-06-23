import { View, Text } from 'react-native'
import React from 'react'
import SettingsStack from './SettingsStack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Service from '../../screens/Service';
import Settings from '../../screens/Settings';

const Drawer = createDrawerNavigator();

const ServiceStack = () => {
  return (
<Drawer.Navigator drawerContent={props => <Settings {...props} />} >
      <Drawer.Screen
        name="Service"
        component={Service}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          headerShown: false, // Hide the header
          drawerLabel: () => null, // Hide the label in the drawer menu
        }}
      />

    </Drawer.Navigator>
  )
}

export default ServiceStack