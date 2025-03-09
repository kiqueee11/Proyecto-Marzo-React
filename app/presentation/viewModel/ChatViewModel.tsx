import { useState, useEffect } from "react";
import { ApiFlashmeet } from "../../data/sources/remote/api/ApiFlashmeet";
import authStorage from "../../data/sigletons/authDataSingleton";
import { ApiResponse } from "../../domain/entities/ApiInterface";
import qs from 'qs';
import { get } from "axios";
import Chat from "../../data/sources/remote/models/ChatModels";

// Interfaces para los datos del chat
interface IMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  read: boolean;
}

interface IChat {
  id: string;
  user1Id: string;
  user2Id: string;
  createdAt: number;
  lastMessage?: IMessage;
  messages: IMessage[];
}

export const ChatViewModel = () => {
  const [chat, setChat] = useState<IChat | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState<boolean>(false);

  // Obtener el token JWT del almacenamiento
  const token = authStorage.getToken();
  const userId = authStorage.getUserId(); // Asumiendo que también almacenas el ID del usuario
  console.log("Token:", token);
  console.log("User ID:", userId);

  const createChat = async (userId: string): Promise<string | null> => {
    if (!token || !userId) {
      setError("No se encontró el token de autenticación o ID de usuario");
      return null;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      // Usamos params para enviar los datos en la URL
      const response = await ApiFlashmeet.post<ApiResponse>(
        "chat/chats/create",
        null,  // No necesitas enviar un cuerpo, solo los parámetros en la URL
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
          },
          params: {
            user1_id: userId,
            user2_id: userId
          }
        }
      );
  
      console.log("Respuesta de creación de chat:", response.data);
  
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {

        getUserChats();
        return "lo que quieras";
      } else {
        setError(response.data.message || "No se pudo crear el chat");
        return null;
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error al crear el chat";
      setError(errorMessage);
      console.error("Error en la creación del chat:", error.response?.data || error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getUserChats = async () => {
    try {
      const response = await ApiFlashmeet.post<ApiResponse>(
        'chat/chats/get-all-chats',  // Cambia esto a la URL de tu backend
        null, // No necesitas cuerpo en la solicitud
        {
          params: {
            userId: userId,  // El ID del usuario para obtener sus chats
          },
          headers: {
            Authorization: `Bearer ${token}`,  // Asegúrate de pasar el token de autenticación
            'Accept': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        // Mapea la respuesta a objetos Chat
      const chats: Chat[] = response.data.data.map((chatData: any) => ({
        id: chatData.id,
        user1Id: chatData.user1Id,
        user2Id: chatData.user2Id,
        user1Name: chatData.user1Name,
        user2Name: chatData.user2Name,
        user1Picture: chatData.user1Picture,
        user2Picture: chatData.user2Picture,
        user1Online: chatData.user1Online,
        user2Online: chatData.user2Online,
        isChatAnnonimous: chatData.isChatAnnonimous,
        user1wantsToRevealIdentity: chatData.user1wantsToRevealIdentity,
        user2wantstoRevealIdentity: chatData.user2wantstoRevealIdentity,
        chatId: chatData.chatId,
        version: chatData.version,
        createdAt: new Date(chatData.createdAt),
        updatedAt: new Date(chatData.updatedAt),
      }));
      console.log('Chats obtenidos:', chats);
      return chats;
      } else {
        console.error('Error al obtener chats:', response.data.message);
        return [];      
      }
    } catch (error) {
      console.error('Error al obtener chats:', error);
    }
  }; 
  

  // Enviar un mensaje en el chat
  const sendMessage = async (chatId: string, text: string): Promise<boolean> => {
    if (!token || !userId) {
      setError("No se encontró el token de autenticación o ID de usuario");
      return false;
    }

    setSending(true);
    setError(null);

    try {
      const response = await ApiFlashmeet.post<ApiResponse>(
        `chat/messages/send`,
        {
          chatId,
          senderId: userId,
          text,
          timestamp: Date.now(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Respuesta de envío de mensaje:", response.data);

      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        // Añadir el mensaje a la lista local
        if (response.data.data) {
          const newMessage = response.data.data as IMessage;
          setMessages(prevMessages => [...prevMessages, newMessage]);
        }
        return true;
      } else {
        setError(response.data.message || "No se pudo enviar el mensaje");
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error al enviar el mensaje";
      setError(errorMessage);
      console.error("Error al enviar mensaje:", error.response?.data || error.message);
      return false;
    } finally {
      setSending(false);
    }
  };

  // Configurar listener para mensajes en tiempo real (simulado, requeriría implementación con websockets o similar)
  useEffect(() => {
    // Simulación de configuración de escucha en tiempo real
    // En un caso real, aquí se configuraría un WebSocket, Firebase, o similar
    
    // Limpiar al desmontar
    return () => {
      // Limpiar listener
    };
  }, [chat?.id]);

  return {
    chat,
    messages,
    loading,
    error,
    sending,
    createChat,
    getUserChats,
    sendMessage,
  };
};

export default ChatViewModel;