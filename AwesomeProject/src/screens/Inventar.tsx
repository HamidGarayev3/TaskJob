import { View, Text, TouchableOpacity, Image, TextInput, Switch } from 'react-native'
import React, { useState } from 'react'
import Scan from './Scan'

const Inventar = ({navigation}:any) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={{flex:1,backgroundColor:'#1F1D2B'}}>
       <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <View style={{flex:2,flexDirection:'row',marginTop:30,paddingHorizontal:20}}>
      <TouchableOpacity onPress={() =>
            navigation.navigate('Scan')
            }  style={{backgroundColor:'#1F1D2B',borderRadius:5,borderWidth:1,borderColor:'white',width:40,height:44,alignContent:'center',alignItems:'center',justifyContent:'center'}}>
        <Image
        source={require('../assets&styles/back.png')}
        style={{ width: 24, height: 24,}}
      />
        </TouchableOpacity>
        <TextInput placeholderTextColor={'#F4F9FD'} style={{marginLeft:10, borderRadius:5,borderWidth:1,borderColor:'#F4F9FD',width:300,height:44,textAlignVertical:'top',fontWeight:'500',fontSize:14,color:'#F4F9FD'}} placeholder='Type to search'></TextInput>
      </View>
      <View style={{flex:1.5,flexDirection:'row',paddingHorizontal:20,}}>
      <Text style={{fontSize:20,color:'#F4F9FD',fontWeight:"700"}}>1000001                               12.22.2023</Text>
      </View>
      <View style={{flex:1,paddingHorizontal:20,flexDirection:'row'}}>
      <Image
        source={require('../assets&styles/igid.png')}
        style={{ width: 350, height: 5}}
      />
      
      </View>
      <View style={{flex:1.4,borderRadius:5,width:350,height:40,marginLeft:22,flexDirection:'row',borderWidth:1,borderColor:'#D8E0F0'}}>
      <Text style={{fontSize:20,color:'#F4F9FD',fontWeight:"700",padding:12,marginBottom:10}}>Azərsun MMC</Text>
      <TouchableOpacity>
      <Image
        source={require('../assets&styles/dots.png')}
        style={{ width: 30, height: 30,marginTop:12,marginLeft:158}}
      />
      </TouchableOpacity>
      </View>
      <View style={{marginTop:20,flex:1.4,borderRadius:5,width:350,height:40,marginLeft:22,flexDirection:'row',borderWidth:1,borderColor:'#D8E0F0'}}>
      <Text style={{fontSize:20,color:'#F4F9FD',fontWeight:"700",textAlign:'center',padding:12}}>Anbar Depo</Text>
      <TouchableOpacity>
      <Image
        source={require('../assets&styles/dots.png')}
        style={{ width: 30, height: 30,marginTop:12,marginLeft:180}}
      />
      </TouchableOpacity>
      </View>
      <View style={{flex:1,paddingHorizontal:20,flexDirection:'row',marginTop:30}}>
      <Image
        source={require('../assets&styles/igid.png')}
        style={{ width: 350, height: 5}}
      />
      
      </View>
      <View style={{ borderWidth: 1, borderColor: '#D8E0F0', marginLeft:22,marginRight:22}}>
      <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#D8E0F0' }}>
        <View style={{ flex: 1, padding: 10, borderRightWidth: 1, borderRightColor: '#D8E0F0', backgroundColor: '#1F1D2B' }}>
          <Text style={{ fontWeight: 'bold' ,color:'#D8E0F0'}}>Header 1</Text>
        </View>
        <View style={{ flex: 1, padding: 10, borderRightWidth: 1, borderRightColor: '#D8E0F0', backgroundColor: '#1F1D2B' }}>
          <Text style={{ fontWeight: 'bold',color:'#D8E0F0' }}>Header 2</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#D8E0F0' }}>
        <View style={{ flex: 1, padding: 10, borderRightWidth: 1, borderRightColor: '#D8E0F0' }}>
          <Text style={{color:'#D8E0F0'}}>Data 1</Text>
        </View>
        <View style={{ flex: 1, padding: 10, borderRightWidth: 1, borderRightColor: '#D8E0F0' }}>
          <Text style={{color:'#D8E0F0'}}>Data 2</Text>
        </View>
      </View>
    </View>
      
    <View style={{ borderWidth: 1, borderColor: '#D8E0F0', marginLeft:22,marginRight:22,marginTop:20}}>
      <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#D8E0F0' }}>
        <View style={{ flex: 1, padding: 10, borderRightWidth: 1, borderRightColor: '#D8E0F0', backgroundColor: '#1F1D2B' }}>
          <Text style={{ fontWeight: 'bold' ,color:'#D8E0F0'}}>Header 1</Text>
        </View>
        <View style={{ flex: 1, padding: 10, borderRightWidth: 1, borderRightColor: '#D8E0F0', backgroundColor: '#1F1D2B' }}>
          <Text style={{ fontWeight: 'bold',color:'#D8E0F0' }}>Header 2</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#D8E0F0' }}>
        <View style={{ flex: 1, padding: 10, borderRightWidth: 1, borderRightColor: '#D8E0F0' }}>
          <Text style={{color:'#D8E0F0'}}>Data 1</Text>
        </View>
        <View style={{ flex: 1, padding: 10, borderRightWidth: 1, borderRightColor: '#D8E0F0' }}>
          <Text style={{color:'#D8E0F0'}}>Data 2</Text>
        </View>
      </View>
    </View>
    </View>
  )
}

export default Inventar