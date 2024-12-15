
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Modal,
    TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/colors";
import { useTheme } from "../context/ThemeContext";

type OptionItem = {
    value: string;
    label: string;
};

interface DropDownProps {
    data: OptionItem[];
    onChange: (item: OptionItem) => void;
    placeholder: string;
}

const Dropdown = ({
    data,
    onChange,
    placeholder,
}: DropDownProps) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

    const [value, setValue] = useState<string>("");

    const { theme } = useTheme()

    const buttonRef = useRef<View>(null);


    const onSelect = useCallback((item: OptionItem) => {
        onChange(item);
        setValue(item.label);
        setExpanded(false);
    }, []);

    return (
        <View
            ref={buttonRef}
        >
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={toggleExpanded}
            >

                <Text style={[styles.text, { color: theme.TEXT }]}>{value || placeholder}</Text>
                <AntDesign color={theme.TEXT} name={expanded ? "caretup" : "caretdown"} />
            </TouchableOpacity>
            {expanded ? (
                <Modal visible={expanded} animationType="slide" transparent>
                    <TouchableWithoutFeedback onPress={() => setExpanded(false)} style={{ flexDirection: "column" }}>
                        <View
                            style={[
                                styles.options,
                                // {
                                //     top,
                                // },
                            ]}
                        >
                            <FlatList
                                keyExtractor={(item) => item.value}
                                data={data}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.optionItem}
                                        onPress={() => onSelect(item)}
                                    >
                                        <Text style={styles.itemText}>{item.label}</Text>
                                    </TouchableOpacity>
                                )}
                                ItemSeparatorComponent={() => (
                                    <View style={styles.separator} />
                                )}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            ) : null}
        </View>
    );
}

export default Dropdown;

const styles = StyleSheet.create({
    // backdrop: {
    //     padding: 20,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     flex: 1,
    // },
    optionItem: {
        height: 40,
        justifyContent: "center",
        backgroundColor: "white",
    },
    separator: {
        height: 4,
    },
    options: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderColor: Colors.PRIMARY,
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 10,
        maxHeight: 280,
    },
    itemText: {
        fontSize: 18,
        textAlign: "center",
    },
    text: {
        fontSize: 15,


    },
    button: {
        marginTop: 10,
        width: "80%",
        height: 40,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.PRIMARY
    },
});
