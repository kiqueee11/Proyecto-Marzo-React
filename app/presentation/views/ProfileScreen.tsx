import React from "react";
import { 
    View, Text, TouchableOpacity, Image, ScrollView, 
    Platform, Linking, KeyboardAvoidingView, ActivityIndicator, Button
} from "react-native";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import EditProfileModal from "../components/EditProfileModal";
import EditSocialLinksModal from "../components/EditSocialLinksModal";
import PhotoGrid from "../components/Photogrid"; 
import { PropsStackNavigation } from "../interfaces/StackNav";
import { useUser } from '../path/to/UserContext';

export function ProfileScreen({ navigation }: PropsStackNavigation) {
    const { user, loading, error, refreshUserData } = useUser();

    // Handle loading state
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#E35D66" />
            </View>
        );
    }

    // Handle error state
    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
                <Button title="Intentar nuevamente" onPress={refreshUserData} />
            </View>
        );
    }

    // Social media links based on user data or default values
    const socialLinks = user?.socialLinks || {
        instagram: "https://www.instagram.com",
        facebook: "https://www.facebook.com",
        twitter: "https://www.twitter.com",
    };

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
                {/* Header with back button */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={30} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Perfil</Text>
                    
                    {/* Add refresh button */}
                    <TouchableOpacity
                        onPress={refreshUserData}
                        style={styles.refreshButton}
                    >
                        <Ionicons name="refresh" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Profile photo */}
                <View style={styles.profilePhotoContainer}>                    
                    <Image
                        source={user?.coverPhoto ? { uri: user.coverPhoto } : require("../../assets/perfil.png")}
                        style={styles.profilePhoto}
                        resizeMode="cover"
                    />
                </View>

                {/* Profile information */}
                <ScrollView style={styles.content}>
                    <View style={styles.editProfileInfoCard}>
                        <View style={styles.ageGenderContainer}>
                            <Text style={styles.editProfileName}>
                                {user?.userName || "Usuario"}
                            </Text>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => navigation.navigate('EditProfile')}
                            >
                                <Ionicons name="pencil" size={22} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ageGenderContainer}>
                            <Text style={styles.editProfileAge}>{user?.edad || "--"}</Text>
                            <Text style={styles.profileGender}>{user?.gender || "No especificado"}</Text>
                        </View>
                        <Text style={styles.descriptionText}>{user?.description || "Sin descripción"}</Text>

                        {/* Photo grid */}
                        <View style={styles.container}>
                            {user?.photos && (
                                <PhotoGrid
                                    coverPhoto={user.coverPhoto}
                                    photos={user.photos}
                                    isViewOnly={true}
                                />
                            )}
                        </View>

                        {/* Social networks */}
                        <View style={styles.socialSection}>
                            <View style={styles.ageGenderContainer}>
                                <Text style={styles.sectionLabel}>Redes Sociales</Text>
                            </View>
                            <View style={styles.socialIcons}>
                                {socialLinks.instagram && (
                                    <TouchableOpacity
                                        onPress={() => Linking.openURL(socialLinks.instagram)}
                                        style={styles.socialIconButton}
                                    >
                                        <Ionicons name="logo-instagram" size={24} color="black" />
                                    </TouchableOpacity>
                                )}
                                {socialLinks.facebook && (
                                    <TouchableOpacity
                                        onPress={() => Linking.openURL(socialLinks.facebook)}
                                        style={styles.socialIconButton}
                                    >
                                        <Ionicons name="logo-facebook" size={24} color="black" />
                                    </TouchableOpacity>
                                )}
                                {socialLinks.twitter && (
                                    <TouchableOpacity
                                        onPress={() => Linking.openURL(socialLinks.twitter)}
                                        style={styles.socialIconButton}
                                    >
                                        <Ionicons name="logo-twitter" size={24} color="black" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                        
                        {/* Edit profile button */}
                        <TouchableOpacity
                            style={styles.editProfileButton}
                            onPress={() => navigation.navigate('EditProfile')}
                        >
                            <Text style={styles.editProfileButtonText}>Editar Perfil</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

// Here I'm keeping the original styles and adding new ones for the ProfileScreen
const styles = StyleSheet.create({
    // Original styles
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
    
    // New styles for ProfileScreen
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: "#E35D66",
        marginBottom: 20,
    },
    refreshButton: {
        position: "absolute",
        right: 15,
        top: 35,
        padding: 10,
    },
    editProfileButton: {
        backgroundColor: "#E35D66",
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 25,
        marginTop: 25,
        alignItems: "center",
    },
    editProfileButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    }
})