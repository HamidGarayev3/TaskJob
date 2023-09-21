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
    Modal,
  Pressable,
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
import { resetSelectedPerson, setSelectedPerson } from '../components/personSlice'; // Update the import path
import { updateSay } from '../components/inventorySlice'; // Update the path as needed
import { setOkPressed } from '../components/inventarSlice';
import { clearItems,addItem,deleteItem  } from '../components/inventorySlice'; // Update the path as needed
import { resetSelectedStock } from '../components/stockSlice';
import { setPlusButtonPressed } from '../components/malMedaxilSlice'; // Update with the correct path



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
  Say: number; // Add the Say property here
}
  

const Inventar: React.FC = ({ navigation }: any) => {

    const selectedStockName = useSelector((state: { stock: { selectedStockName: string } }) => state.stock.selectedStockName);
    const selectedPersonName = useSelector((state: { person: { selectedPersonName: string } }) => state.person.selectedPersonName);
    const inventoryItems = useSelector((state: RootState) => state.inventory.items);
    const selectedItems = useSelector((state: RootState) => state.inventory.items);
    const selectedPersonID = useSelector((state: RootState) => state.person.selectedPersonID);
    const selectedStockID = useSelector((state: RootState) => state.stock.selectedStockID);
    const selectedValue = useSelector((state: RootState) => state.selectedItem.selectedValue)
    const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
    const [modalVisible, setModalVisible] = useState(false);


    const isPlusButtonPressed = useSelector(
      (state: { malMedaxil: { isPlusButtonPressed: boolean } }) => state.malMedaxil.isPlusButtonPressed
    );
    useEffect(() => {
      // Check if the plus button was pressed in MalMedaxil
      if (isPlusButtonPressed && inputRef.current) {
        // Set focus to the input field
        inputRef.current.focus();
  
        // Reset the flag to avoid keeping focus on next renders
        dispatch(setPlusButtonPressed(false));
      }
    }, [isPlusButtonPressed]);
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







  const [deleteEditModalVisible, setDeleteEditModalVisible] = useState(false);

  // Function to open the delete/edit modal
  const openDeleteEditModal = (index: number) => {
    setSelectedItemIndex(index);
    setDeleteEditModalVisible(true);
  };

  // Function to close the delete/edit modal
  const closeDeleteEditModal = () => {
    setDeleteEditModalVisible(false);
  };

  // Function to handle delete action
  const handleDeleteItem = () => {
    if (selectedItemIndex !== -1) {
      // Dispatch the deleteItem action with the selected item's ID
      dispatch(deleteItem(selectedItems[selectedItemIndex].ID));
      closeDeleteEditModal();
    }
  };

  // Function to handle edit action
  const handleEditItem = () => {
    if (selectedItemIndex !== -1) {
      // Close the delete/edit modal
      closeDeleteEditModal();

      // Open the Say edit modal for the selected item's index
      openPopup(selectedItemIndex);
    }
  };

  const isScreenFocused = useIsFocused();

  const [focusState, setFocusState] = useState(false); // Focus state

  useEffect(() => {
    if (isScreenFocused) {
      // When the screen is focused, set focusState to true
      setFocusState(true);

      // Focus the TextInput when the screen comes into focus
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      // When the screen is unfocused, set focusState to false
      setFocusState(false);
    }
  }, [isScreenFocused]);


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
    console.log('Input Value Changed:', text);
  
    setInputValue(text);
  
    // Move the fetchItemDetails call to a separate useEffect
  };
  
  useEffect(() => {7.
    if (inputValue) {
      console.log('Barcode:', inputValue);
      // Reset the input value after processing
      setInputValue('');
    }
  }, [inputValue]);


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

  const [selectedItemsForSaving, setSelectedItemsForSaving] = useState<Item[]>([]);

  // ...
  
  const fetchItemDetails = async (barcode: string) => {
  try {
    setIsLoading(true);
    setStatus('Sorğu başladı');

    const foundItem = itemsHashTable[barcode];
    if (foundItem) {
      console.log('Item details:', foundItem);
      setStatus('Sorğu uğurlu oldu');

      // Check if the item already exists in selectedItems
      const existingItemIndex = selectedItems.findIndex((item) => item.ID === foundItem.ID);

      if (existingItemIndex !== -1) {
        // Item already exists, increment the Say property by 1
        const updatedItems = [...selectedItems];
        updatedItems[existingItemIndex].Say += 1;

        // Dispatch the updated selectedItems array
        dispatch({ type: 'inventory/updateSay', payload: updatedItems });
      } else {
        // Item does not exist, add it to selectedItems with Say set to 1
        dispatch({ type: 'inventory/addItem', payload: { ...foundItem, Say: 1 } });
      }

      setItemList((prevItems) => [...prevItems, foundItem]);
    } else {
      Alert.alert('Item not found');
      console.log('Item not found.');
      setFocusState(true)
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
  }, [inputValue]);

  useEffect(() => {
    if (inputValue) {
      console.log('Barcode:', inputValue);
      // Reset the input value after processing
      setInputValue('');
      fetchItemDetails(inputValue); // Send request every time input value changes
    }
  }, [inputValue]);
 ;
 const resetAllStates = () => {
  // Reset selectedPersonName and selectedStockName
  dispatch(resetSelectedPerson());
  dispatch(resetSelectedStock());

  // Reset selectedItems (assuming you want to clear the items array)
  dispatch(clearItems()); // Define this action in your inventorySlice
  // Add more state resets if needed
};
 
 
  
  
const handleOkPress = async () => {
  try {
    if (selectedItems.length > 0) {
      const currentDate = new Date().toLocaleDateString('en-US');
      const docSum = '99'; // Implement this function

      const mallarArray = selectedItems.map((item) => ({
        IDmal: item.ID,
        Say: item.Say,
        Qiymet: item.InPrice,
        Cemi: item.Say * item.InPrice, // Calculate the Cemi property
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

      // Ensure selectedValue is defined
      if (!selectedValue) {
        console.error('Error: selectedValue is not defined.');
        return;
      }

      // Read the existing data
      let existingData = '{}'; // Initialize with an empty object
      const filePath = `${RNFS.DocumentDirectoryPath}/qaimeler.json`;
      const fileContent = await RNFS.readFile(filePath, 'utf8');
      if (fileContent) {
        existingData = fileContent;
      }
      console.log('Existing Data Before Save:', existingData); // Debug line
      const parsedExistingData = JSON.parse(existingData);
      console.log('Parsed Existing Data Before Save:', parsedExistingData);

      // Find or create an array based on the selectedValue
      if (!parsedExistingData[selectedValue]) {
        parsedExistingData[selectedValue] = [];
      }

      // Push the new data object into the array without "doc" key
      parsedExistingData[selectedValue].push(newData);

      // Save the updated data to the JSON file
      await RNFS.writeFile(filePath, JSON.stringify(parsedExistingData), 'utf8');

      // Clear the selected items array after saving
      dispatch(setOkPressed(true));
      setSelectedItemsForSaving([]);
      resetAllStates();

      // Read the existing data again to get the updated data
      const updatedFileContent = await RNFS.readFile(filePath, 'utf8');
      if (updatedFileContent) {
        console.log('Existing Data After Save:', updatedFileContent);
        const updatedParsedData = JSON.parse(updatedFileContent);
        console.log('Parsed Existing Data After Save:', updatedParsedData);
      }

      // Navigate to the next screen (MalMedaxil) after saving
      navigation.navigate('MalMedaxil');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const Save = async () => {
  try {
    if (selectedItems.length > 0) {
      const currentDate = new Date().toLocaleDateString('en-US');
      const docSum = '99'; // Implement this function

      const mallarArray = selectedItems.map((item) => ({
        IDmal: item.ID,
        Say: item.Say,
        Qiymet: item.InPrice,
        Cemi: item.Say * item.InPrice, // Calculate the Cemi property
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

      // Ensure selectedValue is defined
      if (!selectedValue) {
        console.error('Error: selectedValue is not defined.');
        return;
      }

      // Read the existing data
      let existingData = '{}'; // Initialize with an empty object
      const filePath = `${RNFS.DocumentDirectoryPath}/qaimeler.json`;
      const fileContent = await RNFS.readFile(filePath, 'utf8');
      if (fileContent) {
        existingData = fileContent;
      }
      console.log('Existing Data Before Save:', existingData); // Debug line
      const parsedExistingData = JSON.parse(existingData);
      console.log('Parsed Existing Data Before Save:', parsedExistingData);

      // Find or create an array based on the selectedValue
      if (!parsedExistingData[selectedValue]) {
        parsedExistingData[selectedValue] = [];
      }

      // Push the new data object into the array without "doc" key
      parsedExistingData[selectedValue].push(newData);

      // Save the updated data to the JSON file
      await RNFS.writeFile(filePath, JSON.stringify(parsedExistingData), 'utf8');

      // Clear the selected items array after saving
      dispatch(setOkPressed(true));
      setSelectedItemsForSaving([]);
      

      // Read the existing data again to get the updated data
      const updatedFileContent = await RNFS.readFile(filePath, 'utf8');
      if (updatedFileContent) {
        console.log('Existing Data After Save:', updatedFileContent);
        const updatedParsedData = JSON.parse(updatedFileContent);
        console.log('Parsed Existing Data After Save:', updatedParsedData);
      }

      // Navigate to the next screen (MalMedaxil) after saving
  
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const Exit = async () => {
  navigation.navigate('MalMedaxil');

};





const [changeSayModalVisible, setChangeSayModalVisible] = useState(false);
const [selectedItemForModal, setSelectedItemForModal] = useState<Item | null>(null);


  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // ... Other code ...

  // Function to open the pop-up
  const openPopup = (index: number) => {
    setSelectedItemIndex(index);
    setIsPopupOpen(true);
  };

  // Function to handle input change
  // const handleInputChangee = (text: string) => {
  //   setInputValue(text);
  // };

  // Function to update the Say property and close the pop-up
  const updateSayProperty = () => {
    if (selectedItemIndex !== -1) {
      const newSayValue = parseInt(modalInputValue, 10); // Convert modalInputValue to a number
      if (!isNaN(newSayValue)) {
        // Dispatch the action to update the "Say" property
        dispatch(updateSay({ itemId: selectedItems[selectedItemIndex].ID, newSay: newSayValue }));
        setModalInputValue(''); // Clear input in the modal
        setIsPopupOpen(false); // Close the pop-up
      }
    }
  };
  
  
  
  const closePopup = () => {
    setInputValue('');
    setIsPopupOpen(false);
  };
  

  // Function to close the pop-up
  const [modalInputValue, setModalInputValue] = useState('');

  

    return (
<View style={styles.appContainer}>
            <View style={{ display: 'none' }}>
            {focusState && (
        <TextInput
          ref={inputRef}
          value={inputValue}
          onChangeText={handleInputChange}
          style={{ height: 0 }}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          autoCapitalize="none"
          autoFocus={true}
        />
      )}
      </View>
            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                <Image source={require('../assets&styles/back.png')} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
               
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
            {selectedItems.map((item, index) => (
  <TouchableOpacity key={item.Barcode} onPress={() => openDeleteEditModal(index)}>
    <View style={[styles.card]}>
      <View style={{ flex: 1 }}>
        <View style={styles.halfContainer}>
          <View style={styles.leftHalf}>
            <View style={styles.topHalf}>
              <Text style={styles.topHalfText2}>{item.Name}</Text>
              <Text style={{ fontSize: 12, color: 'white' }}>{item.ID.toString()}</Text>
            </View>
            <View style={styles.horizontalDivider} />
            <View style={styles.bottomHalf}>
              <Text style={{ fontSize: 16, color: 'white' }}>{item.Barcode}</Text>
            </View>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.rightHalf}>
            <View style={styles.topHalf}>
              <Text style={styles.topHalfText1}>{item.Say}</Text>
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
            <Modal visible={deleteEditModalVisible} transparent animationType="slide">
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text style={styles.modalTitle}>Options for the selected item:</Text>
      <TouchableOpacity style={styles.optionButton} onPress={handleDeleteItem}>
        <Text style={styles.optionButtonText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={handleEditItem}>
        <Text style={styles.optionButtonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={closeDeleteEditModal}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
            <Modal visible={isPopupOpen} transparent animationType="slide">
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text>Enter Say:</Text>
      <TextInput
              style={styles.modalInput}
              value={modalInputValue}
              onChangeText={(text) => setModalInputValue(text)} // Update modalInputValue state
              keyboardType="numeric"
            />
      <TouchableOpacity onPress={updateSayProperty}><Text>OK</Text></TouchableOpacity>
      <TouchableOpacity onPress={closePopup}><Text>Cancel</Text></TouchableOpacity>
    </View>
  </View>
</Modal>
            <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={() => { handleOkPress(); resetAllStates(); navigation.navigate('MalMedaxil') }} style={[styles.infoButton, styles.uiButton,{backgroundColor:'white',}]}>
                        <Text style={[styles.uiButtonText,{color:'#1F1D2B'}]}>Ok</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Save();Alert.alert('Data Saved') }} style={[styles.infoButton, styles.uiButton,{backgroundColor:'#22B07D',}]}>
                        <Text style={[styles.uiButtonText,{color:'white'}]}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> {resetAllStates(); navigation.navigate('MalMedaxil')}} style={[styles.infoButton, styles.uiButton,{backgroundColor:'#FFF6E9',}]}>
                        <Text style={[styles.uiButtonText,{color:'#FFA523'}]}>Exit</Text>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5, // Shadow on Android
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#22B07D", // Green
    padding: 10,
    width: 150,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  optionButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#FF6347", // Red
    padding: 10,
    width: 150,
    alignItems: "center",
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
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
