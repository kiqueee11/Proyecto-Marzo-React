import { UserLoginInterface, UserRegisterInterface } from "../../domain/entities/User";
import { ApiFlashmeet, ApiMediaController } from "../sources/remote/api/ApiFlashmeet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  ApiResponseMedia, ApiResponse } from "../../domain/entities/ApiInterface";
import qs from "qs";
import { GetDataRepository } from "../../domain/repositories/GetDataRepository";
import { Platform } from "react-native";
import AuthStorage from "../sigletons/authDataSingleton";




export const AuthRepository = {
    register: async (userData: UserRegisterInterface) => {
        try {
            const formData = new FormData();
            
            // Configura el formData como ya lo tienes
            formData.append("nombre", userData.nombre);
            formData.append("clave", userData.clave);
            formData.append("email", userData.email);
            formData.append("sexo", userData.sexo);
            formData.append("descripcion", userData.descripcion);
            formData.append("fechaNacimiento", userData.fechaNacimiento);
            formData.append("posicion", userData.posicion);
            formData.append("distancia", userData.distancia.toString());
    
            if (Array.isArray(userData.imagenes)) {
                userData.imagenes.forEach((uri, index) => {
                    if (index < 6) {
                        const uriParts = uri.split('/');
                        const fileName = uriParts[uriParts.length - 1];
    
                        formData.append(`image${index + 1}`, {
                            uri: uri,
                            type: 'image/jpeg',
                            name: fileName,
                        } as any);
                    }
                });
            }
    
            // Hacer la petición al backend para el registro
            const response = await ApiFlashmeet.post<ApiResponse>('/auth/auth/signup', formData, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json"
                }
            });
    
            if (response.data && response.data.success) {
                console.log("✅ Registro exitoso:", response.data);   
                return { success: true, data: response.data };
            }else{
    
            return { success: false, message: "Error en el registro" };
            }
        } catch (error: any) {
            console.error("Error al registrar:", error);
            return { success: false, message: "Error en el registro" };
        }
    },   

    login: async (credentials: UserLoginInterface) => { 
        try {
            const formData = qs.stringify({
                email: credentials.email,
                clave: credentials.clave
            });
            
            console.log("FormData enviado:", formData);
            
            const response = await ApiFlashmeet.post<ApiResponse>("/auth/auth/iniciarSesion", formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });
    
            console.log("Respuesta del servidor:", response.data);
    
            // Verifica la estructura correcta de la respuesta
            if (response.data.success && response.data.data && response.data.data.token) {
                // Guardar el token y el userId
                await AsyncStorage.setItem("userToken", response.data.data.token);
                await AsyncStorage.setItem("userEmail", credentials.email);
                await AsyncStorage.setItem("userId", response.data.data.userId);
                console.log("Login exitoso, token guardado:", response.data.data.token);
                console.log("UserId guardado:", response.data.data.userId);
                AuthStorage.setAuthData(response.data.data.token, response.data.data.userId); 
                return { success: true, data: response.data.data };
            } else {
                console.log("Fallo en la autenticación:", response.data);
                return { success: false, message: "Error en la autenticación" };
            }
        } catch (error: any) {
            console.error("Error durante el login:", error);
            if (error.isAxiosError) {
                console.log("Detalles del error de Axios:", error.response?.data);
            }
            return { success: false, message: "Error al iniciar sesión" };
        }
    },
    // Método para obtener el token almacenado
    obtenerToken: async (): Promise<string | null> => { 
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                console.warn("No se encontró el token en AsyncStorage");
            }
            return token;
        } catch (error) {
            console.error("Error obteniendo el token:", error);
            return null;
        }
    },

    // Método para obtener el email almacenado
    obtenerEmail: async (): Promise<string | null> => { 
        try {
            const email = await AsyncStorage.getItem("userEmail");
            if (!email) {
                console.warn("No se encontró el email en AsyncStorage");
            }
            return email;
        } catch (error) {
            console.error("Error obteniendo el email:", error);
            return null;
        }
    },
    // Agregar método para obtener el userId
    obtenerUserId: async (): Promise<string | null> => { 
        try {
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) {
                console.warn("No se encontró el userId en AsyncStorage");
            }
            return userId;
        } catch (error) {
            console.error("Error obteniendo el userId:", error);
            return null;
        }
    },
    // Método para actualizar la imagen de perfil
    actualizarImagenPerfil(imagenUrl: string) {
        try {
            AsyncStorage.setItem("profileImage", imagenUrl);
            console.log("Imagen de perfil actualizada:", imagenUrl);
        } catch (error) {
            console.error("Error actualizando la imagen de perfil:", error);
        }
    },
    
    // Método para cerrar sesión (limpiar datos)
    logout: async () => {
        try {
            await AsyncStorage.removeItem("userToken");
            await AsyncStorage.removeItem("userEmail");
            await AsyncStorage.removeItem("profileImage");
            console.log("Sesión cerrada y datos eliminados de AsyncStorage");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    }
};
