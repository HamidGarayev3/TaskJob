import React, { useState, useEffect,useRef } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Image, TextInput, Modal, Button, Alert,FlatList } from 'react-native';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Inventar from './Inventar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import { setSelectedPerson } from '../components/personSlice'; // Update the import path
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../components/store';
import { setPlusButtonPressed } from '../components/malMedaxilSlice'; // Up
import { useIsFocused,useFocusEffect } from '@react-navigation/native'; // Import useIsFocused hook


type CardData = {
    key: string; // Add the key property for uniqueness
    PersonName: string;
    PersonId: string;
    DocSum: number;
    StockId: string;
};
  type DocData = {
    mdate: string;
    IDPerson: string;
    IDAnbar: string;
    DocSum: number;
    PersonName:string,
    StockName:string
    Mallar: {
        IDmal: string;
        Say: number;
        Qiymet: number | string; // This can be both a number or a string based on your JSON
        Cemi: number | null; // This can be both a number or null based on your JSON
    }[];
};
type DocObject = {
    [key: string]: DocData;
};

const App: React.FC = ({navigation}:any) => {

  const isScreenFocused = useIsFocused();
  const [focusState, setFocusState] = useState(false); // Focus state
  
  const componentRef = useRef<FlatList | null>(null);

  useEffect(() => {
    if (isScreenFocused) {
      console.log('Screen is focused');
      setFocusState(true);

      if (componentRef.current) {
        componentRef.current.scrollToOffset({ animated: false, offset: 0 });
      }
    } else {
      console.log('Screen is not focused');
      setFocusState(false);
    }
  }, [isScreenFocused]);
 


  const [showCardModal, setShowCardModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCardPress = (card: CardData) => {
    setSelectedCard(card);
    setShowCardModal(true);
  };

  const handleDeleteCard = () => {
    setShowDeleteModal(true);
  };

  const handleEdit = () => {
    setShowDeleteModal(false);
    navigation.navigate('Inventar')
  };

  const handleConfirmDelete = async () => {
    if (selectedCard) {
      // Remove the selected card from cardData
      const updatedCardData = cardData.filter((card) => card.key !== selectedCard.key);
      setCardData(updatedCardData);

      // Update the JSON file by removing the selected card's data
      try {
        const filePath = `${RNFS.DocumentDirectoryPath}/qaimeler.json`;
        const fileContent = await RNFS.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);

        // Ensure selectedValue is defined
        if (!selectedValue) {
          console.error('Error: selectedValue is not defined.');
          return;
        }

        // Check if jsonData[selectedValue] is an array
        if (Array.isArray(jsonData[selectedValue])) {
          // Find the index of the selected card in the JSON data
          const indexToRemove = jsonData[selectedValue].findIndex(
            (docObject: DocData) =>
              docObject.IDPerson === selectedCard.PersonId &&
              docObject.IDAnbar === selectedCard.StockId &&
              docObject.DocSum === selectedCard.DocSum
          );

          if (indexToRemove !== -1) {
            // Remove the item from the array
            jsonData[selectedValue].splice(indexToRemove, 1);

            // Save the updated JSON data back to the file
            const updatedJsonString = JSON.stringify(jsonData);
            await RNFS.writeFile(filePath, updatedJsonString, 'utf8');
          }
        }

        // Close both modals and reset selectedCard
        setSelectedCard(null);
        setShowCardModal(false);
        setShowDeleteModal(false);
      } catch (error) {
        console.error('Error updating JSON file:', error);
        Alert.alert('Error deleting card');
      }
    }

    setSelectedCard(null);
    setShowCardModal(false);
    setShowDeleteModal(false);
  };

  const handleCancel = () => {
    setSelectedCard(null);
    setShowCardModal(false);
    setShowDeleteModal(false);
  };

  const isPlusButtonPressed = useSelector(
    (state: { malMedaxil: { isPlusButtonPressed: boolean } }) => state.malMedaxil.isPlusButtonPressed
  );

  const handlePlusButtonPress = () => {
    // Dispatch the action to indicate that the "+" button was pressed
    dispatch(setPlusButtonPressed(true));
    navigation.navigate('Inventar');
  };
  
    const [jsonCreated, setJsonCreated] = useState(false);

    const isPressed = useSelector((state: RootState) => state.settings.pressed); // Get authentication state from Redux
    const selectedValue = useSelector((state: RootState) => state.selectedItem.selectedValue);
    const [cardData, setCardData] = useState<CardData[]>([]);
    const dispatch = useDispatch();
    const isOkPressed = useSelector((state: RootState) => state.inventar.isOkPressed);
    const [refresh, setRefresh] = useState(false); // Add a state variable for refresh

// Whenever you want to update the selected person's data
const handleSelectPerson = (name: string, id: string) => {
    dispatch(setSelectedPerson({ name, id }));
};
const generateRandomId = () => {
    return Math.random().toString(36).substring(7);
  };
  

  useEffect(() => {
    // Check if the JSON file exists
    const filePath = `${RNFS.DocumentDirectoryPath}/qaimeler.json`;
    RNFS.exists(filePath)
      .then((exists) => {
        if (!exists) {
          console.warn('JSON file does not exist:', filePath);
  
          // If the JSON file doesn't exist, create it with an empty object
          const jsonData = {};
          const jsonString = JSON.stringify(jsonData);
          RNFS.writeFile(filePath, jsonString, 'utf8')
            .then(() => {
              console.log('JSON file created and saved successfully:', filePath);
              setJsonCreated(true);
            })
            .catch((error) => {
              console.error('Error creating JSON file:', error);
            });
        } else {
          console.log('JSON file exists:', filePath);
          setJsonCreated(true);
        }
      })
      .catch((error) => {
        console.error('Error checking JSON file:', error);
      });
  
    // Set the component as mounted when it's first mounted
    setMounted(true);
  }, [selectedValue,isScreenFocused]); // This will run only once when the component mounts
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Set the component as mounted when it's first mounted
    setMounted(true);
    console.log('ok pressed')
  }, [selectedValue,isOkPressed,isScreenFocused]);
  
  useEffect(() => {
    // Load data from the JSON file based on the selected tab
    const loadData = async () => {
      try {
        const filePath = `${RNFS.DocumentDirectoryPath}/qaimeler.json`;
        const fileContent = await RNFS.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);
  
        // Ensure selectedValue is defined
        if (!selectedValue) {
          console.error('Error: selectedValue is not defined.');
          return;
        }
  
        // Initialize the data for the selected tab if it doesn't exist
        if (!jsonData[selectedValue]) {
          jsonData[selectedValue] = [];
        }
  
        const tabData = [];
  
        // Check if jsonData[selectedValue] is an array
        if (Array.isArray(jsonData[selectedValue])) {
          tabData.push(
            ...jsonData[selectedValue].map((docObject: DocData) => {
              const key = generateRandomId();
              return {
                key: key,
                PersonName: docObject.IDPerson,
                PersonId: docObject.IDPerson,
                DocSum: docObject.DocSum,
                StockId: docObject.IDAnbar,
              };
            })
          );
        } else {
          // Handle the case when jsonData[selectedValue] is an object
          const docKeys = Object.keys(jsonData[selectedValue]);
          if (docKeys.length > 0) {
            docKeys.forEach((key) => {
              const docObject = jsonData[selectedValue][key];
              const subData = Object.values<DocData>(docObject);
              tabData.push(
                ...subData.map((doc: DocData) => {
                  const subKey = generateRandomId();
                  return {
                    key: subKey,
                    PersonName: doc.IDPerson,
                    PersonId: doc.IDPerson,
                    DocSum: doc.DocSum,
                    StockId: doc.IDAnbar,
                  };
                })
              );
            });
          }
        }
  
        // Set cardData using the accumulated tabData
        setCardData(tabData);
        console.log('adddddddddddddddddd')
      } catch (error) {
        console.error('Error reading JSON file:', error);
      }
    };
  
    // Load data when the component is mounted, selectedValue changes, or isOkPressed is true
    if ( isOkPressed) {
      loadData();
    }else{
      loadData()
    }
   
  }, [selectedValue,isOkPressed]);
  
  
  
  
  
  
  
  const loadData = async () => {
    try {
      const filePath = `${RNFS.DocumentDirectoryPath}/qaimeler.json`;
      const fileContent = await RNFS.readFile(filePath, 'utf8');
      const jsonData = JSON.parse(fileContent);

      // Ensure selectedValue is defined
      if (!selectedValue) {
        console.error('Error: selectedValue is not defined.');
        return;
      }

      // Initialize the data for the selected tab if it doesn't exist
      if (!jsonData[selectedValue]) {
        jsonData[selectedValue] = [];
      }

      const tabData = [];

      // Check if jsonData[selectedValue] is an array
      if (Array.isArray(jsonData[selectedValue])) {
        tabData.push(
          ...jsonData[selectedValue].map((docObject: DocData) => {
            const key = generateRandomId();
            return {
              key: key,
              PersonName: docObject.IDPerson,
              PersonId: docObject.IDPerson,
              DocSum: docObject.DocSum,
              StockId: docObject.IDAnbar,
            };
          })
        );
      } else {
        // Handle the case when jsonData[selectedValue] is an object
        const docKeys = Object.keys(jsonData[selectedValue]);
        if (docKeys.length > 0) {
          docKeys.forEach((key) => {
            const docObject = jsonData[selectedValue][key];
            const subData = Object.values<DocData>(docObject);
            tabData.push(
              ...subData.map((doc: DocData) => {
                const subKey = generateRandomId();
                return {
                  key: subKey,
                  PersonName: doc.IDPerson,
                  PersonId: doc.IDPerson,
                  DocSum: doc.DocSum,
                  StockId: doc.IDAnbar,
                };
              })
            );
          });
        }
      }

      // Set cardData using the accumulated tabData
      setCardData(tabData);
    } catch (error) {
      console.error('Error reading JSON file:', error);
    }
  };
  

  
  useEffect(() => {
    const loadData = async () => {
      try {
        const filePath = `${RNFS.DocumentDirectoryPath}/qaimeler.json`;
        const fileContent = await RNFS.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);
  
        // Ensure selectedValue is defined
        if (!selectedValue) {
          console.error('Error: selectedValue is not defined.');
          return;
        }
  
        // Initialize the data for the selected tab if it doesn't exist
        if (!jsonData[selectedValue]) {
          jsonData[selectedValue] = [];
        }
  
        const tabData = [];
  
        // Check if jsonData[selectedValue] is an array
        if (Array.isArray(jsonData[selectedValue])) {
          tabData.push(
            ...jsonData[selectedValue].map((docObject: DocData) => {
              const key = generateRandomId();
              return {
                key: key,
                PersonName: docObject.IDPerson,
                PersonId: docObject.IDPerson,
                DocSum: docObject.DocSum,
                StockId: docObject.IDAnbar,
              };
            })
          );
        } else {
          // Handle the case when jsonData[selectedValue] is an object
          const docKeys = Object.keys(jsonData[selectedValue]);
          if (docKeys.length > 0) {
            docKeys.forEach((key) => {
              const docObject = jsonData[selectedValue][key];
              const subData = Object.values<DocData>(docObject);
              tabData.push(
                ...subData.map((doc: DocData) => {
                  const subKey = generateRandomId();
                  return {
                    key: subKey,
                    PersonName: doc.IDPerson,
                    PersonId: doc.IDPerson,
                    DocSum: doc.DocSum,
                    StockId: doc.IDAnbar,
                  };
                })
              );
            });
          }
        }
  
        // Set cardData using the accumulated tabData
        setCardData(tabData);
        console.log('Data loaded successfully');
      } catch (error) {
        console.error('Error reading JSON file:', error);
      }
    };
  
    // Load data when the component is mounted and when the screen is focused
    if (isScreenFocused) {
      loadData();
    }
  }, [selectedValue, isScreenFocused, isOkPressed]);
  

  // ...

  useFocusEffect(
    React.useCallback(() => {
      if (isScreenFocused) {
        console.log('Screen is focused');
        setFocusState(true);

        if (componentRef.current) {
          componentRef.current.scrollToOffset({ animated: false, offset: 0 });
        }

        // Load data when the screen is focused
        loadData();
      } else {
        console.log('Screen is not focused');
        setFocusState(false);
      }
    }, [isScreenFocused,isOkPressed])
  );

    const showAlert = () => {
        Alert.alert(
            'JSON Successfully Created',
            'The JSON file with the specified structure has been created and saved.',
            [{ text: 'OK' }]
        );
    };
  
    return (
        <View style={styles.appContainer}>
            
            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{backgroundColor:'#1F1D2B',width:40,height:44,alignSelf:'center',borderWidth:1,borderColor:'white',alignContent:'center',alignItems:'center',justifyContent:'center',borderRadius:7}}>
                <Image source={require('../assets&styles/back.png')} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
                <TextInput style={styles.searchInput} placeholder="Search..." placeholderTextColor="#F4F9FD"/>
                <TouchableOpacity style={{backgroundColor:'#1F1D2B',width:40,height:44,alignSelf:'center',borderWidth:1,borderColor:'white',alignContent:'center',alignItems:'center',justifyContent:'center',borderRadius:7}}>
                <Image source={require('../assets&styles/filter.png')} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal:20}}>
            {isOkPressed &&  cardData.length > 0 ? ( // Conditionally render based on cardData length
        <FlatList
        ref={(ref) => (componentRef.current = ref)}
          data={cardData}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCardPress(item)}>
              {/* Your card rendering code here */}
              <View style={[styles.card]}>
                <View style={{ flex: 1 }}>
                  <View style={styles.halfContainer}>
                    <View style={styles.leftHalf}>
                      <View style={styles.topHalf}>
                        <Text style={styles.topHalfText2}>{item.StockId}</Text>
                        <Text style={{ fontSize: 12, color: 'white' }}>{item.PersonId}</Text>
                      </View>
                      <View style={styles.horizontalDivider} />
                      <View style={styles.bottomHalf}>
                        <Text style={{ fontSize: 16, color: 'white' }}>{item.DocSum} AZN</Text>
                      </View>
                    </View>
                    <View style={styles.verticalDivider} />
                    <View style={styles.rightHalf}>
                      <View style={styles.topHalf}>
                        <Text style={styles.topHalfText1}>{item.PersonId}</Text>
                      </View>
                      <View style={styles.horizontalDivider} />
                      <View style={styles.bottomHalf}>
                        <Text style={styles.bottomHalfText}>{item.PersonName}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        // Render a message or an empty view when cardData is empty
        <View>
          <Text >No data available.</Text>
        </View>
      )}
      <Modal visible={showCardModal} transparent animationType="slide">
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text style={styles.modalTitle}>Options for the selected item:</Text>
      <TouchableOpacity style={styles.optionButton} onPress={handleConfirmDelete}>
        <Text style={styles.optionButtonText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={handleEdit}>
        <Text style={styles.optionButtonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </View>
    <TouchableOpacity onPress={() => handlePlusButtonPress()} style={styles.floatingButton}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>+</Text>
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
    appContainer: {
        flex: 1,
        backgroundColor:'#1F1D2B',
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        color: '#F4F9FD',
        borderBottomColor: '#F4F9FD',
        borderBottomWidth: 1,marginBottom:10
    },
    container: {
        flex: 1,
        paddingHorizontal:20,
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
        marginBottom:20
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
    floatingButton: {
        backgroundColor: 'green',
        position: 'absolute',
        right: 30,
        bottom: 30,
        borderRadius: 50/2,
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
});

export default App;
