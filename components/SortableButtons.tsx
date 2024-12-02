import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'

type props = {
    currentSort: "newest" | "oldest";
    onSortChange: (order: "newest" | "oldest") => void;
};

const SortableButtons = ({ currentSort = "newest", onSortChange }: props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{ opacity: currentSort === "newest" ? 1 : 0.5 }}
                onPress={() => onSortChange("newest")}
            >
                <CustomText>Newest</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ opacity: currentSort === "oldest" ? 1 : 0.5 }}
                onPress={() => onSortChange("oldest")}
            >
                <CustomText>Oldest</CustomText>
            </TouchableOpacity>
        </View>
    )
}

export default SortableButtons

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 20,
        marginRight: 20,
        paddingTop: 10,
    }
})