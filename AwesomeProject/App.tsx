import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import Navigator from './src/navigation';
import { Provider } from 'react-redux';
import store from './src/components/store'
const App = () => {
  return (
    <Provider store={store}>


<NavigationContainer>
    <View style={{
      flex: 1
    }}>
      <Navigator />
    </View>
    
  </NavigationContainer>
   
  </Provider>

  )
}

export default App