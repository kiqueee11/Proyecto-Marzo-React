import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

interface PhotoGridProps {
    photos: string[];
    updatePhotos?: (photos: string[]) => void;
    isViewOnly?: boolean;
    coverPhoto?: string | null;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, updatePhotos, isViewOnly, coverPhoto }) => {
    const pickImage = async (index: number) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0].uri && updatePhotos) {
            const newPhotos = [...photos];
            newPhotos[index] = result.assets[0].uri;
            updatePhotos(newPhotos);
        }
    };

    return (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {photos.map((photo, index) => (
                <TouchableOpacity key={index} onPress={() => !isViewOnly && pickImage(index)}>
                    <Image source={{ uri: photo }} style={{ width: 100, height: 100, margin: 5 }} />
                    {!isViewOnly && <Ionicons name="camera" size={24} color="white" />}
                </TouchableOpacity>
            ))}
            {coverPhoto && (
                <View style={{ marginTop: 10 }}>
                    <Image
                        source={{ uri: coverPhoto }}
                        style={{ width: 100, height: 100 }}
                    />
                </View>
            )}
        </View>
    );
};

export default PhotoGrid;