import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
const ScanPage = ({navigation}:any) => {
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
        <Text style={{fontSize:20,color:'white',fontFamily:'digital-7',marginLeft:70}}>PN0001245</Text>
      </View>

      <View style={{flex:3,paddingHorizontal:20,marginTop:30}}>
        <View style={{borderRadius:10,borderWidth:2,borderColor:'#F4F9FD',width:'100%',height:'100%',}}>
        <Text  style={{textAlignVertical:'top',fontWeight:'500',fontSize:18,color:'#F4F9FD',marginLeft:7,marginTop:7}} >Məhsulun adı</Text>
        <Text  style={{textAlignVertical:'top',fontWeight:'500',fontSize:16,color:'#91929E',marginLeft:7}} >Description</Text>
        </View>
      
      
      </View>

      <View style={{flex:2}}></View>

      <View style={{flex:2.4,flexDirection:'row',paddingHorizontal:20}}>
      <TouchableOpacity style={{flex: 0.8, paddingHorizontal: 10, backgroundColor: '#FFA523', marginHorizontal: 5, borderRadius: 8,borderColor:'white',borderWidth:1}}>
    <Text style={{fontSize: 11, color: 'white', textAlign: 'center',alignSelf:'center',marginTop:7}}>maya deyeri</Text>
    <Text style={{fontSize: 11, color: 'white', textAlign: 'center',alignSelf:'center',marginTop:12}}>000.245</Text>
  </TouchableOpacity>

  <TouchableOpacity style={{flex: 0.8, paddingHorizontal: 10, backgroundColor: '#1F1D2B', marginHorizontal: 5, borderRadius: 8,borderColor:'white',borderWidth:1}}>
  <Text style={{fontSize: 11, color: 'white', textAlign: 'center',alignSelf:'center',marginTop:7}}>maya deyeri</Text>
    <Text style={{fontSize: 11, color: 'white', textAlign: 'center',alignSelf:'center',marginTop:12}}>000.245</Text>
  </TouchableOpacity>

  <TouchableOpacity style={{flex: 0.8, paddingHorizontal: 10, backgroundColor: '#525298', marginHorizontal: 5, borderRadius: 8,borderColor:'white',borderWidth:1}}>
  <Text style={{fontSize: 11, color: 'white', marginTop:7}}>maya deyeri</Text>
    <Text style={{fontSize: 11, color: 'white', textAlign: 'center',alignSelf:'center',marginTop:12}}>000.245</Text>
  </TouchableOpacity>
      </View>

      <View style={{flex:2.4,flexDirection:'row',paddingHorizontal:20,marginTop:10}}>
      <TouchableOpacity style={{flex: 0.8, paddingHorizontal: 10, backgroundColor: '#1F1D2B', marginHorizontal: 5, borderRadius: 8,borderColor:'white',borderWidth:1}}>
    <Text style={{fontSize: 11, color: 'white', textAlign: 'center',alignSelf:'center',marginTop:7}}>qalıq</Text>
    <Text style={{fontSize: 11, color: 'white', textAlign: 'center',alignSelf:'center',marginTop:12}}>000.245</Text>
  </TouchableOpacity>

  <TouchableOpacity style={{flex: 0.8, paddingHorizontal: 10, backgroundColor: '#22B07D', marginHorizontal: 5, borderRadius: 8,borderColor:'white',borderWidth:1}}>
  <Text style={{fontSize: 10.5, color: 'white', textAlign: 'center',alignSelf:'center',marginTop:7}}>satış qiyməti</Text>
  <Text style={{fontSize: 11, color: 'white', textAlign: 'center',alignSelf:'center',marginTop:12}}>000.245</Text>
  </TouchableOpacity>

  <TouchableOpacity style={{flex: 0.8, paddingHorizontal: 10, backgroundColor: '#1F1D2B', marginHorizontal: 5, borderRadius: 8,borderColor:'white',borderWidth:1}}>
  <Text style={{fontSize: 11, color: 'white', marginTop:7}}>topdan</Text>
    <Text style={{fontSize: 11, color: 'white', textAlign: 'center',alignSelf:'center',marginTop:12}}>000.245</Text>
  </TouchableOpacity>
      </View>

      <View style={{flex:2}}></View>

      <View style={{flex:3,paddingHorizontal:5,flexDirection:'row',marginBottom:50}}>
      <TouchableOpacity style={{flex:2.2,backgroundColor:'#F4F9FD',marginHorizontal:15,borderRadius:8,flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
      <Image
        source={require('../assets&styles/price.png')} 
        style={{ width: 17.86, height: 17.86 }}
      />
      <Text style={{marginLeft:10,fontSize:18,color:'#1F1D2B',fontWeight:"700"}}>Price</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flex:2.2,backgroundColor:'#F4F9FD',borderRadius:8,flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'center',marginHorizontal:15}}>
      <Image
        source={require('../assets&styles/print.png')} 
        style={{ width: 17.86, height: 17.86 }}
      />
      <Text style={{marginLeft:10,fontSize:18,color:'#1F1D2B',fontWeight:"700"}}>Print</Text>
      </TouchableOpacity>
      </View>





    </View>
  )
}

export default ScanPage