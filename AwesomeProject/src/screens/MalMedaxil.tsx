import React, { useState, useEffect, } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Image, TextInput, Modal, Button, Alert } from 'react-native';
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


type Card = {
    id: number;
    translateX: Animated.SharedValue<number>;
};

const App: React.FC = ({navigation}:any) => {
    const [cards, setCards] = useState<Card[]>([
        { id: 1, translateX: useSharedValue(0) }
    ]);
    const [jsonCreated, setJsonCreated] = useState(false);

    const selectedItem = useSelector((state: RootState) => state.selectedItem.selectedItem);
    const isPressed = useSelector((state: RootState) => state.settings.pressed); // Get authentication state from Redux

    const dispatch = useDispatch();

// Whenever you want to update the selected person's data
const handleSelectPerson = (name: string, id: string) => {
    dispatch(setSelectedPerson({ name, id }));
};

    useEffect(() => {
        const filePath = `${RNFS.DocumentDirectoryPath}/qaimeler.json`;
    
        RNFS.exists(filePath)
            .then(exists => {
                if (exists) {
                    console.log('JSON file already exists:', filePath);
                    setJsonCreated(true);
                    RNFS.readFile(filePath, 'utf8')
                    .then(content => {
                        console.log('JSON file content:', content);
                        // Here you can parse and use the content as needed
                    })
                    .catch(error => {
                        console.error('Error reading JSON file content:', error);
                    });
                } else {
                    // Your JSON data structure
                    const jsonData = {
                        "Mal_Mədaxil":
                        [
                        {"doc1":{"mdate":"01.01.0001","IDPerson":"KM000001","IDAnbar" :"MS000001","DocSum"  :50.00,"Mallar"  :[{"IDmal":"KM0000001","Say":10,"Qiymet":2.50,"Cemi":25.00}]}},
                        {"doc2":{"mdate":"01.01.0001","IDPerson":"KM000002","IDAnbar" :"MS000001","DocSum"  :100.00,"Mallar"  :[{"IDmal":"KM0000002","Say":20,"Qiymet":2.50,"Cemi":25.00}]}}
                        
                        ],
                        "Mal_Məxaric":
                        [
                        {"doc1":{"mdate":"01.01.0001","IDPerson":"KM000001","IDAnbar" :"MS000001","DocSum"  :50.00,"Mallar"  :[{"IDmal":"KM0000001","Say":10,"Qiymet":2.50,"Cemi":25.00}]}},
                        {"doc2":{"mdate":"01.01.0001","IDPerson":"KM000002","IDAnbar" :"MS000001","DocSum"  :100.00,"Mallar"  :[{"IDmal":"KM0000002","Say":20,"Qiymet":2.50,"Cemi":25.00}]}}
                        ],
                        "Satis":
                        [
                        {"doc1":{"mdate":"01.01.0001","IDPerson":"KM000001","IDAnbar" :"MS000001","DocSum"  :50.00,"Mallar"  :[{"IDmal":"KM0000001","Say":10,"Qiymet":2.50,"Cemi":25.00}]}},
                        {"doc2":{"mdate":"01.01.0001","IDPerson":"KM000002","IDAnbar" :"MS000001","DocSum"  :100.00,"Mallar"  :[{"IDmal":"KM0000002","Say":20,"Qiymet":2.50,"Cemi":25.00}]}}
                        ],
                        "İnvertar":
                        [
                        {"doc1":{"mdate":"01.01.0001","IDAnbar":"MS000001","DocSum":50.00,"Mallar":[{"IDmal":"KM0000001","Say":10,"Qiymet":2.50,"Cemi":25.00}]}},
                        {"doc2":{"mdate":"01.01.0001","IDAnbar":"MS000001","DocSum":50.00,"Mallar":[{"IDmal":"KM0000001","Say":10,"Qiymet":2.50,"Cemi":25.00}]}}
                        ],
                        "Yerdəyişmə":
                        [
                        {"doc1":{"mdate":"01.01.0001","IDAnbarOUT":"MS000001","IDAnbarIn":"MS000002","DocSum":50.00,"Mallar":[{"IDmal":"KM0000001","Say":10,"Qiymet":2.50,"Cemi":25.00}]}},
                        {"doc2":{"mdate":"01.01.0001","IDAnbar":"MS000001","DocSum":50.00,"Mallar":[{"IDmal":"KM0000001","Say":10,"Qiymet":2.50,"Cemi":25.00}]}}
                        ],
                        "mDest":
                        [
                        {"doc1":{"IDest":"2400000000001","DocSum":50.00,"Mallar":[{"IDmal":"KM0000001","Say":10,"Qiymet":2.50,"Cemi":25.00}]}},
                        {"doc2":{"IDest":"2400000000002","DocSum":50.00,"Mallar":[{"IDmal":"KM0000001","Say":10,"Qiymet":2.50,"Cemi":25.00}]}}
                        ]
                        }
    
                    // Convert JSON data to a string
                    const jsonString = JSON.stringify(jsonData);
    
                    // Create and save the JSON file using RNFS
                    RNFS.writeFile(filePath, jsonString, 'utf8')
                        .then(() => {
                            console.log('JSON file created and saved successfully:', filePath);
                            setJsonCreated(true);
                        })
                        .catch((error) => {
                            console.error('Error creating JSON file:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error checking JSON file:', error);
            });
    }, [isPressed]);

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
            <ScrollView style={styles.container}>
            {cards.map(item => (
                    <TouchableOpacity key={item.PersonId}>
                        <View style={[styles.card]}>
                            <View style={{ flex: 1 }}>
                                <View style={styles.halfContainer}>
                                    <View style={styles.leftHalf}>
                                        <View style={styles.topHalf}>
                                            <Text style={styles.topHalfText2}>{item.PersonName}</Text>
                                            <Text style={{fontSize:12,color:'white'}}>{item.PersonName}</Text>
                                        </View>
                                        <View style={styles.horizontalDivider} />
                                        <View style={styles.bottomHalf}>
                                            <Text style={{fontSize:16,color:'white'}}>{item.StockName}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.verticalDivider} />
                                    <View style={styles.rightHalf}>
                                        <View style={styles.topHalf}>
                                            <Text style={styles.topHalfText1}>{item.StockName}</Text>
                                        </View>
                                        <View style={styles.horizontalDivider} />
                                        <View style={styles.bottomHalf}>
                                            <Text style={styles.bottomHalfText}>{item.PersonName} AZN</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity onPress={() =>
      navigation.navigate('Inventar')
      } style={styles.floatingButton} >
                <Text style={{fontSize:30,fontWeight:'bold'}}>+</Text>
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
