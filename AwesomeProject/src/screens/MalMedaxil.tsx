import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { SvgUri } from 'react-native-svg';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    interpolate,
    Extrapolate,
    runOnJS
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent, ScrollView } from 'react-native-gesture-handler';

type CardProps = {
    id: number;
    onDelete: (id: number) => void;
};

const MalMedaxil: React.FC<CardProps> = ({ id, onDelete }) => {
    const translateX = useSharedValue(0);
    const isDeleteVisible = useSharedValue(0);

    const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: (event) => {
            translateX.value = event.translationX;
        },
        onEnd: () => {
            if (translateX.value < -54) {
                translateX.value = withSpring(-54, { damping: 10, stiffness: 100, mass: 1, overshootClamping: true });
                isDeleteVisible.value = 1;
            } else {
                translateX.value = withSpring(0, { damping: 10, stiffness: 100, mass: 1, overshootClamping: false });
                isDeleteVisible.value = 0;
            }
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const deleteStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                translateX.value,
                [-54, 0],
                [1, 0],
                Extrapolate.CLAMP
            ),
        };
    });

    const handleDelete = () => {
        runOnJS(onDelete)(id);
    };

    const handleCardPress = () => {
        // When the card is pressed, animate the translation to reveal the delete button
        translateX.value = withSpring(-54, { damping: 10, stiffness: 100, mass: 1, overshootClamping: true });
        isDeleteVisible.value = 1;
    };

    return (
        <ScrollView>
            <View style={styles.container}>
            <Animated.View style={[styles.deleteContainer, deleteStyle]}>
                <TouchableOpacity onPress={handleDelete}>
                    <Image source={require('../assets&styles/trash.png')} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
            </Animated.View>
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View style={[styles.card, animatedStyle]}>
                    <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={handleCardPress}>
                        <View style={styles.topHalf}>
                            <Text>Top Half</Text>
                        </View>
                        <View style={styles.bottomHalf}>
                            <View style={styles.bottomLeft}><Text>Bottom Left</Text></View>
                            <View style={styles.bottomRight}><Text>Bottom Right</Text></View>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </PanGestureHandler>
        </View>
        </ScrollView>
    );
}

const App = () => {
    const [cards, setCards] = useState([
        { id: 1 },
        { id: 2 },
        { id: 3 },
    ]);

    const handleDelete = useCallback((id) => {
        setCards(cards.filter((card) => card.id !== id));
    }, [cards]);

    return (
        <View style={styles.appContainer}>
            {cards.map((card) => (
                <MalMedaxil key={card.id} id={card.id} onDelete={handleDelete} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#1F1D2B'
    },
    container: {
        width: 321,
        height: 96,
        overflow: 'hidden',
        marginBottom: 10,
        borderWidth:1,
        borderColor:'white',
        borderRadius:8
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
        height: '100%',
        flexDirection: 'column',

    },
    topHalf: {
        flex: 1,
        borderColor:'white',
        borderBottomWidth:1
    },
    bottomHalf: {
        flex: 1,
        flexDirection: 'row',
    },
    bottomLeft: {
        flex: 1,
        borderColor:'white',
        borderRightWidth:1
    },
    bottomRight: {
        flex: 1,
        borderColor:'white'
    },
});

export default App;
