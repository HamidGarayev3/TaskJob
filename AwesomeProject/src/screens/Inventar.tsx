import { View, Text, TouchableOpacity, Image, TextInput, Switch } from 'react-native'
import React, { useState } from 'react'
import Scan from './HomePage'
import { ScrollView } from 'react-native-gesture-handler';

const Inventar = ({navigation}:any) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={{flex:1,backgroundColor:'#1F1D2B'}}>
      <ScrollView>
      <View style={{flex:2,flexDirection:'row',marginTop:30,paddingHorizontal:20}}>
      <TouchableOpacity onPress={() =>
            navigation.goBack()
            }  style={{backgroundColor:'#1F1D2B',borderRadius:5,borderWidth:1,borderColor:'white',width:40,height:44,alignContent:'center',alignItems:'center',justifyContent:'center'}}>
        <Image
        source={require('../assets&styles/back.png')}
        style={{ width: 24, height: 24,}}
      />
        </TouchableOpacity>
        <TextInput placeholderTextColor={'#F4F9FD'} style={{marginLeft:10, borderRadius:5,borderWidth:1,borderColor:'#F4F9FD',width:230,height:44,textAlignVertical:'top',fontWeight:'500',fontSize:14,color:'#F4F9FD'}} placeholder='Type to search'></TextInput>
      </View>
      <View style={{flex:1.5,flexDirection:'row',paddingHorizontal:20,marginTop:20}}>
      <Text style={{fontSize:20,color:'#F4F9FD',fontWeight:"700"}}>1000001</Text>
      <Text style={{fontSize:20,color:'#F4F9FD',fontWeight:"700",marginLeft:95}}>12.22.2023</Text>
      </View>
     <View style={{paddingHorizontal:20}}>
     <View style={{flex:1,flexDirection:'row',marginTop:20,marginBottom:20}}>
      <Image
        source={require('../assets&styles/igid.png')}
        style={{ width:275, height: 5}}
      />
      
      </View>
     </View>
     <View style={{paddingHorizontal:20}}>
     <View style={{flex:1.4,borderRadius:5,flexDirection:'row',borderWidth:1,borderColor:'#D8E0F0',padding:7}}>
      <Text style={{fontSize:20,color:'#F4F9FD',fontWeight:"700",marginTop:5}}>Azərsun MMC</Text>
      <TouchableOpacity>
      <Image
        source={require('../assets&styles/dots.png')}
        style={{ width: 30, height: 30,marginLeft:110}}
      />
      </TouchableOpacity>
      </View>
     </View>
     <View style={{paddingHorizontal:20,marginTop:20}}>
     <View style={{flex:1.4,borderRadius:5,flexDirection:'row',borderWidth:1,borderColor:'#D8E0F0',padding:7}}>
      <Text style={{fontSize:20,color:'#F4F9FD',fontWeight:"700",marginTop:5}}>Azərsun MMC</Text>
      <TouchableOpacity>
      <Image
        source={require('../assets&styles/dots.png')}
        style={{ width: 30, height: 30,marginLeft:110}}
      />
      </TouchableOpacity>
      </View>
     </View>
      <View style={{flex:1,paddingHorizontal:20,flexDirection:'row',marginTop:20,marginBottom:20}}>
      <Image
        source={require('../assets&styles/igid.png')}
        style={{ width: 275, height: 5}}
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
      
    <View style={{ borderWidth: 1, borderColor: '#D8E0F0', marginLeft:22,marginRight:22,marginTop:20,marginBottom:20}}>
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
      </ScrollView>
    </View>
  )
}

export default Inventar