import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PropsStackNavigation } from "../interfaces/StackNav";
import { RegisterViewModel } from "../viewModel/RegisterViewModel";

export function RegisterScreen({ navigation }: PropsStackNavigation) {
    const {
        userName,
        email,
        password,
        repeatPassword,
        errorMessage,
        onChangeRegister,
        register,
    } = RegisterViewModel();

    return (
        <LinearGradient
            colors={["#E35D66", "#A479AF"]} 
            start={{ x: 0, y: 0.5 }} 
            end={{ x: 1, y: 0.5 }} 
            style={styles.container}
        >
            <Image
                source={require("../../assets/flashmeet_logo.png")}
                style={styles.logoSplash}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Usuario"
                    value={userName}
                    onChangeText={(text) => onChangeRegister("userName", text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => onChangeRegister("email", text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => onChangeRegister("password", text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Repetir contraseña"
                    secureTextEntry
                    value={repeatPassword}
                    onChangeText={(text) => onChangeRegister("repeatPassword", text)}
                />
            </View>
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            <TouchableOpacity
                style={styles.button}
                onPress={register}
            >
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>
                    ¿Ya tienes cuenta? Inicia sesión
                </Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}



export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    logoSplash: {
        width: 300,
        height: 300,
        resizeMode: "contain",
        marginBottom: 20,
    },
    inputContainer: {
        width: "100%",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 12, // Aumenté un poco la separación entre inputs
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    errorText: {
        color: "white",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 10,
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
        marginBottom: 10, // Pequeño margen antes del link de inicio de sesión
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    link: {
        color: "#fff",
        fontSize: 16,
        textDecorationLine: "underline",
    },
});