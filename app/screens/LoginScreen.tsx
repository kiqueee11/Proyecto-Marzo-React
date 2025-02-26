import React from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { styles } from "../styles/Style";
import { NavigationProps } from "../../types";
import { LinearGradient } from "expo-linear-gradient";

export const LoginScreen: React.FC<NavigationProps> = ({ navigation }) => {
    return (
        <LinearGradient
            colors={["#E35D66", "#A479AF"]} 
            start={{ x: 0, y: 0.5 }} 
            end={{ x: 1, y: 0.5 }} 
            style={styles.container}
        >
            <Image
                source={require("../assets/flashmeet_logo.png")}
                style={styles.logoSplash}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Correo"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry
                />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Main")}
            >
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <View style={styles.linkContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={styles.link}>
                        ¿No tienes cuenta? Regístrate
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};
