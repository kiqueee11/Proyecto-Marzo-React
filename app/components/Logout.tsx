import React from "react";
import { TouchableOpacity, Text, Alert, View } from "react-native";
import { styles } from "../styles/Style";
import { NavigationProps } from "../../types";

interface LogoutProps extends NavigationProps {}

const Logout: React.FC<LogoutProps> = ({ navigation }) => {
    // Función de confirmación para cerrar sesión
    const confirmLogout = () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Estás seguro de que deseas cerrar sesión?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sí",
                    onPress: () => {
                        Alert.alert("Sesión cerrada");
                        navigation.replace("Login"); // Vuelve a login
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.logoutContainer}>
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={confirmLogout}
            >
                <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Logout;
