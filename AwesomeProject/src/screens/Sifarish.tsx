import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import Scan from './Scan'


const Sifarish = ({navigation}:any) => {
  return (
    <View style={{flex:1,backgroundColor:'#1F1D2B'}}>
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
        <View style={{ borderWidth: 1, borderColor: '#D8E0F0', marginLeft:22,marginRight:22,marginTop:20}}>
      <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#D8E0F0' }}>
        <View style={{ flex: 1, padding: 10, borderRightWidth: 1, borderRightColor: '#D8E0F0', backgroundColor: '#1F1D2B' }}>
          <Text style={{ fontWeight: 'bold' ,color:'#D8E0F0'}}>Header 1</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#D8E0F0' }}>
        <View style={{ flex: 1, padding: 10, borderRightWidth: 1, borderRightColor: '#D8E0F0' }}>
          <Text style={{color:'#D8E0F0'}}>Data 1</Text>
        </View>
      </View>
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


    <View style={{flex:3,flexDirection:'row'}}>
      <View style={{marginTop:20,marginLeft:22}}>
      <TouchableOpacity onPress={() =>
            navigation.navigate('Scan')
            }  style={{backgroundColor:'#F4F9FD',width:56,height:44,borderRadius:5,marginTop:20}}>
      <Text style={{color:'black',fontSize:16,fontWeight:"700",textAlign:'center',textAlignVertical:'center',marginTop:9}}>Ok</Text>
      </TouchableOpacity>
      </View>
      <View style={{borderWidth:1,borderColor:'#D8E0F0',width:83,height:44,marginTop:39,marginLeft:210}}>
      <Text style={{color:'#D8E0F0',fontSize:12,}}>yekun</Text>
      <Text style={{color:'#D8E0F0',fontSize:16,fontWeight:"700",textAlign:'center',textAlignVertical:'center'}}>1245</Text>
      </View>
    </View>


    </View>
  )
}

export default Sifarish