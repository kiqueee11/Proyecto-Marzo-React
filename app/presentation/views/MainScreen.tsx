import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/Style";
import { PropsStackNavigation } from "../interfaces/StackNav";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export function MainScreen({ navigation }: PropsStackNavigation) {
    return (
        <LinearGradient
            colors={["#E35D66", "#A479AF"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.container}
        >
            {/* Logo de la aplicación */}
            <Image source={require("../../assets/flashmeet_logo.png")} style={styles.logo} />

            {/* Botón de perfil */}
            <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("EditProfile")}>
                <Image style={styles.profileImage} source={require("../../assets/perfil.png")} />
            </TouchableOpacity>

            {/* Contenedor de botones de navegación */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Settings")}>
                    <Ionicons name="settings-outline" size={90} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Friends")}>
                    <Ionicons name="people-outline" size={90} color="white" />
                </TouchableOpacity>
            </View>

            {/* Botón MEET */}
            <TouchableOpacity style={styles.meetButton} onPress={() => navigation.navigate("Chat")}>
                <Text style={styles.meetButtonText}>MEET</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

