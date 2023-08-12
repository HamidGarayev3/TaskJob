import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Image, TextInput, Modal, Button } from 'react-native';
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

type Card = {
    id: number;
    translateX: Animated.SharedValue<number>;
};

const App: React.FC = ({navigation}:any) => {
    const [cards, setCards] = useState<Card[]>([
        { id: 1, translateX: useSharedValue(0) }
    ]);

  
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
            <TouchableOpacity onPress={() =>
      navigation.navigate('Inventar')
      } style={styles.floatingButton} >
                <Text style={{fontSize:30,fontWeight:'bold'}}>+</Text>
            </TouchableOpacity>
            
        </View>
    );
};



const styles = StyleSheet.create({
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
