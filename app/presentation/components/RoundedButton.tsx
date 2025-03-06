import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

interface Props {
    text: string,
    onPressFromInterface: () => void,
}

export const RoundedButton = ({text, onPressFromInterface}: Props) => {
    return (
        <TouchableOpacity
            style={styles.buttonForm}
            onPress={() => onPressFromInterface()}
        >
            <Text style={styles.buttonFormText}>{text}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    buttonForm: {
        backgroundColor: "black",
        paddingVertical: 9,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonFormText: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 17,
    },
})
