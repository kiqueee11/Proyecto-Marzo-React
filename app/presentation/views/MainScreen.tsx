import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { PropsStackNavigation } from "../interfaces/StackNav";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../context/UserContextType"; // Asegúrate de importar useUser

export function MainScreen({ navigation }: PropsStackNavigation) {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const { user, loading, error } = useUser(); // Accediendo a los datos del usuario

    useEffect(() => {
        const loadProfileImage = async () => {
            const savedImage = await AsyncStorage.getItem("profileImage");
            if (savedImage) {
                setProfileImage(savedImage);
            }
        };

        loadProfileImage();

        // Imprimir los datos del usuario si ya están disponibles
        if (user) {
            console.log("Datos del usuario cargados:", user);
        } else if (error) {
            console.log("Error al cargar los datos del usuario:", error);
        }
    }, [user, error]); // Se ejecuta cuando user o error cambian

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
            </View>
        );
    }

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
                {profileImage ? (
                    <Image style={styles.profileImage} source={{ uri: profileImage }} />
                ) : (
                    <Image style={styles.profileImage} source={require("../../assets/perfil.png")} />
                )}
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

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: "contain",
    },
    profileButton: {
        alignItems: "center",
        marginBottom: 30,
    },
    profileImage: {
        width: 220,
        height: 220,
        borderRadius: 100,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginVertical: 20,
    },
    iconButton: {
        alignItems: "center",
    },
    meetButton: {
        backgroundColor: "black",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    meetButtonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
});