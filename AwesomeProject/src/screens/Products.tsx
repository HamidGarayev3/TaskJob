import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  NativeScrollEvent,
  Dimensions,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import RNFS from 'react-native-fs';
import Inventar from './Inventar';
import {useDispatch} from 'react-redux';
import {addItem} from '../components/inventorySlice'; // Import the new thunk action
import {AppDispatch} from '../components/store';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface Item {
  Barcode: string | number;
  Name: string;
  ID: number;
  InPrice: number;
  Stock: number;
  // Add other properties as needed
}

const Products: React.FC<{navigation: any}> = ({navigation}) => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState<string>(''); // State for search input text
  const [itemList, setItemList] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedBarcodes, setGeneratedBarcodes] = useState<number[]>([]); // Keep track of generated barcodes

  const filteredItems = itemList.filter(
    item =>
      item.Name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.Barcode.toString().includes(searchText),
  );

  useEffect(() => {
    fetchItems();
  }, []);

  const generateUniqueBarcode = (): number => {
    let newBarcode: number;
    do {
      newBarcode = Math.floor(Math.random() * 100000);
    } while (generatedBarcodes.includes(newBarcode));
    return newBarcode;
  };

  const fetchItems = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const fileUri = `${RNFS.DocumentDirectoryPath}/jsonData.json`;
      const fileContent = await RNFS.readFile(fileUri, 'utf8');

      if (fileContent) {
        const parsedData = JSON.parse(fileContent);
        const itemsArray: Item[] = parsedData.Item;

        setItemList(itemsArray);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = (event: NativeScrollEvent) => {
    if (!isLoading) {
      const contentHeight = event.contentSize.height;
      const scrollViewHeight = windowHeight;
      const scrollOffset = event.contentOffset.y;

      const isCloseToBottom =
        contentHeight - scrollViewHeight - scrollOffset <= 20;

      if (isCloseToBottom) {
        fetchItems();
      }
    }
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Inventar')}
          style={styles.iconContainer}>
          <Image
            source={require('../assets&styles/back.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TextInput
          placeholderTextColor={'#F4F9FD'}
          style={[styles.searchInput, {borderRadius: 5}]}
          placeholder="Type to search"
          value={searchText} // Bind the value to the state
          onChangeText={text => setSearchText(text)}
        />
        <TouchableOpacity style={styles.iconContainer}>
          <Image
            source={require('../assets&styles/filter.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        initialNumToRender={10} 
        data={filteredItems}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              dispatch(addItem(item)); // Dispatch action to add the selected item
              navigation.navigate('Inventar'); // Navigate to the Inventar screen
            }}
            key={item.Barcode}>
            <View style={[styles.card]}>
              <View style={{flex: 1}}>
                <View style={styles.halfContainer}>
                  <View style={styles.leftHalf}>
                    <View style={styles.topHalf}>
                      <Text style={styles.topHalfText2}>{item.Name}</Text>
                      <Text style={{fontSize: 12, color: 'white'}}>
                        {item.ID}
                      </Text>
                    </View>
                    <View style={styles.horizontalDivider} />
                    <View style={styles.bottomHalf}>
                      <Text style={{fontSize: 16, color: 'white'}}>
                        {item.Barcode}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.verticalDivider} />
                  <View style={styles.rightHalf}>
                    <View style={styles.topHalf}>
                      <Text style={styles.topHalfText1}>{item.Stock}</Text>
                    </View>
                    <View style={styles.horizontalDivider} />
                    <View style={styles.bottomHalf}>
                      <Text style={styles.bottomHalfText}>
                        {item.InPrice} AZN
                      </Text>
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
    height: 120,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    flexDirection: 'column',
    marginTop: 30,
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
    alignContent: 'center',
    textAlign: 'center',
    marginTop: 12,
  },
  topHalfText2: {
    fontSize: 14,
    color: '#F4F9FD',
    fontWeight: '700',
  },
  bottomHalfText: {
    fontSize: 16,
    color: '#F4F9FD',
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default Products;
