import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, KeyboardAvoidingView, Platform, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PropsStackNavigation } from "../interfaces/StackNav";

export function ChatScreen({ navigation}: PropsStackNavigation) {
    const [messages, setMessages] = useState([
        { id: "1", text: "¡Hola! ¿En qué puedo ayudarte?", sender: "bot" },
    ]);
    const [inputText, setInputText] = useState("");
    const [showIdentityModal, setShowIdentityModal] = useState(false);
    const [isIdentityRevealed, setIsIdentityRevealed] = useState(false);
    const [userName, setUserName] = useState("Username");
    const [userAvatar, setUserAvatar] = useState(
        require("../../assets/flashmeet_logo.png")
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
        setUserAvatar(require("../../assets/perfil.png")); 
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

export const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
    },
    chatModalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    chatModalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    chatModalText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    chatModalButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    chatModalButtonYes: {
        backgroundColor: "#28a745",
        padding: 10,
        borderRadius: 5,
        width: "40%",
        alignItems: "center",
    },
    chatModalButtonNo: {
        backgroundColor: "#dc3545",
        padding: 10,
        borderRadius: 5,
        width: "40%",
        alignItems: "center",
    },
    chatModalButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingTop: 35,
    },
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    usernameText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginLeft: 10,
        fontStyle: "italic",
    },
    actionIconsContainer: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        right: 10,
        top: 10,
        paddingHorizontal: 15,
        paddingTop: 40,
    },
    actionIcon: {
        marginLeft: 10,
    },
    myMessage: {
        alignSelf: "flex-end",
        backgroundColor: "black",
        padding: 10,
        borderRadius: 20,
        marginVertical: 5,
        maxWidth: "70%",
    },
    myMessageText: {
        fontSize: 16,
        color: "white",
    },
    chatInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 25,
        margin: 10,
    },
    chatInput: {
        flex: 1,
        fontSize: 16,
        color: "black",
        paddingHorizontal: 10,
    },
    sendButton: {
        backgroundColor: "#A479AF",
        padding: 10,
        borderRadius: 25,
        marginLeft: 5,
    },
    otherMessage: {
        alignSelf: "flex-start",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 20,
        marginVertical: 5,
        maxWidth: "70%",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    otherMessageText: {
        fontSize: 16,
        color: "black",
    },

});
