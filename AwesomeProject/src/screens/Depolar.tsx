import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, NativeScrollEvent, Dimensions,TextInput,Image,FlatList } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import RNFS from 'react-native-fs';
import { useDispatch } from 'react-redux';
import { setSelectedStock } from '../components/stockSlice';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import SQLite from 'react-native-sqlite-storage';
import { useIsFocused,useFocusEffect } from '@react-navigation/native'; // Import useIsFocused hook

const db = SQLite.openDatabase(
  {
    name: 'your_db_name.db',
    location: 'default',
  },
  () => console.log('Database opened successfully'),
  error => console.error('Error opening database:', error)
);

interface Item {
    StockID: string;
    StockName: string;
}
import Inventar from './Inventar';

const Depolar = ({ navigation }: any) => {

    const dispatch = useDispatch();
    const handleStockSelection = (stockName: string, stockID: string) => {
        dispatch(setSelectedStock({ name: stockName, id: stockID }));
        navigation.navigate('Inventar');
    };
   

    const [itemList, setItemList] = useState<Item[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [generatedBarcodes, setGeneratedBarcodes] = useState<number[]>([]); // Keep track of generated barcodes
    const [searchText, setSearchText] = useState<string>(''); // State for search input text


    const filteredItems = itemList.filter(
        item =>
          item.StockName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.StockID.toString().includes(searchText),
      );
      const isScreenFocused = useIsFocused();
      useEffect(() => {
        fetchItems();
      }, [isScreenFocused]);

    const generateUniqueBarcode = (): number => {
        let newBarcode: number;
        do {
            newBarcode = Math.floor(Math.random() * 100000);
        } while (generatedBarcodes.includes(newBarcode));
        return newBarcode;
    };

    const fetchItems = async () => {
        try {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM Stocks;', // Adjust the query based on your table structure
              [],
              (_, result) => {
                const itemsArray: Item[] = [];
                for (let i = 0; i < result.rows.length; i++) {
                  itemsArray.push(result.rows.item(i));
                }
                console.log('ItemsArray',itemsArray)

                setItemList(itemsArray);
              },
              error => console.error('Error fetching items from SQLite:', error)
            );
          });
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      };

    const handleScroll = (event: NativeScrollEvent) => {
        if (!isLoading) {
            const contentHeight = event.contentSize.height;
            const scrollViewHeight = windowHeight;
            const scrollOffset = event.contentOffset.y;

            const isCloseToBottom = contentHeight - scrollViewHeight - scrollOffset <= 20;

            if (isCloseToBottom) {
                fetchItems();
            }
        }
    };

  

    return (
        <View style={styles.appContainer}>
            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={() =>navigation.navigate('Inventar') } style={styles.iconContainer}>
                    <Image source={require('../assets&styles/back.png')} style={styles.icon} />
                </TouchableOpacity>
                <TextInput
                    placeholderTextColor={'#F4F9FD'}
                    style={[styles.searchInput, { borderRadius: 5 }]}
                    placeholder='Type to search'
                    value={searchText} // Bind the value to the state
          onChangeText={text => setSearchText(text)}
                />
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={require('../assets&styles/filter.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>

            <Text style={{fontSize:16,fontWeight:'700',marginLeft:20,color:'white',marginTop:20,marginBottom:10}}>Anbar</Text>
            <FlatList
        initialNumToRender={10} 
        data={filteredItems}
        renderItem={({item}) => (
           
          
           <TouchableOpacity onPress={() => handleStockSelection(item.StockName,item.StockID)} key={item.StockID} style={styles.cardContainer}>
                    <View style={[styles.card]}>
                        <View  style={{ flex: 1 }}>
                            <View style={styles.halfContainer}>
                                <View style={styles.leftHalf}>
                                    <View style={styles.topHalf}>
                                        <Text style={styles.topHalfText2}>{item.StockName}</Text>
                                    </View>
                                    <View style={styles.horizontalDivider} />
                                    <View style={styles.bottomHalf}>
                                        <View style={styles.bottomLeftTop}>
                                            <Text style={styles.bottomHalfText}>{item.StockID}</Text>
                                        </View>
                                        <View style={styles.horizontalDivider} />
                                        <View style={styles.bottomLeftBottom}>
                                            <Text style={styles.bottomHalfText}>Bottom Left Bottom</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.verticalDivider} />
                                <View style={styles.rightHalf}>
                                
                                    <View style={styles.topHalf}>
                                    <View style={{marginTop:25}}>
                                    <Image source={require('../assets&styles/info.png')} style={styles.icon} />
                                    </View>

                                    </View>
                                    <View  />
                                    <View style={styles.bottomHalf}>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
            </TouchableOpacity>
    )}
           />
        </View>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: '#1F1D2B',
    },
    card: {
        width: '100%',
        height: 100, // Adjust the height according to your design
        overflow: 'hidden',
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: 'column',
        marginTop: 10,
        borderRightColor:'orange',
        borderLeftColor:'white',
        borderTopColor:'white',
        borderBottomColor:'white'
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    searchInput: {
        flex: 1,
        color: '#F4F9FD',
        borderBottomColor: '#F4F9FD',
        borderBottomWidth: 1,
        marginHorizontal: 10,
    },
    iconContainer: {
        backgroundColor: '#1F1D2B',
        width: 40,
        height: 44,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginLeft: 5,
    },
    icon: {
        width: 24,
        height: 24,
    },
    cardContainer: {
       paddingHorizontal:20,
       marginTop:10,
       borderRightColor:'orange'
    },
    halfContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    leftHalf: {
        flex: 0.9,
        borderColor: 'orange',
        flexDirection: 'column',
    },
    rightHalf: {
        flex: 0.1,
        flexDirection: 'column',
        borderColor: 'orange',
        borderWidth: 1,
        alignSelf:'center',
        textAlign:'center',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    horizontalDivider: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },
    verticalDivider: {
        borderRightWidth: 1,
        borderRightColor: 'white',
        alignSelf:'center',
        textAlign:'center',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    topHalf: {
        flex: 0.5,
        borderColor: 'orange',
        padding: 10,
    },
    bottomHalf: {
        flex: 0.5,
        flexDirection: 'row',
    },
    bottomLeftTop: {
        flex: 0.5,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        borderRightWidth: 1,
        borderRightColor: 'white',
        padding: 10,
    },
    bottomLeftBottom: {
        flex: 0.5,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        padding: 10,
    },

    topHalfText1: {
        fontSize: 12,
        color: '#F4F9FD',
        marginBottom: 5,
        

    },
    topHalfText2: {
        fontSize: 16,
        color: '#F4F9FD',
        fontWeight: '700',
    },
    bottomHalfText: {
        fontSize: 16,
        color: '#F4F9FD',
    },
});

export default Depolar;
