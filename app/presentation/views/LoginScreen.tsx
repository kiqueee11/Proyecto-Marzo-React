import React, { useEffect } from "react";
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PropsStackNavigation } from "../interfaces/StackNav";
import { LoginViewModel } from "../viewModel/LoginViewModel";
import { FormInputInline } from "../components/FormInputInLine";
import { RoundedButton } from "../components/RoundedButton";
import { useUser } from "../context/UserContext"; // Importamos el contexto

export function LoginScreen({ navigation }: PropsStackNavigation) {
    const { email, clave, onChangeLogin, login, errorMessage, isLoading } = LoginViewModel();
    const { usuario } = useUser(); // Accedemos al usuario desde el contexto

    useEffect(() => {
        if (usuario) {
            console.log("Datos del usuario cargados, redirigiendo a Main...");
            navigation.navigate("Main");
        }
    }, [usuario]);

    return (
        <LinearGradient
            colors={["#E35D66", "#A479AF"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}
        >
            <Image source={require("../../assets/flashmeet_logo.png")} style={{ width: 300, height: 300, resizeMode: "contain", marginBottom: 20 }} />

            <View style={{ width: "100%", marginBottom: 20 }}>
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
                {errorMessage ? <Text style={{ color: "white", fontSize: 14, textAlign: "center", marginBottom: 10 }}>{errorMessage}</Text> : null}
            </View>

            <View style={{ width: "100%", height: 50, justifyContent: "center", alignItems: "center" }}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#fff" />
                ) : (
                    <RoundedButton 
                        text={"Iniciar Sesión"} 
                        onPressFromInterface={() => login()} 
                    />
                )}
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{ marginTop: 15 }}>
                <Text style={{ color: "#fff", fontSize: 16, textDecorationLine: "underline" }}>¿No tienes cuenta? Regístrate</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

export default LoginScreen;
