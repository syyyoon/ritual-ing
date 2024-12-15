import { ActivityIndicator, View, StyleSheet } from 'react-native'
import React from 'react'
import Layout from './Layout'
import Colors from '../constants/colors'

const LoadingIcon = () => {
    return (
        <Layout>
            <View style={styles.indicatorWrapper}>
                <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
            </View>
        </Layout>
    )
}

export default LoadingIcon


const styles = StyleSheet.create({
    indicatorWrapper: {
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        margin: "30%"
    },

});