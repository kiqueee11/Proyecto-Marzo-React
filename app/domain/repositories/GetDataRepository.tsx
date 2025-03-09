import { AuthRepository } from "../../data/repositories/AuthRepository";
import { ApiFlashmeet } from "../../data/sources/remote/api/ApiFlashmeet";
import { ApiResponse, UserDataResponse } from "../entities/ApiInterface";

// Helper function to convert byte array to base64
const byteArrayToBase64 = (byteArray: Uint8Array): string => {
    let binary = '';
    for (let i = 0; i < byteArray.byteLength; i++) {
        binary += String.fromCharCode(byteArray[i]);
    }
    return window.btoa(binary);
};

interface UserData {
    userName: string;
    edad: number;
    sexo: string;
    descripcion: string;
    imagenes: string[];
    imagenesBase64: string[];
}

export class GetDataRepository {
    static async obtenerDatosUsuario(userId: string): Promise<UserData | null> {
        try {
            let token = await AuthRepository.obtenerToken();
            console.debug("🔑 Token obtenido:", token);

            if (!token) {
                console.error("❌ No se pudo obtener un token válido.");
                return null;
            }

            console.debug("📩 Enviando solicitud para obtener datos del usuario:", userId);
            const response = await ApiFlashmeet.post<ApiResponse<UserDataResponse>>(
                "userservice/users/get-user-data",
                { userId },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.debug("✅ Respuesta del servidor:", JSON.stringify(response.data));

            if (!response.data.success || !response.data.data) {
                console.error("❌ Datos del usuario no disponibles en la respuesta.");
                return null;
            }

            const userData = response.data.data;

            // Calcular la edad
            let edad = 0;
            if (userData.fechaNacimiento) {
                const birthDate = new Date(userData.fechaNacimiento);
                const today = new Date();
                edad = today.getFullYear() - birthDate.getFullYear();
                if (today.getMonth() < birthDate.getMonth() || 
                    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
                    edad--;
                }
            }

            // Obtener imágenes
            const imagenes = [
                userData.imagen1, userData.imagen2, userData.imagen3,
                userData.imagen4, userData.imagen5, userData.imagen6
            ].filter(Boolean); // Filtra nulos o vacíos

            // Crear objeto con datos del usuario
            const usuario: UserData = {
                userName: userData.nombre,
                edad,
                sexo: userData.sexo,
                descripcion: userData.descripcion || "Descripción no disponible",
                imagenes,
                imagenesBase64: []
            };

            // Cargar imágenes en base64
            for (let i = 0; i < usuario.imagenes.length; i++) {
                const fileName = usuario.imagenes[i];
                console.debug(`📷 Obteniendo imagen: ${fileName}`);

                try {
                    const imageResponse = await ApiFlashmeet.post(
                        '/mediaserver/media/get-media',
                        null,
                        {
                            params: { fileName },
                            headers: {
                                "Authorization": `Bearer ${token}`,
                                "Content-Type": "application/json"
                            },
                            responseType: 'arraybuffer',
                        }
                    );

                    // Convertir la imagen a base64
                    const byteArray = new Uint8Array(imageResponse.data as ArrayBuffer);
                    const base64 = byteArrayToBase64(byteArray);
                    usuario.imagenesBase64.push(`data:image/jpeg;base64,${base64}`);

                    console.debug(`✅ Imagen ${i + 1} cargada correctamente.`);
                } catch (error: any) {
                    console.error(`❌ Error al obtener la imagen ${i + 1}:`, error);
                    
                    // Si es error 401, intenta refrescar el token y reintentar
                    if (error.response?.status === 401) {
                        console.warn("⚠️ Token inválido, intentando refrescar...");
                        token = await AuthRepository.obtenerToken(); // Intentamos obtener un nuevo token
                        if (token) {
                            console.debug("🔄 Nuevo token obtenido, reintentando...");
                            i--; // Reintentar la misma imagen
                        } else {
                            console.error("❌ No se pudo refrescar el token.");
                            break;
                        }
                    }
                }
            }

            console.log("🎯 Datos del usuario cargados:", JSON.stringify(usuario));
            return usuario;
        } catch (error: any) {
            console.error("❌ Error obteniendo datos del usuario:", error);
            if (error.response) {
                console.error("📡 Error data:", JSON.stringify(error.response.data));
                console.error("📡 Error status:", error.response.status);
            }
            return null;
        }
    }
}
