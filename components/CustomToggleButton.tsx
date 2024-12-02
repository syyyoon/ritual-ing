import { StyleSheet, Switch, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText';
import Colors from '../constants/colors';
import { useTheme } from '../context/ThemeContext';


type ToggleButtonProps = {
    isActive: boolean;
    text: string
    onChange: (value: boolean) => void;
}
const CustomToggleButton = ({ isActive, text, onChange }: ToggleButtonProps) => {

    const { theme } = useTheme();
    return (
        <View style={styles.container}>
            <CustomText style={[styles.text, { color: theme.TEXT }]}>{text}</CustomText>
            <Switch
                style={styles.switch}
                value={isActive}
                onValueChange={onChange}
                thumbColor={"#ffff"}
                ios_backgroundColor={"#D7D7D9"}
                trackColor={{ false: theme.TEXT, true: Colors.PRIMARY }}
            />

        </View>
    )
}

export default CustomToggleButton


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
    },
    text: {
        width: 80,
    },
    switch: {
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    },
});