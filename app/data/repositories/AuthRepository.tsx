import { UserRegisterInterface, UserLoginInterface } from "../../domain/entities/User";
import { ApiFlashmeet } from "../sources/remote/api/ApiFlashmeet";
import qs from "qs";
import { ApiResponse } from "../../domain/entities/ApiInterface";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthRepository = {
    register: async (userData: UserRegisterInterface) => {
        try {
            const formData = new FormData();
    
            // Agregar datos al FormData
            formData.append("nombre", userData.nombre);
            formData.append("clave", userData.clave);
            formData.append("email", userData.email);
            formData.append("sexo", userData.sexo);
            formData.append("descripcion", userData.descripcion);
            formData.append("fechaNacimiento", userData.fechaNacimiento);
            formData.append("posicion", userData.posicion);
            formData.append("distancia", userData.distancia.toString());
    
            // Adjuntar imágenes al FormData
            if (Array.isArray(userData.imagenes)) {
                userData.imagenes.forEach((uri, index) => {
                    const uriParts = uri.split('/');
                    const fileName = uriParts[uriParts.length - 1];
    
                    formData.append(`image${index + 1}`, {
                        uri: uri,
                        type: 'image/jpeg',
                        name: fileName
                    } as any);
                });
            }
    
            const response = await ApiFlashmeet.post<ApiResponse>('/auth/signup', formData, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json"
                }
            });
    
            if (response.data && response.data.success) {
                console.log("✅ Registro exitoso:", response.data);

                // Guardar la primera imagen en AsyncStorage solo si existen imágenes
                if (Array.isArray(userData.imagenes) && userData.imagenes.length > 0) {
                    await AsyncStorage.setItem('profileImage', userData.imagenes[0]);
                    console.log("Imagen de perfil guardada en AsyncStorage:", userData.imagenes[0]);
                }
                return { success: true, data: response.data };

            }
    
            return { success: false, message: "Error en el registro" };
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
            
            const response = await ApiFlashmeet.post<ApiResponse>("/auth/iniciarSesion", formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });
    
            console.log("Respuesta del servidor:", response.data);
    
            // Verifica la estructura correcta de la respuesta
            if (response.data.success && response.data.data && response.data.data.token) {
                // Guardar el token que está dentro de data
                await AsyncStorage.setItem("userToken", response.data.data.token);
                await AsyncStorage.setItem("userEmail", credentials.email);
                console.log("Login exitoso, token guardado:", response.data.data.token);
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


    // Método para obtener los datos del usuario después del login
    obtenerDatosUsuario: async (email: string, token: string) => {
        try {
            const response = await ApiFlashmeet.get<ApiResponse>(`/users/internal/get-user-by-email?email=${email}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            if (response.data && response.data.success) {
                console.log("Datos del usuario obtenidos:", response.data);
                return response.data.data; // Deberías devolver los datos del usuario
            }

            throw new Error("No se pudieron obtener los datos del usuario");
        } catch (error) {
            console.error("Error obteniendo datos del usuario:", error);
            throw error;
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

function obtenerDatosUsuario(email: string, token: string) {
    throw new Error("Function not implemented.");
}
