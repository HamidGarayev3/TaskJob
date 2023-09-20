import { View, Text } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from '../../screens/ScanPage';
import Inventar from '../../screens/Inventar';
import Sifarish from '../../screens/Sifarish';
import Scan from '../../screens/HomePage';
import Service from '../../screens/Service';
import ScanStack from '../stacks/HomePageStack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse,faBarcode,faGear } from '@fortawesome/free-solid-svg-icons';
import TestScan from '../../screens/TestScan';
import LoginScreen from '../../screens/LoginScreen';
import ServiceStack from '../stacks/ServiceStack';
import ScanPageStack from '../stacks/ScanPageStack';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setScanTabActive } from '../../components/tabSlice';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import these hooks
import { useIsFocused } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const HomeTab = () => {

    // Set up a listener for the tabPress event on the "Scan" tab
    const isScanTabFocused = useIsFocused();
  const dispatch = useDispatch();
  const route = useRoute();

  useEffect(() => {
    // Check if the current route name corresponds to the "Scan" tab
    if (route.name === 'Scan' && isScanTabFocused) {
      dispatch(setScanTabActive(true));
    } else {
      dispatch(setScanTabActive(false));
    }
  }, [dispatch, isScanTabFocused, route]);
  return (
    <Tab.Navigator  initialRouteName="HomePage"  >


<Tab.Screen
    
        name="Scan"
        component={ScanStack}
        options={{
            tabBarActiveTintColor:'#FFA523',
            tabBarIcon: ({ color, size, focused }) => <FontAwesomeIcon size={size} color={color} icon={faHouse} />,
            tabBarShowLabel: false,
            headerShown:false,
            tabBarStyle:{backgroundColor:'#1F1D2B',height:56}
            
        }} />
    <Tab.Screen
        options={{
            tabBarActiveTintColor:'#FFA523',
            tabBarIcon: ({ color, size, focused }) =>  <FontAwesomeIcon secondaryColor='#FFA523' size={24} color={color} icon={faBarcode} />,
            tabBarShowLabel: false,
            headerShown:false,
            tabBarStyle:{backgroundColor:'#1F1D2B',height:56}
        }}
        name="ScanPageStack"
        component={ScanPageStack} />
    
            <Tab.Screen
        name="ServiceStack"
        component={ServiceStack}
        options={{
            tabBarLabel:'aaaaa',
            tabBarLabelStyle:{fontSize:14,color:'black'},
            tabBarActiveTintColor:'#FFA523',
            tabBarIcon: ({ color, size, focused }) => <FontAwesomeIcon size={size} color={color} icon={faGear} />,
            tabBarShowLabel: false,
            headerShown:false,
            tabBarStyle:{backgroundColor:'#1F1D2B',height:56}
        }} />
</Tab.Navigator>
  )
}

export default HomeTab