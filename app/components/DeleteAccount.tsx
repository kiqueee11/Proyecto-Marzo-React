import React from "react";
import { TouchableOpacity, Text, Alert, View } from "react-native";
import { styles } from "../styles/Style";
import { NavigationProps } from "../../types";

interface DeleteAccountProps extends NavigationProps {}

const DeleteAccount: React.FC<DeleteAccountProps> = ({ navigation }) => {
    // Función de confirmación para eliminar cuenta
    const confirmDeleteAccount = () => {
        Alert.alert(
            "Borrar cuenta",
            "¿Estás seguro de que deseas borrar tu cuenta? Esta acción es irreversible.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sí",
                    onPress: () => {
                        Alert.alert("Cuenta borrada");
                        navigation.replace("Login"); // Vuelve a login
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.deleteContainer}>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={confirmDeleteAccount}
            >
                <Text style={styles.deleteText}>Borrar cuenta</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DeleteAccount;
