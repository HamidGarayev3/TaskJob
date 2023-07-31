import { View, Text } from 'react-native';
import React from 'react';
import Scan from '../../screens/HomePage';
import Inventar from '../../screens/Inventar';
import Sifarish from '../../screens/Sifarish';
import Settings from '../../screens/Settings';
import Home from '../../screens/ScanPage';
import SettingsStack from './SettingsStack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Service from '../../screens/Service';
import MalMedaxil from '../../screens/MalMedaxil';

const Drawer = createDrawerNavigator();

const ScanStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <Settings {...props} />} >
      <Drawer.Screen
        name="Home"
        component={Scan}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name="Inventar"
        component={Inventar}
        options={{
          headerShown: false, // Hide the header
          drawerLabel: () => null, // Hide the label in the drawer menu
        }}
      />
      <Drawer.Screen
        name="MalMedaxil"
        component={MalMedaxil}
        options={{
          headerShown: false, // Hide the header
          drawerLabel: () => null, // Hide the label in the drawer menu
        }}
      />

      <Drawer.Screen
        name="Sifarish"
        component={Sifarish}
        options={{
          headerShown: false, // Hide the header
          drawerLabel: () => null, // Hide the label in the drawer menu
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerShown: false,
          headerTintColor: '#FFA523'
        }}
      />

      <Drawer.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerShown: false
        }}
      />
    </Drawer.Navigator>
  )
}

// const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator drawerContent={props => <SettingsStack {...props} />}>
//       <Drawer.Screen
//         name="HomeScreen"
//         component={Home}
//         options={{ headerShown: false }}
//       />
//       <Drawer.Screen
//         name="ScanStack"
//         component={ScanStack}
//         options={{ headerShown: false }}
//       />
//     </Drawer.Navigator>
//   );
// }

// export default DrawerNavigator;

export default ScanStack