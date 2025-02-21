// screens/EditProfileScreen.tsx
import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Image,
} from "react-native";
import { styles } from "../styles/Style";
import { NavigationProps } from "../../types";

export const EditProfileScreen: React.FC<NavigationProps> = ({
    navigation,
}) => {
    return (
        <SafeAreaView style={styles.editProfileContainer}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
            >
                <Text style={styles.backButtonText}>←</Text>
                <Text style={styles.headerText}>Editar perfil</Text>
            </TouchableOpacity>

            <View style={styles.photoGrid}>
                {[...Array(6)].map((_, index) => (
                    <TouchableOpacity key={index} style={styles.photoBox}>
                        <Image
                            source={require("../assets/icon.png")}
                            style={styles.cameraIcon}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.personalInfo}>
                <Text style={styles.sectionTitle}>Datos personales</Text>
                <TextInput style={styles.infoInput} value="Enrique Martin" />
                <TextInput style={styles.infoInput} value="26" />
                <TextInput style={styles.infoInput} value="Masculino" />
            </View>

            <TextInput
                style={styles.descriptionInput}
                placeholder="Descripción"
                multiline
            />

            <View style={styles.socialLinks}>
                <Text style={styles.sectionTitle}>Redes Sociales</Text>
                <View style={styles.socialIcons}>
                    <TouchableOpacity>
                        <Image
                            source={require("../assets/icon.png")}
                            style={styles.socialIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require("../assets/icon.png")}
                            style={styles.socialIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require("../assets/icon.png")}
                            style={styles.socialIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
