import React, { useState } from "react";
import { ScrollView, View, Text, KeyboardAvoidingView, Platform, Switch, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AgeRangeSelector from "../components/AgeRangeSelector";
import DistanceRangeSelector from "../components/DistanceRangeSelector";
import Logout from "../components/Logout";
import DeleteAccount from "../components/DeleteAccount";
import { PropsStackNavigation } from "../interfaces/StackNav";
import { LoginScreen } from "./LoginScreen";

export function SettingsScreen({ navigation }: PropsStackNavigation) {
    const [isVisible, setIsVisible] = useState(true);
    const [selectedPreference, setSelectedPreference] = useState("Ambos");

    return (
        <LinearGradient
            colors={["#E35D66", "#A479AF"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.settingsContainer}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={30} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Ajustes</Text>
                </View>

                <ScrollView contentContainerStyle={styles.settingsSection}>
                    <Text style={styles.settingsHeader}>Ajustes de descubrimiento</Text>
                    <AgeRangeSelector onChange={(range) => console.log(`Rango de edad seleccionado: ${range}`)} />
                    <DistanceRangeSelector onChange={(distance) => console.log(`Distancia seleccionada: ${distance}`)} />

                    <View style={styles.card}>
                        <Text>Preferencias</Text>
                        <View style={styles.preferencesToggle}>
                            {["Hombre", "Ambos", "Mujer"].map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.preferenceButton,
                                        selectedPreference === option ? styles.activePreference : {},
                                    ]}
                                    onPress={() => setSelectedPreference(option)}
                                >
                                    <Text>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Text>Perfil visible</Text>
                        <Switch
                            value={isVisible}
                            onValueChange={setIsVisible}
                        />
                    </View>

                    <Logout navigation={navigation}/>
                    <DeleteAccount navigation={navigation} />
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}


export const styles = StyleSheet.create({
    settingsContainer: {
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
    settingsSection: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    settingsHeader: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10,
    },
    card: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    preferencesToggle: {
        flexDirection: "row",
        backgroundColor: "#black",
        borderRadius: 8,
        marginVertical: 10,
        overflow: "hidden",
    },
    preferenceButton: {
        flex: 1,
        padding: 15,
        alignItems: "center",
    },
    activePreference: {
        backgroundColor: "#FF8899",
    },
});