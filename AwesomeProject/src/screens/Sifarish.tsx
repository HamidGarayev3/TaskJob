import { View, Text, TouchableOpacity, Image, TextInput,StyleSheet } from 'react-native'
import React from 'react'
import Scan from './HomePage'
import { useNavigation } from '@react-navigation/native';





const Sifarish = ({navigation}:any) => {
  
  return (
    <View style={{flex:1,backgroundColor:'#1F1D2B'}}>
      <View style={{flex:2,flexDirection:'row',marginTop:30,paddingHorizontal:20}}>
      <TouchableOpacity onPress={() =>
            navigation.goBack()
            }  style={{backgroundColor:'#1F1D2B',borderRadius:5,borderWidth:1,borderColor:'white',width:40,height:44,alignContent:'center',alignItems:'center',justifyContent:'center'}}>
        <Image
        source={require('../assets&styles/back.png')}
        style={{ width: 24, height: 24,}}
      />
        </TouchableOpacity>
        <TextInput placeholderTextColor={'#F4F9FD'} style={{marginLeft:10, borderRadius:5,borderWidth:1,borderColor:'#F4F9FD',width:190,height:44,textAlignVertical:'top',fontWeight:'500',fontSize:14,color:'#F4F9FD'}} placeholder='Type to search'></TextInput>
        <TouchableOpacity onPress={() =>
            navigation.goBack()
            }  style={{backgroundColor:'#1F1D2B',borderRadius:5,borderWidth:1,borderColor:'white',width:40,height:44,alignContent:'center',alignItems:'center',justifyContent:'center',marginLeft:10}}>
        <Image
        source={require('../assets&styles/filter.png')}
        style={{ width: 24, height: 24,}}
      />
        </TouchableOpacity>
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
      
    <View style={{ borderWidth: 1, borderColor: '#D8E0F0', marginLeft:22,marginRight:22,marginTop:20,marginBottom:170}}>
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

        {/* <View style={styles.circle}>
      <Text style={styles.plus}>+</Text>
    </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Sifarish