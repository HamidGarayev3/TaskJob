import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

type Card = {
    id: number;
    translateX: Animated.SharedValue<number>;
};

const Inventar: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([
        { id: 1, translateX: useSharedValue(0) }
    ]);

  
    return (
        <View style={styles.appContainer}>
            <View style={styles.searchContainer}>
                <TouchableOpacity style={styles.iconButton}>
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
            <View style={styles.cardContainer}>
                <Text style={styles.textBold}>Azərsun MMC</Text>
                <TouchableOpacity>
                    <Image
                        source={require('../assets&styles/dots.png')}
                        style={styles.menuIcon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
                <Text style={styles.textBold}>Azərsun MMC</Text>
                <TouchableOpacity>
                    <Image
                        source={require('../assets&styles/dots.png')}
                        style={styles.menuIcon}
                    />
                </TouchableOpacity>
            </View>
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
                        <View key={card.id} style={styles.card}>
                            <Animated.View style={[styles.deleteContainer, deleteStyle]}>
                                <TouchableOpacity >
                                    <Image source={require('../assets&styles/trash.png')} style={{ width: 24, height: 24 }} />
                                </TouchableOpacity>
                            </Animated.View>
                            <PanGestureHandler onGestureEvent={gestureHandler}>
                                <Animated.View style={[styles.cardInner, animatedStyle]}>
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
            <TouchableOpacity style={styles.floatingButton} >
                <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor:'#1F1D2B',
        paddingHorizontal:20    },
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
        borderRadius:7
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
        height: 5
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
    container: {
        flex: 1,    },
    deleteContainer: {
        position: 'absolute',
        width: 54,
        height: '100%',
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
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
        marginTop: 20
    },
    cardInner: {
        flex: 1,
        borderColor:'white',
        borderWidth:1,
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
        flexDirection: 'row'
    },
    topHalfText1: {
        color: '#FFF',
        fontSize: 16,
        marginBottom: 5
    },
    topHalfText2: {
        color: '#FFF',
        fontSize: 14,
    },
    bottomLeft: {
        flex: 0.6,
        padding: 10
    },
    bottomRight: {
        flex: 0.4,
        backgroundColor:'#1F1D2B',
        justifyContent:'center',
        alignItems:'center'
    },
    bottomLeftText: {
        color: '#FFF',
        fontSize: 14
    },
    bottomRightText: {
        color: '#FFF',
        fontSize: 14
    },
    floatingButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        backgroundColor: '#FF6C00',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        right: 20,
        bottom: 20
    },
    plus: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold'
    }
});

export default Inventar;
