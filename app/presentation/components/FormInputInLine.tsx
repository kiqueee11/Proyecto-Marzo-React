import React from "react";
import {Image, KeyboardType, StyleSheet, TextInput, View} from "react-native";

interface Props {
    placeholder: string,
    value?: string,
    keyboardType: KeyboardType,
    secureTextEntry: boolean,
    onPressFormInterface: (text: string) => void,
}


export const FormInputInline = (
    {placeholder, keyboardType, secureTextEntry, onPressFormInterface}: Props
) => {
    return (
        <View style={styles.formInputContainer}>
            <TextInput style={styles.formInput}
                       placeholder={placeholder}
                       keyboardType={keyboardType}
                       secureTextEntry={secureTextEntry}
                       onChangeText={(text) => onPressFormInterface(text)} // onPressFormInterface aquí equivale al setter function
            ></TextInput>
        </View>
    );
}

const styles = StyleSheet.create({
    formInputContainer: {
        width: "100%",
        marginBottom: 2,
    },
    formInput: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 10, // Aumenté un poco la separación entre inputs
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
})
