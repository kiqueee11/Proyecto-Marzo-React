import React, { useState, useEffect } from "react";
import { 
    View, Text, TouchableOpacity, Image, ScrollView, 
    Platform, Linking, KeyboardAvoidingView 
} from "react-native";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; // 📌 Importamos ImagePicker para seleccionar imágenes
import EditProfileModal from "../components/EditProfileModal"; // 📌 Modal para editar perfil
import EditSocialLinksModal from "../components/EditSocialLinksModal"; // 📌 Modal para editar redes sociales
import PhotoGrid from "../components/Photogrid"; // 📌 Componente para mostrar imágenes en cuadrícula
import { PropsStackNavigation } from "../interfaces/StackNav"; // 📌 Tipado para la navegación

export function EditProfileScreen({ navigation }: PropsStackNavigation) {
    // 📌 Estado del perfil del usuario
    const [profile, setProfile] = useState({
        name: "Enrique Martin",
        age: "26",
        gender: "Hombre",
        description: "Lorem ipsum dolor sit amet...",
        photos: [1],
    });

    // 📌 Estado para los enlaces de redes sociales
    const [socialLinks, setSocialLinks] = useState({
        instagram: "https://www.instagram.com",
        facebook: "https://www.facebook.com",
        twitter: "https://www.twitter.com",
    });

    // 📌 Estados para manejar la visibilidad de los modales
    const [socialModalVisible, setSocialModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    
    // 📌 Estados para las fotos de perfil y portada
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null); 
    const [coverPhoto, setCoverPhoto] = useState<string | null>(null); 

    // 📌 Funciones para actualizar las fotos
    const updateProfilePhoto = (newPhotoUri: string) => {
        setProfilePhoto(newPhotoUri);
    };

    const updateCoverPhoto = (newPhotoUri: string) => {
        setCoverPhoto(newPhotoUri);
    };

    // 📌 Pedimos permisos para la galería (⚠️ Aquí podría estar el warning)
    useEffect(() => {
        (async () => {
            if (Platform.OS === "ios") {
                const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
                {/* 📌 Encabezado con botón de regreso */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={30} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Perfil</Text>
                </View>

                {/* 📌 Foto de perfil con opción de cambiar */}
                <View style={styles.profilePhotoContainer}>                    
                    <Image
                        source={coverPhoto ? { uri: coverPhoto } : require("../../assets/perfil.png")}
                        style={styles.profilePhoto}
                        resizeMode="cover"
                        />
                </View>

                {/* 📌 Información del perfil */}
                <ScrollView style={styles.content}>
                    <View style={styles.editProfileInfoCard}>
                        <View style={styles.ageGenderContainer}>
                            <Text style={styles.editProfileName}>
                                {profile.name}
                            </Text>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => setModalVisible(true)} // 📌 Abre modal de edición
                            >
                                <Ionicons name="pencil" size={22} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ageGenderContainer}>
                            <Text style={styles.editProfileAge}>{profile.age}</Text>
                            <Text style={styles.profileGender}>{profile.gender}</Text>
                        </View>
                        <Text style={styles.descriptionText}>{profile.description}</Text>

                        {/* 📌 Cuadrícula de fotos */}
                        <View style={styles.container}>
                            <PhotoGrid
                                coverPhoto={coverPhoto}
                                updateProfilePhoto={updateProfilePhoto}
                                updateCoverPhoto={updateCoverPhoto}
                            />
                        </View>

                        {/* 📌 Redes sociales con opción de edición */}
                        <View style={styles.socialSection}>
                            <View style={styles.ageGenderContainer}>
                                <Text style={styles.sectionLabel}>Redes Sociales</Text>
                                <TouchableOpacity
                                    style={styles.editButton}
                                    onPress={() => setSocialModalVisible(true)} // 📌 Abre modal de redes
                                >
                                    <Ionicons name="pencil" size={22} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.socialIcons}>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(socialLinks.instagram)}
                                    style={styles.socialIconButton}
                                >
                                    <Ionicons name="logo-instagram" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(socialLinks.facebook)}
                                    style={styles.socialIconButton}
                                >
                                    <Ionicons name="logo-facebook" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(socialLinks.twitter)}
                                    style={styles.socialIconButton}
                                >
                                    <Ionicons name="logo-twitter" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* 📌 Modales de edición */}
                <EditProfileModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    profile={profile}
                    onSave={(updatedProfile) => setProfile((prev) => ({ ...prev, ...updatedProfile }))}
                />

                <EditSocialLinksModal
                    visible={socialModalVisible}
                    onClose={() => setSocialModalVisible(false)}
                    socialLinks={socialLinks}
                    onSave={setSocialLinks}
                />
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

export const styles = StyleSheet.create({
    editProfileContainer: {
        flex: 1,
        backgroundColor: "#f8f8f8",
    },
    editProfileHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "transparent",
        position: "absolute",
        zIndex: 1,
        top: 20,
        left: 0,
        right: 0,
    },

    backIcon: {
        fontSize: 24,
        color: "#000",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "500",
        color: "#fff",
        marginLeft: 10,
        fontStyle: "italic",
    },
    content: {
        flex: 1,
    },
    profilePhotoContainer: {
        width: "100%",
        height: 250,
        backgroundColor: "#ccc",
    },
    profilePhoto: {
        width: "100%",
        height: "100%",
    },
    profileInfoCard: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
    },
    editProfileInfoCard: {
        height: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 0,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 30,
    },
    ageGenderContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    nameContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        paddingTop: 10,
    },

    editProfileName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        fontFamily: "sans-serif", 
    },

    editProfileAge: {
        fontSize: 20,
        color: "#333",
        marginLeft: 15,
    },

    profileGender: {
        fontSize: 16,
        color: "#666",
        marginLeft: 15,
    },

    editButton: {
        marginLeft: "auto",
    },

    editIcon: {
        fontSize: 22,
        color: "#000",
    },
    descriptionSection: {
        marginBottom: 20,
    },
    sectionLabel: {
        fontSize: 18,
        fontWeight: "500",
        color: "#333",
        marginBottom: 8,
        fontFamily: "serif",
    },
    inputField: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        fontSize: 18,
        width: "80%",
    },

    descriptionText: {
        fontSize: 16,
        color: "#666",
    },
    photosSection: {
        marginTop: 20,
    },
    profileImageContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    photoGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    gridPhotoContainer: {
        width: 100,
        height: 100,
        margin: 5,
    },
    gridPhoto: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingTop: 35,
    },

    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    socialSection: {
        marginTop: 20,
    },
    socialIcons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    socialIconButton: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: "#f1f1f1",
    },
    socialEditButton: {
        padding: 10,
    },
    socialEditContainer: {
        marginTop: 10,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
    },
})