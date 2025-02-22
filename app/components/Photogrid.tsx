import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../styles/Style";

interface PhotoGridProps {
    coverPhoto: string | null;
    updateProfilePhoto: (newPhotoUri: string) => void;
    updateCoverPhoto: (newPhotoUri: string) => void;
}

const PhotoGrid = ({
    coverPhoto,
    updateProfilePhoto,
    updateCoverPhoto,
}: PhotoGridProps) => {
    const [photos, setPhotos] = useState([
        coverPhoto, // Foto de portada que viene como prop desde EditProfileScreen
        null,
        null,
        null,
        null,
        null,
    ]);

    const [lastPress, setLastPress] = useState(0);

    // Manejador para elegir la foto desde la galería
    const pickImage = async (index: number) => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permiso de acceso a la galería denegado.");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            const newPhotos = [...photos];
            newPhotos[index] = pickerResult.assets[0].uri;
            setPhotos(newPhotos);

            // Si la foto modificada es la foto de perfil (índice 0)
            if (index === 0) {
                updateCoverPhoto(pickerResult.assets[0].uri);
                updateProfilePhoto(pickerResult.assets[0].uri);
            }
        }
    };

    // Función para manejar doble clic y poner la foto como portada
    const handleDoubleClick = (index: number) => {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - lastPress;

        // Si el tiempo entre dos clics es menor a 300ms, es un doble clic
        if (timeDiff < 300) {
            const newPhotos = [...photos];
            const clickedPhoto = newPhotos[index];

            // Establecer la foto como portada (posición 0)
            newPhotos.splice(index, 1);
            newPhotos.unshift(clickedPhoto);

            setPhotos(newPhotos);

            // Actualiza la foto de portada
            updateCoverPhoto(newPhotos[0]!);
            updateProfilePhoto(newPhotos[0]!);
        }
        setLastPress(currentTime); // Actualizar el último clic
    };

    return (
        <View style={styles.photosSection}>
            <Text style={styles.sectionLabel}>Fotos</Text>
            <View style={styles.photoGrid}>
                {photos.map((photo, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleDoubleClick(index)} // Detectar el doble clic
                        onLongPress={() => pickImage(index)} // Seleccionar una foto para actualizarla
                    >
                        {photo ? (
                            <View style={styles.gridPhotoContainer}>
                                <Image
                                    source={{ uri: photo }}
                                    style={styles.gridPhoto}
                                    resizeMode="cover"
                                />
                            </View>
                        ) : (
                            <View style={styles.emptyPhotoSlot}>
                                <Ionicons name="add" size={16} color="white" />
                                <Ionicons name="camera" size={20} color="#999" />
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default PhotoGrid;