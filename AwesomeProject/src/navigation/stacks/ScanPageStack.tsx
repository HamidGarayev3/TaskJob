import { View, Text } from 'react-native'
import React from 'react'
import Settings from '../../screens/Settings'
import ScanPage from '../../screens/ScanPage'
import SettingsStack from './SettingsStack';
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const ScanPageStack = () => {
  return (
<Drawer.Navigator drawerContent={props => <Settings {...props} />} >
      <Drawer.Screen
        name="Service"
        component={ScanPage}
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

export default ScanPageStack