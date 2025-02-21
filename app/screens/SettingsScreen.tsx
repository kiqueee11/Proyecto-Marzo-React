import React, { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    Switch,
    TouchableOpacity,
} from "react-native";
import { styles } from "../styles/Style";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AgeRangeSelector from "../components/AgeRangeSelector";
import DistanceRangeSelector from "../components/DistanceRangeSelector";
import Logout from "../components/Logout";
import DeleteAccount from "../components/DeleteAccount";
import { NavigationProps } from "../../types";

export const SettingsScreen: React.FC<NavigationProps> = ({ navigation }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [selectedPreference, setSelectedPreference] = useState("Ambos");

    const handleAgeRangeChange = (range: string) => {
        console.log(`Rango de edad seleccionado: ${range}`);
    };

    const handleDistanceChange = (distance: string) => {
        console.log(`Distancia seleccionada: ${distance}`);
    };

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

                <View style={styles.settingsSection}>
                    <Text style={styles.settingsHeader}>
                        Ajustes de descubrimiento
                    </Text>

                    <AgeRangeSelector onChange={handleAgeRangeChange} />

                    <DistanceRangeSelector onChange={handleDistanceChange} />

                    <View style={styles.card}>
                        <Text>Preferencias</Text>
                        <View style={styles.preferencesToggle}>
                            {["Hombre", "Ambos", "Mujer"].map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.preferenceButton,
                                        selectedPreference === option
                                            ? styles.activePreference
                                            : {},
                                    ]}
                                    onPress={() => {
                                        setSelectedPreference(option);
                                    }}
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
                            onValueChange={(value) => {
                                setIsVisible(value);
                                console.log(
                                    value
                                        ? "Perfil visible activado"
                                        : "Perfil oculto"
                                );
                            }}
                        />
                    </View>
                </View>
                <Logout navigation={navigation} />
                <DeleteAccount navigation={navigation} />
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};
