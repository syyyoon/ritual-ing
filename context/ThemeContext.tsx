
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Appearance } from 'react-native';
import { lightTheme, darkTheme, ThemeType } from '../theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface ThemeContextProps {
    theme: ThemeType;
    isDarkMode: boolean;
    toggleTheme: () => void;
    setTheme: (isDarkMode: boolean) => void;
}


const ThemeContext = createContext<ThemeContextProps>({
    theme: lightTheme,
    isDarkMode: false,
    toggleTheme: () => { },
    setTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);


export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const systemColorScheme = Appearance.getColorScheme();
    const [isDarkMode, setIsDarkMode] = useState<boolean>(systemColorScheme === 'dark');

    useEffect(() => {
        const loadTheme = async () => {
            const storedTheme = await AsyncStorage.getItem('theme');
            if (storedTheme !== null) {
                setIsDarkMode(storedTheme === 'dark');
            } else {
                setIsDarkMode(systemColorScheme === 'dark');
            }
        };
        loadTheme();
    }, [systemColorScheme]);

    const toggleTheme = async () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    const setTheme = async (isDarkMode: boolean) => {
        setIsDarkMode(isDarkMode);
        await AsyncStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    };

    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};