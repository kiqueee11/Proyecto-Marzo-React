import React from "react";
import { View, Text, TouchableOpacity, Image, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { StyleSheet } from "react-native";
import { PropsStackNavigation } from "../interfaces/StackNav";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

interface Friend {
    id: string;
    name: string;
    message: string;
    image: { uri: string };
}

export function FriendsScreen({ navigation }: PropsStackNavigation) {
    const friends: Friend[] = [
        { id: "1", name: "Manuel", message: "Hola, ¿cómo estás?", image: { uri: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" } },
        { id: "2", name: "Carlos", message: "¿Qué tal tu día?", image: { uri: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" } },
        { id: "3", name: "Sofía", message: "Nos vemos más tarde.", image: { uri: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" } },
        { id: "4", name: "Andrea", message: "Estoy en camino...", image: { uri: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" } },
        { id: "5", name: "Pedro", message: "¡Listo para el juego!", image: { uri: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg" } },
        { id: "6", name: "Laura", message: "Te envié el documento.", image: { uri: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg" } },
        { id: "7", name: "Daniel", message: "Vamos por un café.", image: { uri: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg" } },
        { id: "8", name: "Fernanda", message: "Mañana tengo tiempo.", image: { uri: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg" } },
        { id: "9", name: "Javier", message: "Avísame cuando llegues.", image: { uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" } },
    ];

    const renderItem = ({ item }: { item: Friend }) => (
        <View style={styles.card}>
            <TouchableOpacity style={styles.friendItem}>
                <Image source={item.image} style={styles.friendImage} />
                <View style={styles.friendInfo}>
                    <Text style={styles.friendName}>{item.name}</Text>
                    <Text style={styles.friendMessage}>{item.message}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <LinearGradient colors={["#E35D66", "#A479AF"]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.friendsContainer}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={30} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Amigos</Text>
                </View>

                <FlatList data={friends} keyExtractor={(item) => item.id} renderItem={renderItem} />
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}



export const styles = StyleSheet.create({
    friendsContainer: {
        flex: 1,
        paddingTop: 50,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    backButton: {
        marginRight: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    card: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 10,
        padding: 10,
    },
    friendItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    friendImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    friendInfo: {
        flex: 1,
    },
    friendName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    friendMessage: {
        fontSize: 14,
        color: "white",
        opacity: 0.8,
    },
});