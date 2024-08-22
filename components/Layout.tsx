
import React from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';


type LayoutViewProps = {
    children: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
}

const Layout: React.FC<LayoutViewProps> = ({ children, style }) => {
    const { theme } = useTheme();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.BACKGROUND }, style]}>
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Layout;
