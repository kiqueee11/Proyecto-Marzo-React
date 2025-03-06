import React, { useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PropsStackNavigation } from "../interfaces/StackNav";
import { LoginViewModel } from "../viewModel/LoginViewModel";
import { FormInputInline } from "../components/FormInputInLine";
import { RoundedButton } from "../components/RoundedButton";

export function LoginScreen({ navigation }: PropsStackNavigation) {
    const { email, clave, onChangeLogin, login, errorMessage, isLoading } = LoginViewModel();

    useEffect(() => {
        // Limpia errores cuando el usuario empieza a escribir
        if (errorMessage) {
            onChangeLogin("errorMessage", "");
        }
    }, [email, clave]);

    return (
        <LinearGradient
            colors={["#E35D66", "#A479AF"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.container}
        >
            <Image source={require("../../assets/flashmeet_logo.png")} style={styles.logoSplash} />

            <View style={styles.inputContainer}>
                <FormInputInline
                    placeholder={"Correo electrónico"}
                    keyboardType="email-address"
                    secureTextEntry={false}
                    onPressFormInterface={(text) => onChangeLogin("email", text)}
                />
                <FormInputInline
                    placeholder={"Contraseña"}
                    keyboardType="default"
                    secureTextEntry={true}
                    onPressFormInterface={(text) => onChangeLogin("clave", text)}
                />
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            </View>

            <View style={styles.buttonContainer}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#fff" />
            ) : (
                <RoundedButton 
                    text={"Iniciar Sesión"} 
                    onPressFromInterface={() => {
                        login().then((isLoggedIn) => {
                            if (isLoggedIn) {
                                console.log("Usuario logueado correctamente, redirigiendo a la pantalla principal.");
                                navigation.navigate("Main");
                            } else {
                                console.log("Fallo en el login. Verifica las credenciales.");
                            }
                        });
                    }} 
                />
            )}
        </View>


            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    buttonContainer: {       
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
        marginBottom: 10,
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
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    linkContainer: {
        marginTop: 15,
    },
    link: {
        color: "#fff",
        fontSize: 16,
        textDecorationLine: "underline",
    },
});

export default LoginScreen;
