import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { RitualData } from '../types/ritual';
import { images } from '../source/image';
import { useTheme } from '../context/ThemeContext';
import Entypo from '@expo/vector-icons/Entypo';
import CustomText from './CustomText';
import FlexRowTexts from './FlexRowTexts';


type Props = {
    item: RitualData;

};

const SearchResultCard = ({ item }: Props) => {

    const { theme } = useTheme()

    const defaultImage = require("../assets/default.png");

    return (
        <View style={styles.cardLayout}>
            {item.imageUrl && item.id > 10 ? (
                <Image source={{ uri: item.imageUrl }} style={[styles.ritualImage, { backgroundColor: theme.DEFAULT_IMG_BG }]} />
            ) : (
                <Image
                    source={item.imageUrl ? images[item.imageUrl] : defaultImage}
                    defaultSource={defaultImage}
                    style={[styles.ritualImage, { backgroundColor: theme.DEFAULT_IMG_BG }]}
                />
            )}

            <View style={styles.ritualInfo}>
                <CustomText>{item.title}</CustomText>
                <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.content, { color: theme.TEXT }]}>
                    {item.content}
                </Text>
                <FlexRowTexts
                    first={<CustomText>{item.date}</CustomText>}
                    second={<Entypo
                        name="heart"
                        size={12}
                        color={item.like ? "#f15b5b" : theme.BACKGROUND}
                    />}
                    gap={5}

                />
            </View>
        </View>
    )
}

export default SearchResultCard

const styles = StyleSheet.create({
    cardLayout: {
        flexDirection: "row",
        gap: 10
    },

    ritualImage: {
        width: 70,
        height: 70,
        aspectRatio: 1, // 정사각형 타입
        marginBottom: 5,
    },
    ritualInfo: {
        flexDirection: "column",
        justifyContent: "center",

    },
    content: {
        maxWidth: "84%",
    },

});
