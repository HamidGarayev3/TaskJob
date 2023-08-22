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
import { useSelector } from 'react-redux';
import store from '../components/store';
type Card = {
  id: number;
  translateX: Animated.SharedValue<number>;
};

const Inventar: React.FC = ({ navigation }: any) => {

    const selectedStockName = useSelector((state: { stock: { selectedStockName: string } }) => state.stock.selectedStockName);
    const selectedPersonName = useSelector((state: { person: { selectedPersonName: string } }) => state.person.selectedPersonName);



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


        // Set the item details in the state
        setItemName(foundItem.Name);
        setBarcode(foundItem.Barcode);
        setInPrice(foundItem.InPrice);
        setOutPrice(foundItem.OutPrice);
        setStock(foundItem.Stock);
        setStockPrice(foundItem.StockPrice);

        // Save the item details to AsyncStorage
        const itemDetails = {
          itemName: foundItem.Name,
          barcode: foundItem.Barcode,
          inPrice: foundItem.InPrice,
          outPrice: foundItem.OutPrice,
          stock: foundItem.Stock,
          stockPrice: foundItem.StockPrice,
        };
        await AsyncStorage.setItem('lastItemDetails', JSON.stringify(itemDetails));
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
                {cards.map((card) => {
                    const gestureHandler = useAnimatedGestureHandler({
                        onStart: (_, ctx) => {
                            ctx.startX = card.translateX.value;
                        },
                        onActive: (event, ctx) => {
                            card.translateX.value = ctx.startX + event.translationX;
                        },
                        onEnd: () => {
                            if (card.translateX.value < -54) {
                                card.translateX.value = withSpring(-54);
                            } else {
                                card.translateX.value = withSpring(0);
                            }
                        },
                    });

                    const animatedStyle = useAnimatedStyle(() => {
                        return {
                            transform: [{ translateX: card.translateX.value }],
                        };
                    });

                    const deleteStyle = useAnimatedStyle(() => {
                        return {
                            opacity: interpolate(
                                card.translateX.value,
                                [-54, 0],
                                [1, 0],
                                Extrapolate.CLAMP
                            ),
                        };
                    });

                    return (
                        <View key={card.id} style={{ marginTop: 20 }}>
                            <Animated.View style={[styles.deleteContainer, deleteStyle]}>
                                <TouchableOpacity >
                                    <Image source={require('../assets&styles/trash.png')} style={{ width: 24, height: 24 }} />
                                </TouchableOpacity>
                            </Animated.View>
                            <PanGestureHandler onGestureEvent={gestureHandler}>
                                <Animated.View style={[styles.card, animatedStyle]}>
                                    <TouchableOpacity activeOpacity={1} style={{ flex: 1 }}>
                                        <View style={styles.topHalf}>
                                            <Text style={styles.topHalfText1}>Top Half</Text>
                                            <Text style={styles.topHalfText2}>Another Text</Text>
                                        </View>
                                        <View style={styles.bottomHalf}>
                                            <View style={styles.bottomLeft}><Text style={styles.bottomLeftText}>Bottom Left</Text></View>
                                            <View style={styles.bottomRight}><Text style={styles.bottomRightText}>Bottom Right</Text></View>
                                        </View>
                                    </TouchableOpacity>
                                </Animated.View>
                            </PanGestureHandler>
                        </View>
                    );
                })}
            </ScrollView>
            <View style={styles.rowContainer}>
                    <TouchableOpacity style={[styles.infoButton, styles.uiButton,{backgroundColor:'white',}]}>
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
  
  infoButton: {
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
