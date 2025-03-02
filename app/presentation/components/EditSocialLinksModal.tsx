import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { styles } from "../styles/Style";
import { Ionicons } from "@expo/vector-icons";

interface EditSocialLinksModalProps {
    visible: boolean;
    onClose: () => void;
    socialLinks: {
        instagram: string;
        facebook: string;
        twitter: string;
    };
    onSave: (updatedLinks: {
        instagram: string;
        facebook: string;
        twitter: string;
    }) => void;
}

const EditSocialLinksModal: React.FC<EditSocialLinksModalProps> = ({
    visible,
    onClose,
    socialLinks,
    onSave,
}) => {
    const [editedLinks, setEditedLinks] = useState(socialLinks);

    const handleSave = () => {
        onSave(editedLinks);
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Editar Redes Sociales</Text>

                    <View style={styles.modalInputContainer}>
                        <Ionicons
                            name="logo-instagram"
                            size={24}
                            color="black"
                            style={styles.modalInputIcon}
                        />
                        <TextInput
                            style={styles.modalInputField}
                            value={editedLinks.instagram}
                            onChangeText={(text) =>
                                setEditedLinks({ ...editedLinks, instagram: text })
                            }
                            placeholder="URL de Instagram"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.modalInputContainer}>
                        <Ionicons
                            name="logo-facebook"
                            size={24}
                            color="black"
                            style={styles.modalInputIcon}
                        />
                        <TextInput
                            style={styles.modalInputField}
                            value={editedLinks.facebook}
                            onChangeText={(text) =>
                                setEditedLinks({ ...editedLinks, facebook: text })
                            }
                            placeholder="URL de Facebook"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.modalInputContainer}>
                        <Ionicons
                            name="logo-twitter"
                            size={24}
                            color="black"
                            style={styles.modalInputIcon}
                        />
                        <TextInput
                            style={styles.modalInputField}
                            value={editedLinks.twitter}
                            onChangeText={(text) =>
                                setEditedLinks({ ...editedLinks, twitter: text })
                            }
                            placeholder="URL de Twitter"
                            autoCapitalize="none"
                        />
                    </View>

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

export default EditSocialLinksModal;
