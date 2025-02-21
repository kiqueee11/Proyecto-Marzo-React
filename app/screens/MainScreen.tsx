import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/Style";
import { NavigationProps } from "../../types";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"; // Importar iconos

export const MainScreen: React.FC<NavigationProps> = ({ navigation }) => {
    return (
        <LinearGradient
            colors={["#E35D66", "#A479AF"]} // Rosado a morado
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.container}
        >
            {/* Logo */}
            <Image
                source={require("../assets/flashmeet_logo.png")}
                style={styles.logo}
            />

            {/* Botón de perfil */}
            <TouchableOpacity
                style={styles.profileButton}
                onPress={() => navigation.navigate("EditProfile")}
            >
                <Image
                    style={styles.profileImage}
                    source={require("../assets/perfil.png")}
                />
            </TouchableOpacity>

            {/* Contenedor de botones */}
            <View style={styles.buttonContainer}>
                {/* Botón de Ajustes */}
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => navigation.navigate("Settings")}
                >
                    <Ionicons name="settings-outline" size={90} color="white" />
                </TouchableOpacity>

                {/* Botón de Amigos */}
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => navigation.navigate("Friends")}
                >
                    <Ionicons name="people-outline" size={90} color="white" />
                </TouchableOpacity>
            </View>

            {/* Botón Meet */}
            <TouchableOpacity style={styles.meetButton}>
                <Text style={styles.meetButtonText}>MEET</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};
