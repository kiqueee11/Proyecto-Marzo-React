import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/Style";
import { NavigationProps } from "../../types";
import { LinearGradient } from "expo-linear-gradient";

export const ChatScreen: React.FC<NavigationProps> = ({ navigation }) => {
    const [messages, setMessages] = useState([
        { id: "1", text: "¡Hola! ¿En qué puedo ayudarte?", sender: "bot" },
    ]);
    const [inputText, setInputText] = useState("");
    const [showIdentityModal, setShowIdentityModal] = useState(false);
    const [isIdentityRevealed, setIsIdentityRevealed] = useState(false);
    const [userName, setUserName] = useState("Username");
    const [userAvatar, setUserAvatar] = useState(
        require("../assets/flashmeet_logo.png")
    );
    const [showActionIcons, setShowActionIcons] = useState(false); 
    const [showActionPopup, setShowActionPopup] = useState(false); 
    const [actionPopupText, setActionPopupText] = useState(""); 
    const flatListRef = useRef<FlatList>(null);

    const botResponses = [
        "¡Eso suena interesante! 🤔",
        "Cuéntame más sobre eso...",
        "Jajaja, buena esa. 😂",
        "No estoy seguro, pero puedo intentarlo.",
        "Hmm... Déjame pensarlo. 🤔",
        "Buena pregunta, nunca lo había pensado así.",
        "¡Exacto! Estoy totalmente de acuerdo.",
        "Esa es una forma interesante de verlo.",
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowIdentityModal(true);
        }, 30000);

        return () => clearTimeout(timer);
    }, []);

    const sendMessage = () => {
        if (inputText.trim() === "") return;

        const newMessages = [
            ...messages,
            { id: Date.now().toString(), text: inputText, sender: "me" },
        ];
        setMessages(newMessages);
        setInputText("");

        setTimeout(() => {
            const botReply =
                botResponses[Math.floor(Math.random() * botResponses.length)];
            setMessages([
                ...newMessages,
                { id: Date.now().toString(), text: botReply, sender: "bot" },
            ]);
        }, 1500);
    };

    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    const revealIdentity = () => {
        setUserAvatar(require("../assets/perfil.png")); 
        setUserName("Carlos Pérez");
        setIsIdentityRevealed(true);
        setShowIdentityModal(false);
        setShowActionIcons(true); 
    };

    const handleActionPress = (action: string) => {
        setActionPopupText(action);
        setShowActionPopup(true);
    };

    const closeActionPopup = () => {
        setShowActionPopup(false);
    };

    const restartChat = () => {
        setShowIdentityModal(false); 
        setShowActionIcons(false); 
        setMessages([]); 
        setInputText(""); 

        navigation.replace("Chat"); 
    };

    return (
        <LinearGradient
            colors={["#E35D66", "#A479AF"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.chatContainer}
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
                    <Image source={userAvatar} style={styles.userAvatar} />
                    <Text style={styles.usernameText}>{userName}</Text>

                    {isIdentityRevealed && showActionIcons && (
                        <View style={styles.actionIconsContainer}>
                            <TouchableOpacity
                                onPress={() =>
                                    handleActionPress("¿Deseas ver perfil?")
                                }
                                style={styles.actionIcon}
                            >
                                <Ionicons
                                    name="person"
                                    size={24}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    handleActionPress(
                                        "¿Deseas agregar como amigo?"
                                    )
                                }
                                style={styles.actionIcon}
                            >
                                <Ionicons
                                    name="person-add"
                                    size={24}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    handleActionPress(
                                        "¿Deseas iniciar videollamada?"
                                    )
                                }
                                style={styles.actionIcon}
                            >
                                <Ionicons
                                    name="videocam"
                                    size={24}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View
                            style={
                                item.sender === "me"
                                    ? styles.myMessage
                                    : styles.otherMessage
                            }
                        >
                            <Text
                                style={
                                    item.sender === "me"
                                        ? styles.myMessageText
                                        : styles.otherMessageText
                                }
                            >
                                {item.text}
                            </Text>
                        </View>
                    )}
                    contentContainerStyle={{ flexGrow: 1, padding: 10 }}
                    onContentSizeChange={() =>
                        flatListRef.current?.scrollToEnd({ animated: true })
                    }
                    onLayout={() =>
                        flatListRef.current?.scrollToEnd({ animated: true })
                    }
                />

                <View style={styles.chatInputContainer}>
                    <TextInput
                        style={styles.chatInput}
                        placeholder="Escribe un mensaje..."
                        placeholderTextColor="#999"
                        value={inputText}
                        onChangeText={setInputText}
                    />
                    <TouchableOpacity
                        onPress={sendMessage}
                        style={styles.sendButton}
                    >
                        <Ionicons name="send" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            <Modal visible={showIdentityModal} transparent animationType="fade">
                <View style={styles.chatModalContainer}>
                    <View style={styles.chatModalContent}>
                        <Text style={styles.chatModalText}>
                            ¿Deseas revelar tu identidad?
                        </Text>
                        <View style={styles.chatModalButtons}>
                            <TouchableOpacity
                                style={styles.chatModalButtonYes}
                                onPress={revealIdentity}
                            >
                                <Text style={styles.chatModalButtonText}>
                                    Sí
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.chatModalButtonNo}
                                onPress={restartChat}
                            >
                                <Text style={styles.chatModalButtonText}>
                                    No
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={showActionPopup} transparent animationType="fade">
                <View style={styles.chatModalContainer}>
                    <View style={styles.chatModalContent}>
                        <Text style={styles.chatModalText}>
                            {actionPopupText}
                        </Text>
                        <View style={styles.chatModalButtons}>
                            <TouchableOpacity
                                style={styles.chatModalButtonYes}
                                onPress={closeActionPopup}
                            >
                                <Text style={styles.chatModalButtonText}>
                                    Aceptar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.chatModalButtonNo}
                                onPress={closeActionPopup}
                            >
                                <Text style={styles.chatModalButtonText}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
};
