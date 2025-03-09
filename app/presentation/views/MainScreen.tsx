import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import { PropsStackNavigation } from "../interfaces/StackNav";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetDataRepository } from "../../domain/repositories/GetDataRepository";

export function MainScreen({ navigation }: PropsStackNavigation) {
    const [loading, setLoading] = useState(true);
    const [perfilImagenUrl, setPerfilImagenUrl] = useState<string | null>(null);
    const [usuario, setUsuario] = useState<any>(null);

    useEffect(() => {
        const cargarDatosUsuario = async () => {
            try {
                setLoading(true);
                const userId = await AsyncStorage.getItem('userId');
                if (!userId) {
                    console.error("No se encontró el ID de usuario");
                    return;
                }
                const userData = await GetDataRepository.obtenerDatosUsuario(userId);
                if (userData) {
                    setUsuario(userData);
                    if (userData.imagenesBase64 && userData.imagenesBase64.length > 0) {
                        setPerfilImagenUrl(userData.imagenesBase64[0]);
                    }
                }
            } catch (error) {
                console.error("Error al cargar los datos del usuario:", error);
            } finally {
                setLoading(false);
            }
        };
        cargarDatosUsuario();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#FFFFFF" />
                <Text style={styles.loadingText}>Cargando...</Text>
            </View>
        );
    }

    return (
        <LinearGradient colors={["#E35D66", "#A479AF"]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.container}>
            <Image source={require("../../assets/flashmeet_logo.png")} style={styles.logo} />
            <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("Profile")}> 
                <Image style={styles.profileImage} source={perfilImagenUrl ? { uri: perfilImagenUrl } : require("../../assets/perfil.png")} />
            </TouchableOpacity>
            {usuario && (
                <View style={styles.userInfoContainer}>
                    <Text style={styles.userName}>{usuario.userName}</Text>
                </View>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Settings")}>
                    <Ionicons name="settings-outline" size={90} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Friends")}>
                    <Ionicons name="people-outline" size={90} color="white" />
                </TouchableOpacity>
            </View>
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
    userInfoContainer: {
        marginBottom: 20,
        alignItems: "center",
    },
    userName: {
        fontSize: 24,
        color: "white",
        fontWeight: "bold",
    },
    userDescription: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
        marginHorizontal: 20,
    },
    userAge: {
        fontSize: 16,
        color: "white",
    },
    loadingText: {
        color: "white",
        marginTop: 10,
    }
});
