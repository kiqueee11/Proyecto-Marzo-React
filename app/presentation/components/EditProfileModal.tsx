import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { styles } from "../styles/Style";

interface EditProfileModalProps {
    visible: boolean;
    onClose: () => void;
    profile: {
        name: string;
        age: string;
        gender: string;
        description: string;
    };
    onSave: (updatedProfile: {
        name: string;
        age: string;
        gender: string;
        description: string;
    }) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
    visible,
    onClose,
    profile,
    onSave,
}) => {
    const [editedProfile, setEditedProfile] = useState(profile);

    const handleSave = () => {
        onSave(editedProfile);
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Editar Perfil</Text>

                    <TextInput
                        style={styles.modalInputField}
                        value={editedProfile.name}
                        onChangeText={(text) =>
                            setEditedProfile({ ...editedProfile, name: text })
                        }
                        placeholder="Nombre"
                    />

                    <TextInput
                        style={styles.modalInputField}
                        value={editedProfile.age}
                        onChangeText={(text) =>
                            setEditedProfile({ ...editedProfile, age: text })
                        }
                        keyboardType="numeric"
                        placeholder="Edad"
                    />

                    <TextInput
                        style={styles.modalInputField}
                        value={editedProfile.gender}
                        onChangeText={(text) =>
                            setEditedProfile({ ...editedProfile, gender: text })
                        }
                        placeholder="Género"
                    />

                    <TextInput
                        style={styles.modalInputField}
                        value={editedProfile.description}
                        onChangeText={(text) => {
                            if (text.split(" ").length <= 50) {
                                setEditedProfile({
                                    ...editedProfile,
                                    description: text,
                                });
                            }
                        }}
                        multiline
                        placeholder="Descripción (máx. 50 palabras)"
                    />

                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.modalCancelButton}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleSave}
                            style={styles.modalSaveButton}
                        >
                            <Text style={styles.buttonText}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default EditProfileModal;