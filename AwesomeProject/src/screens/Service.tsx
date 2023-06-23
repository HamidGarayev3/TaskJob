import { View, Text,Image,TouchableOpacity,Switch,Dimensions } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper';
import 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Service = ({navigation}:any) => {

  const [checked, setChecked] = React.useState('first');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={{flex:1,backgroundColor:'#1F1D2B'}}>


      <View style={{flex:1,flexDirection:'row',paddingHorizontal:20,marginTop:20}}>
      <TouchableOpacity onPress={() =>
            navigation.openDrawer()
            } >
        <Image
        source={require('../assets&styles/menu.png')}
        style={{ width: 24, height: 24 }}
      />
        </TouchableOpacity>
        <View style={{marginLeft:210}}>
        <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
        </View>
      </View>

      <View style={{flex:3, marginTop:10}}>
      <View style={{flex:1}}>
      <Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700",marginLeft:20}}>Server</Text>
      </View>
      <View style={{flex:2,paddingHorizontal:20}}>
      <View style={{borderRadius:5,height:54,flexDirection:'row',borderWidth:1,borderColor:'#D8E0F0'}}>
      <Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700",alignSelf:'center',marginLeft:10}}>Azərsun MMC</Text>
      <TouchableOpacity>
      <Image
        source={require('../assets&styles/dots.png')}
        style={{ width: 24, height: 24,marginTop:12,marginLeft:130}}
      />
      </TouchableOpacity>
      </View>
      </View>
      </View>

      <View style={{flex:3, marginTop:10}}>
      <View style={{flex:1}}>
      <Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700",marginLeft:20}}>Documents</Text>
      </View>
      <View style={{flex:2,paddingHorizontal:20}}>
      <View style={{borderRadius:5,height:54,flexDirection:'row',borderWidth:1,borderColor:'#D8E0F0'}}>
      <Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700",alignSelf:'center',marginLeft:10}}>Azərsun MMC</Text>
      <TouchableOpacity>
      <Image
        source={require('../assets&styles/dots.png')}
        style={{ width: 24, height: 24,marginTop:12,marginLeft:130}}
      />
      </TouchableOpacity>
      </View>
      </View>
      </View>


      <View style={{flex:3, marginTop:10}}>
      <View style={{flex:1}}>
      <Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700",marginLeft:20}}>Catalog</Text>
      </View>
      <View style={{flex:2,paddingHorizontal:20}}>
      <View style={{borderRadius:5,height:54,flexDirection:'row',borderWidth:1,borderColor:'#D8E0F0'}}>
      <Text style={{fontSize:16,color:'#F4F9FD',fontWeight:"700",alignSelf:'center',marginLeft:10}}>Azərsun MMC</Text>
      <TouchableOpacity>
      <Image
        source={require('../assets&styles/dots.png')}
        style={{ width: 24, height: 24,marginTop:12,marginLeft:130}}
      />
      </TouchableOpacity>
      </View>
      </View>
      </View>

      <View style={{flex: 3}}>
</View>

<View style={{flex: 1.5, flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20}}>
  <TouchableOpacity style={{flex: 0.5, paddingHorizontal: 10, backgroundColor: '#F4F9FD', marginHorizontal: 5, borderRadius: 8}}>
    <Text style={{fontSize: 11, color: 'black', fontWeight: "700", textAlign: 'center',alignSelf:'center',marginTop:12}}>Parametrlər</Text>
  </TouchableOpacity>

  <TouchableOpacity style={{flex: 0.5, paddingHorizontal: 10, backgroundColor: '#FFA523', marginHorizontal: 5, borderRadius: 8}}>
    <Text style={{fontSize: 11, color: 'white', fontWeight: "700", textAlign: 'center',alignSelf:'center',marginTop:12}}>Sıfırlamaq</Text>
  </TouchableOpacity>

  <TouchableOpacity style={{flex: 0.5, paddingHorizontal: 10, backgroundColor: '#22B07D', marginHorizontal: 5, borderRadius: 8}}>
    <Text style={{fontSize: 11, color: 'white', fontWeight: "700", textAlign: 'center',alignSelf:'center',marginTop:12}}>Test</Text>
  </TouchableOpacity>
</View>




    </View>
  )
}

export default Service