import { ApiFlashmeet } from "../sources/remote/api/ApiFlashmeet";
import { AuthRepository } from "./AuthRepository";
import { ApiResponse } from "../../domain/entities/ApiInterface";

// Interfaz para los datos del usuario
export interface UserData {
    userName: string;
    edad: number;
    sexo: string;
    descripcion: string;
    fotos: string[];
    userId?: string;
    // Otros campos que pueda devolver la API
}

export class UserRepository {
    static async obtenerDatosUsuario(): Promise<UserData | null> {
        try {
            // Obtener el token y email almacenados
            const token = await AuthRepository.obtenerToken();
            const email = await AuthRepository.obtenerEmail();
            
            if (!token || !email) {
                console.log("No hay token o email disponible. El usuario debe iniciar sesión primero.");
                return null;
            }

            // Utilizar la ruta correcta según tu API
            const response = await ApiFlashmeet.get<ApiResponse>(`/users/internal/get-user-by-email`, {
                params: { email },
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json" 
                },
            });

            // Verificar si la respuesta es correcta
            if (response.data && response.data.success && response.data.data) {
                const data = response.data.data;
                
                // Extraer las imágenes y filtrar las que no existan
                const fotos = [];
                for (let i = 1; i <= 6; i++) {
                    if (data[`image${i}`]) {
                        fotos.push(data[`image${i}`]);
                    }
                }

                return {
                    userName: data.nombre || "Usuario",
                    edad: data.edad || 0,
                    sexo: data.sexo || "No especificado",
                    descripcion: data.descripcion || "",
                    fotos: fotos,
                    userId: data.userId || data.id || ""
                };
            } else {
                console.error("Respuesta inesperada del backend:", response.data);
                return null;
            }
        } catch (error: any) {
            console.error("Error obteniendo datos del usuario:", error?.response?.data || error.message);
            return null;
        }
    }
    
    // Aquí podrías agregar más métodos relacionados con el usuario, como actualizar perfil, etc.
}