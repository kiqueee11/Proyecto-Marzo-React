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
        coverPhoto, 
        null,
        null,
        null,
        null,
        null,
    ]);

    const [lastPress, setLastPress] = useState(0);

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

            if (index === 0) {
                updateCoverPhoto(pickerResult.assets[0].uri);
                updateProfilePhoto(pickerResult.assets[0].uri);
            }
        }
    };

    const handleDoubleClick = (index: number) => {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - lastPress;

        if (timeDiff < 300) {
            const newPhotos = [...photos];
            const clickedPhoto = newPhotos[index];

            newPhotos.splice(index, 1);
            newPhotos.unshift(clickedPhoto);

            setPhotos(newPhotos);

            updateCoverPhoto(newPhotos[0]!);
            updateProfilePhoto(newPhotos[0]!);
        }
        setLastPress(currentTime);
    };

    return (
        <View style={styles.photosSection}>
            <Text style={styles.sectionLabel}>Fotos</Text>          
            
    
            {/* Cuadrícula de Fotos (TOUCHABLE) */}
            <View style={styles.photoGrid}>
                {photos.map((photo, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleDoubleClick(index)}
                        onLongPress={() => pickImage(index)}
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
}

export default PhotoGrid;