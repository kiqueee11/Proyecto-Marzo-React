import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Platform,
    Linking,
    KeyboardAvoidingView,
} from "react-native";
import { NavigationProps } from "../../types";
import styles from "../styles/Style";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import EditProfileModal from "../components/EditProfileModal";
import EditSocialLinksModal from "../components/EditSocialLinksModal";
import PhotoGrid from "../components/Photogrid";

export const EditProfileScreen: React.FC<NavigationProps> = ({
    navigation,
}) => {
    const [profile, setProfile] = useState({
        name: "Enrique Martin",
        age: "26",
        gender: "Hombre",
        description: "Lorem ipsum dolor sit amet...",
        photos: [1],
    });

    const [socialLinks, setSocialLinks] = useState({
        instagram: "https://www.instagram.com",
        facebook: "https://www.facebook.com",
        twitter: "https://www.twitter.com",
    });
    const [socialModalVisible, setSocialModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null); // Foto de perfil
    const [coverPhoto, setCoverPhoto] = useState<string | null>(null); // Foto de portada

    // Función para actualizar la foto de perfil
    const updateProfilePhoto = (newPhotoUri: string) => {
        setProfilePhoto(newPhotoUri);
    };

    // Función para actualizar la foto de portada
    const updateCoverPhoto = (newPhotoUri: string) => {
        setCoverPhoto(newPhotoUri);
    };

    // Efecto para solicitar permisos en iOS al iniciar
    useEffect(() => {
        (async () => {
            if (Platform.OS === "ios") {
                const { granted } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (!granted) {
                    alert("Necesitas permisos para acceder a la galería.");
                }
            }
        })();
    }, []);

    return (
        <LinearGradient
            colors={["#E35D66", "#A479AF"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.editProfileContainer}
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
                    <Text style={styles.headerText}>Perfil</Text>
                </View>

                {/* Imagen de perfil */}
                <View style={styles.profilePhotoContainer}>
                    <TouchableOpacity
                        onPress={() => updateProfilePhoto("newUriHere")}
                    >
                        <Image
                            source={
                                profilePhoto
                                    ? { uri: profilePhoto }
                                    : require("../assets/perfil.png")
                            }
                            style={styles.profilePhoto}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                </View>

                {/* Información del perfil */}
                <ScrollView style={styles.content}>
                    <View style={styles.editProfileInfoCard}>
                        <View style={styles.ageGenderContainer}>
                            <Text style={styles.editProfileName}>
                                {profile.name}
                            </Text>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => setModalVisible(true)}
                            >
                                <Ionicons
                                    name="pencil"
                                    size={22}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ageGenderContainer}>
                            <Text style={styles.editProfileAge}>
                                {profile.age}
                            </Text>
                            <Text style={styles.profileGender}>
                                {profile.gender}
                            </Text>
                        </View>
                        <Text style={styles.descriptionText}>
                            {profile.description}
                        </Text>

                        {/* Fotos del perfil */}
                        <View style={styles.container}>
                            {/* Pasa la función y el estado a PhotoGrid */}
                            <PhotoGrid
                                coverPhoto={coverPhoto}
                                updateProfilePhoto={updateProfilePhoto}
                                updateCoverPhoto={updateCoverPhoto}
                            />
                        </View>

                        {/* Redes sociales */}
                        <View style={styles.socialSection}>
                            <View style={styles.ageGenderContainer}>
                                <Text style={styles.sectionLabel}>
                                    Redes Sociales
                                </Text>
                                <TouchableOpacity
                                    style={styles.editButton}
                                    onPress={() => setSocialModalVisible(true)}
                                >
                                    <Ionicons
                                        name="pencil"
                                        size={22}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.socialIcons}>
                                <TouchableOpacity
                                    onPress={() =>
                                        Linking.openURL(socialLinks.instagram)
                                    }
                                    style={styles.socialIconButton}
                                >
                                    <Ionicons
                                        name="logo-instagram"
                                        size={24}
                                        color="black"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>
                                        Linking.openURL(socialLinks.facebook)
                                    }
                                    style={styles.socialIconButton}
                                >
                                    <Ionicons
                                        name="logo-facebook"
                                        size={24}
                                        color="black"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>
                                        Linking.openURL(socialLinks.twitter)
                                    }
                                    style={styles.socialIconButton}
                                >
                                    <Ionicons
                                        name="logo-twitter"
                                        size={24}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Modal para editar perfil */}
                <EditProfileModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    profile={profile}
                    onSave={(updatedProfile) =>
                        setProfile((prev) => ({ ...prev, ...updatedProfile }))
                    }
                />

                {/* Modal para editar redes sociales */}
                <EditSocialLinksModal
                    visible={socialModalVisible}
                    onClose={() => setSocialModalVisible(false)}
                    socialLinks={socialLinks}
                    onSave={setSocialLinks}
                />
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};
