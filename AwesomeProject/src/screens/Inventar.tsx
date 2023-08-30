import React, { useState, useEffect, useRef } from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
} from 'react-native';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import store from '../components/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../components/store';
import MalMedaxil from '../screens/MalMedaxil'
import { setSelectedPerson } from '../components/personSlice'; // Update the import path



type Card = {
  id: number;
  translateX: Animated.SharedValue<number>;
};

interface Item {
    Barcode: string | number;
    Name: string;
    ID: number;
    InPrice: number;
    Stock: number;
    // Add other properties as needed
  }
  
  

const Inventar: React.FC = ({ navigation }: any) => {

    const selectedStockName = useSelector((state: { stock: { selectedStockName: string } }) => state.stock.selectedStockName);
    const selectedPersonName = useSelector((state: { person: { selectedPersonName: string } }) => state.person.selectedPersonName);
    const inventoryItems = useSelector((state: RootState) => state.inventory.items);
    const selectedItems = useSelector((state: RootState) => state.inventory.items);
    const [selectedItemsForSaving, setSelectedItemsForSaving] = useState<Item[]>([]);
    const selectedPersonID = useSelector((state: RootState) => state.person.selectedPersonID);
    const selectedStockID = useSelector((state: RootState) => state.stock.selectedStockID);
    const selectedValue = useSelector((state: RootState) => state.selectedItem.selectedValue);


  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<TextInput>(null);
  const [status, setStatus] = useState('');
  const [itemName, setItemName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [InPrice, setInPrice] = useState('');
  const [OutPrice, setOutPrice] = useState('');
  const [StockPrice, setStockPrice] = useState('');
  const [Stock, setStock] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [itemsHashTable, setItemsHashTable] = useState<{ [key: string]: any }>({});
  const [itemList, setItemList] = useState<any[]>([]); // Maintain the list of items
  const [cards, setCards] = useState<Card[]>([]); // Maintain the list of animated cards

  const dispatch = useDispatch();

  
  const { api, username, password } = useSelector((state: RootState) => state.service);

  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const savedApi = await AsyncStorage.getItem('api');
        const savedUsername = await AsyncStorage.getItem('username');
        const savedPassword = await AsyncStorage.getItem('password');

        if (savedApi) {
          dispatch({ type: 'service/setApi', payload: savedApi });
        }

        if (savedUsername) {
          dispatch({ type: 'service/setUsername', payload: savedUsername });
        }

        if (savedPassword) {
          dispatch({ type: 'service/setPassword', payload: savedPassword });
        }
      } catch (error) {
        console.error('Error fetching saved data:', error);
      }
    };

    fetchStoredData();
  }, []);
 useFocusEffect(
  React.useCallback(() => {
    // Code to run when the screen comes into focus
    // You can add your component initialization logic here
    // For example, you can reset your state variables
    
    setInputValue('');
    setStatus('');
    setItemName('');
    setBarcode('');
    setInPrice('');
    setOutPrice('');
    setStockPrice('');
    setStock('');
    setItemsHashTable({});

    // Return a cleanup function that will be run when the screen goes out of focus
    return () => {
      // Clean up logic, if needed
      // For example, you can reset state variables, clear timeouts, unsubscribe from subscriptions, etc.
      setInputValue('');
    setStatus('');
    setItemName('');
    setBarcode('');
    setInPrice('');
    setOutPrice('');
    setStockPrice('');
    setStock('');
    setItemsHashTable({});
    };
  }, [])
);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (inputValue) {
      console.log('Barcode:', inputValue);
      // Reset the input value after processing
      setInputValue('');
    }
  }, [inputValue]);

  useEffect(() => {
    createHashTable();
  }, []);

  const handleInputChange = (text: string) => {
    setInputValue(text);
    fetchItemDetails(text); // Send request every time input value changes
};


  const createHashTable = async () => {
    const fileUri = `${RNFS.DocumentDirectoryPath}/jsonData.json`;
    const fileContent = await RNFS.readFile(fileUri, 'utf8');

    if (fileContent) {
      const parsedData = JSON.parse(fileContent);
      const itemsArray = parsedData.Item;

      if (itemsArray && itemsArray.length > 0) {
        const newItemsHashTable: { [key: string]: any } = {};
        itemsArray.forEach((item: any) => {
          newItemsHashTable[item.Barcode] = item;
        });
        setItemsHashTable(newItemsHashTable);
      }
    }
  };

  const fetchItemDetails = async (barcode: string) => {
    try {
        setIsLoading(true);
        setStatus('Sorğu başladı');

        const foundItem = itemsHashTable[barcode];
        if (foundItem) {
            console.log('Item details:', foundItem);
            setStatus('Sorğu uğurlu oldu');
            setItemList((prevItems) => [...prevItems, foundItem]);
            
            // Add the found item to the selected items array
            setSelectedItemsForSaving((prevSelectedItems) => [...prevSelectedItems, foundItem]);
        } else {
            Alert.alert('Item not found')
            console.log('Item not found.');
            setStatus('Sorğu uğursuz oldu');
        }
    } catch (error) {
        console.error('Error:', error);
        setStatus('Sorğu alınmadı');
    } finally {
        setIsLoading(false);
    }
};




  const getLastItemDetails = async () => {
    try {
      const lastItemDetails = await AsyncStorage.getItem('lastItemDetails');
      if (lastItemDetails) {
        const itemDetails = JSON.parse(lastItemDetails);
        setItemName(itemDetails.itemName);
        setBarcode(itemDetails.barcode);
        setInPrice(itemDetails.inPrice);
        setOutPrice(itemDetails.outPrice);
        setStock(itemDetails.stock);
        setStockPrice(itemDetails.stockPrice);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getLastItemDetails();
  }, []);
 ;

 
 const handleOkPress = async () => {
    try {
        if (selectedItems.length > 0) {
            const currentDate = new Date().toLocaleDateString('en-US');
            
            
            const docSum = '99'; // Implement this function

            const mallarArray = selectedItems.map(item => ({
                IDmal: item.ID,
                Say: item.Stock,
                Qiymet: item.InPrice,
                Cemi: item.Stock * item.InPrice,
            }));

            const newData = {
                mdate: currentDate,
                IDPerson: selectedPersonID,
                IDAnbar: selectedStockID,
                DocSum: docSum,
                Mallar: mallarArray,
            };

            // Log the path to check if it's correct
            console.log('Document Directory Path:', RNFS.DocumentDirectoryPath);

            // Read the existing data
            const filePath = `${RNFS.DocumentDirectoryPath}/qaimeler.json`;
            const existingData = await RNFS.readFile(filePath, 'utf8');
            const parsedExistingData = JSON.parse(existingData);

            // Update the Medaxil array with the new data
            const nextDocNumber = Object.keys(parsedExistingData.Medaxil).length + 1;
            const newDocKey = `doc${nextDocNumber}`;

            // Create a new data object with the doc key
            const newDataWithDocKey = {
                [newDocKey]: newData,
            };

            // Update the Medaxil array with the new data
            const updatedMedaxil = {
                ...parsedExistingData.Medaxil,
                ...newDataWithDocKey,
            };

            const updatedData = {
                ...parsedExistingData,
                Medaxil: updatedMedaxil,
            };

            // Save the updated data to the JSON file
            await RNFS.writeFile(filePath, JSON.stringify(updatedData), 'utf8');

            // Clear the selected items array after saving
            
        }

        // Navigate to the next screen (MalMedaxill)
        navigation.navigate('MalMedaxil');
    } catch (error) {
        console.error('Error:', error);
    }
};


    return (
<View style={styles.appContainer}>
            <View style={{ display: 'none' }}>
        <TextInput
          ref={inputRef}
          value={inputValue}
          onChangeText={handleInputChange}
          style={{ height: 0 }}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <Text style={{fontSize:50,color:'white'}}>{selectedValue}</Text>
            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                <Image source={require('../assets&styles/back.png')} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
                <TextInput style={styles.searchInput} placeholder="Search..." placeholderTextColor="#F4F9FD"/>
                <TouchableOpacity style={styles.iconButton}>
                <Image source={require('../assets&styles/filter.png')} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.textBold}>1000001</Text>
                <Text style={styles.textBold}>12.22.2023</Text>
            </View>
            <View style={styles.paddingContainer}>
                <Image
                    source={require('../assets&styles/igid.png')}
                    style={styles.horizontalLine}
                />
            </View>
            <TouchableOpacity onPress={() =>
      navigation.navigate('Techizatci')
      } style={[styles.cardContainer,{marginBottom:20}]}>
                <Text style={styles.textBold}>{selectedPersonName}</Text>
                <TouchableOpacity>
                    <Image
                        source={require('../assets&styles/dots.png')}
                        style={styles.menuIcon}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>
      navigation.navigate('Depolar')
      } style={styles.cardContainer}>
                <Text style={styles.textBold}>{selectedStockName}</Text>
                <TouchableOpacity>
                    <Image
                        source={require('../assets&styles/dots.png')}
                        style={styles.menuIcon}
                    />
                </TouchableOpacity>
            </TouchableOpacity >
            <View style={styles.paddingContainer}>
                <Image
                    source={require('../assets&styles/igid.png')}
                    style={styles.horizontalLine}
                />
            </View>
            <ScrollView style={styles.container}>
            {selectedItems.map(item => (
                    <TouchableOpacity key={item.Barcode}>
                        <View style={[styles.card]}>
                            <View style={{ flex: 1 }}>
                                <View style={styles.halfContainer}>
                                    <View style={styles.leftHalf}>
                                        <View style={styles.topHalf}>
                                            <Text style={styles.topHalfText2}>{item.Name}</Text>
                                            <Text style={{fontSize:12,color:'white'}}>{item.ID}</Text>
                                        </View>
                                        <View style={styles.horizontalDivider} />
                                        <View style={styles.bottomHalf}>
                                            <Text style={{fontSize:16,color:'white'}}>{item.Barcode}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.verticalDivider} />
                                    <View style={styles.rightHalf}>
                                        <View style={styles.topHalf}>
                                            <Text style={styles.topHalfText1}>{item.Stock}</Text>
                                        </View>
                                        <View style={styles.horizontalDivider} />
                                        <View style={styles.bottomHalf}>
                                            <Text style={styles.bottomHalfText}>{item.InPrice} AZN</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={handleOkPress} style={[styles.infoButton, styles.uiButton,{backgroundColor:'white',}]}>
                        <Text style={[styles.uiButtonText,{color:'#1F1D2B'}]}>Ok</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.infoButton, styles.uiButton,{backgroundColor:'#22B07D',}]}>
                        <Text style={[styles.uiButtonText,{color:'white'}]}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.infoButton, styles.uiButton,{backgroundColor:'#FFF6E9',}]}>
                        <Text style={[styles.uiButtonText,{color:'#FFA523'}]}>Exit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={[styles.infoTotal,{backgroundColor:'#1F1D2B'}]}>
                        <Text style={[styles.uiButtonText,{color:'white',fontSize:12}]}>yekun</Text>
                        <Text style={[styles.uiButtonText,{color:'white'}]}>Info 3</Text>
                    </TouchableOpacity>
                </View>
    
            <TouchableOpacity
        onPress={() => navigation.navigate('Products')}
        style={styles.floatingButton}
      >
        <Text style={{color:'#1F1D2B',fontSize:24,fontWeight:'bold'}}>+</Text>
      </TouchableOpacity>
        </View>
        
    );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
},
halfContainer: {
    flex: 1,
    flexDirection: 'row',
},
leftHalf: {
    flex: 0.8,
    borderColor: 'white',
    flexDirection: 'column',
},
rightHalf: {
    flex: 0.4,
    flexDirection: 'column',

},
horizontalDivider: {
    borderBottomColor: 'white',
},
verticalDivider: {
    borderRightWidth: 1,
    borderRightColor: 'white',
},
topHalf: {
    flex: 0.9,
    borderColor: 'white',
    borderBottomWidth: 1,
    padding: 10,
},
bottomHalf: {
    flex: 0.5,
    padding: 10,
},
topHalfText1: {
    fontSize: 16,
    color: '#F4F9FD',
    alignContent:'center',
    textAlign:'center',
    marginTop:12
},
topHalfText2: {
    fontSize: 14,
    color: '#F4F9FD',
    fontWeight: '700',
},
bottomHalfText: {
    fontSize: 16,
    color: '#F4F9FD',
    textAlign:'center',
    alignSelf:'center'
},
  infoButton: {
    cardContainer: {
        padding: 20,
    },
    halfContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    leftHalf: {
        flex: 0.8,
        borderColor: 'white',
        flexDirection: 'column',
    },
    rightHalf: {
        flex: 0.4,
        flexDirection: 'column',

    },
    horizontalDivider: {
        borderBottomColor: 'white',
    },
    verticalDivider: {
        borderRightWidth: 1,
        borderRightColor: 'white',
    },
    topHalf: {
        flex: 0.9,
        borderColor: 'white',
        borderBottomWidth: 1,
        padding: 10,
    },
    bottomHalf: {
        flex: 0.5,
        padding: 10,
    },
    topHalfText1: {
        fontSize: 16,
        color: '#F4F9FD',
        alignContent:'center',
        textAlign:'center',
        marginTop:12
    },
    topHalfText2: {
        fontSize: 14,
        color: '#F4F9FD',
        fontWeight: '700',
    },
    bottomHalfText: {
        fontSize: 16,
        color: '#F4F9FD',
        textAlign:'center',
        alignSelf:'center'
    },
    backgroundColor: '#8C81FF',
    borderWidth: 1,
    borderColor: 'white',
    width: '20%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginRight: 10,
},
infoTotal: {
  backgroundColor: '#8C81FF',
  borderWidth: 1,
  borderColor: 'white',
  width: '40%',
  height: 44,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 7,
  marginRight: 10,
},
infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
},
infoView: {
    backgroundColor: '#8C81FF',
    borderWidth: 1,
    borderColor: 'white',
    flex: 1.2,
    borderRadius: 8,
    padding: 10,
},
smallText: {
    fontSize: 12,
    color: 'white',
    marginBottom: 5,
},
centeredText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
},
  uiButton: {
    backgroundColor: '#8C81FF',
    borderWidth: 1,
    borderColor: 'white',
    width: '30%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginRight: 10,
},
uiButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
},

    scrollViewContent: {
        flexGrow: 1,
         // Adjust this as needed
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    iconButton: {
        backgroundColor:'#1F1D2B',
        width:40,
        height:44,
        justifyContent:'center',
        borderWidth:1,
        borderColor:'white',
        borderRadius:7,
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center'
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        color: '#F4F9FD',
        borderBottomColor: '#F4F9FD',
        borderBottomWidth: 1,
        marginBottom:10
    },
    rowContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20
    },
    textBold: {
        fontSize:20,
        color:'#F4F9FD',
        fontWeight:"700"
    },
    paddingContainer: {
        marginTop:20
    },
    horizontalLine: {
        width:'100%',
        height: 5,
        marginBottom:20
    },
    cardContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        borderWidth:1,
        borderColor:'#D8E0F0',
        padding:7,
        borderRadius:5,
    
    },
    menuIcon: {
        width: 30,
        height: 30
    },
 
    
    
    cardInner: {
        flex: 1,
        borderColor:'white',
        borderWidth:1,
        borderRadius:8,
        flexDirection: 'column',
    },
    
    plus: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold'
    },
    appContainer: {
        flex: 1,
        backgroundColor:'#1F1D2B',
        paddingHorizontal:20
    },
   
    container: {
        flex: 1,
    },
    deleteContainer: {
        position: 'absolute',
        width: 54,
        height: '100%',
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'white',
        backgroundColor:'#FFF6E9'
    },
    card: {
        width: '100%',
        height: 130,
        overflow: 'hidden',
        borderWidth:1,
        borderColor:'white',
        borderRadius:8,
        flexDirection: 'column',
        marginTop:20,
        marginBottom:10
    },
    topHalf: {
        flex: 0.6,
        borderColor:'white',
        borderBottomWidth:1,
        padding: 10
    },
    bottomHalf: {
        flex: 0.4,
        flexDirection: 'row',
    },
    bottomLeft: {
        flex: 1,
        borderColor:'white',
        borderRightWidth:1,
        padding: 10
    },
    bottomRight: {
        flex: 0.5,
        borderColor:'white',
        padding: 10
    },
    topHalfText1: {
        fontSize:12,
        color:'#F4F9FD',
        marginTop:10
    },
    topHalfText2: {
        fontSize:18,
        color:'#F4F9FD',
        fontWeight:"700",
    },
    bottomLeftText: {
        fontSize:16,
        color:'#F4F9FD'
    },
    bottomRightText: {
        fontSize:16,
        color:'#F4F9FD'
    },
   
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalInput: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    floatingButton: {
        backgroundColor: '#0AC947',
        position: 'absolute',
        right: 30,
        bottom: 30,
        borderRadius: 50 / 2,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
});

export default Inventar;
