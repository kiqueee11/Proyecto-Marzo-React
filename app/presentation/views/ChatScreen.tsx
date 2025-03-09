import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import authStorage from '../../data/sigletons/authDataSingleton';
import ChatViewModel from '../viewModel/ChatViewModel';
import { PropsStackNavigation } from '../interfaces/StackNav';

// Interfaz para los mensajes
interface IMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  read: boolean;
}

export function ChatScreen({ navigation }: PropsStackNavigation) {
  const {
    chat,
    messages,
    loading,
    error,
    sending,
    createChat,
    getUserChats,
    sendMessage,
  } = ChatViewModel();

  const [messageText, setMessageText] = useState('');
  const [chatId, setChatId] = useState<string | null>(null);
  const [initializingChat, setInitializingChat] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const flatListRef = useRef<FlatList<IMessage>>(null);
  const userId = authStorage.getUserId();

  // Iniciar chat al cargar la pantalla con manejo de errores mejorado
  useEffect(() => {
    const initializeChat = async () => {
      setInitializingChat(true);
      setErrorMessage(null);      
      
      try {
        // Si la API directa falla, intentamos alternativa
        if (userId) {
          // Intenta crear directamente con el ID del usuario
          const newChatId = await createChat(userId);
          if (newChatId) {
            setChatId(newChatId);
            console.log("Chat creado con método alternativo:", newChatId);
            return;
          }
        }
        
        // Si todo falla, mostramos un mensaje de error
        setErrorMessage("No se pudo crear el chat después de varios intentos. Por favor, inténtalo más tarde.");
      } catch (err: any) {
        setErrorMessage(err?.message || "Error al reintentar la creación del chat");
      } finally {
        setInitializingChat(false);
      }
    };

    if (!chatId) {
      initializeChat();
    }
  }, []);

  // Reintentar la creación del chat
  const handleRetry = async () => {
    setInitializingChat(true);
    setErrorMessage(null);
    
    
  };

  // Desplazarse al final de la lista cuando llegan nuevos mensajes
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Manejar el envío de mensajes con validación
  const handleSendMessage = async () => {
    if (!messageText.trim() || !chatId) return;
    
    try {
      const success = await sendMessage(chatId, messageText.trim());
      if (success) {
        setMessageText('');
      } else {
        Alert.alert("Error", "No se pudo enviar el mensaje");
      }
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      Alert.alert("Error", "Ocurrió un error al enviar el mensaje");
    }
  };

  // Formatear la hora del mensaje
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Renderizar cada mensaje
  const renderMessageItem = ({ item }: { item: IMessage }) => {
    const isMine = item.senderId === userId;
    
    return (
      <View style={[
        styles.messageContainer,
        isMine ? styles.myMessageContainer : styles.otherMessageContainer
      ]}>
        <View style={[
          styles.messageBubble,
          isMine ? styles.myMessageBubble : styles.otherMessageBubble
        ]}>
          <Text style={[
            styles.messageText,
            isMine ? styles.myMessageText : styles.otherMessageText
          ]}>
            {item.text}
          </Text>
          <Text style={[
            styles.timeText,
            isMine ? styles.myTimeText : styles.otherTimeText
          ]}>
            {formatTime(item.timestamp)}
          </Text>
        </View>
      </View>
    );
  };

  // Renderizar el separador entre mensajes
  const renderSeparator = () => <View style={styles.separator} />;

  // Renderizar el encabezado del chat
  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Chat Contigo Mismo</Text>
      <View style={styles.emptySpace} />
    </View>
  );

  // Renderizar el componente principal
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {renderHeader()}
        
        {(initializingChat || (loading && !chat)) ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007BFF" />
            <Text style={styles.loadingText}>Cargando chat...</Text>
          </View>
        ) : errorMessage || error ? (
          <View style={styles.errorContainer}>
            <Icon name="alert-circle" size={48} color="#FF3B30" />
            <Text style={styles.errorText}>{errorMessage || error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={handleRetry}
            >
              <Text style={styles.retryButtonText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessageItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={renderSeparator}
            contentContainerStyle={styles.messagesContainer}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No hay mensajes aún. ¡Comienza una conversación contigo mismo!
                </Text>
              </View>
            }
          />
        )}
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe un mensaje..."
            value={messageText}
            onChangeText={setMessageText}
            multiline
            maxLength={500}
            editable={!initializingChat && !errorMessage && !!chatId}
          />
          <TouchableOpacity 
            style={[
              styles.sendButton, 
              (!messageText.trim() || !chatId || initializingChat) && styles.disabledSendButton
            ]}
            onPress={handleSendMessage}
            disabled={!messageText.trim() || sending || !chatId || initializingChat}
          >
            {sending ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Icon name="send" size={24} color="#FFF" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F6F6'
  },
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1'
  },
  backButton: {
    padding: 4
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  emptySpace: {
    width: 32
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#8A8A8A'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center'
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007BFF',
    borderRadius: 8
  },
  retryButtonText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 16
  },
  messageContainer: {
    marginBottom: 12,
    maxWidth: '80%'
  },
  myMessageContainer: {
    alignSelf: 'flex-end'
  },
  otherMessageContainer: {
    alignSelf: 'flex-start'
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    minWidth: 80
  },
  myMessageBubble: {
    backgroundColor: '#007BFF',
    borderBottomRightRadius: 4
  },
  otherMessageBubble: {
    backgroundColor: '#E5E5EA',
    borderBottomLeftRadius: 4
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4
  },
  myMessageText: {
    color: '#FFF'
  },
  otherMessageText: {
    color: '#000'
  },
  timeText: {
    fontSize: 12,
    alignSelf: 'flex-end'
  },
  myTimeText: {
    color: 'rgba(255, 255, 255, 0.7)'
  },
  otherTimeText: {
    color: 'rgba(0, 0, 0, 0.5)'
  },
  separator: {
    height: 8
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E1E1E1'
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabledSendButton: {
    backgroundColor: '#B0B0B0'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 50
  },
  emptyText: {
    fontSize: 16,
    color: '#8A8A8A',
    textAlign: 'center',
    lineHeight: 24
  }
});

export default ChatScreen;