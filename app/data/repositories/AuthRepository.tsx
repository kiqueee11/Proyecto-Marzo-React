import { UserRegisterInterface, UserLoginInterface } from "../../domain/entities/User";
import { ApiFlashmeet } from "../sources/remote/api/ApiFlashmeet";
import qs from "qs"; // Importa qs para formatear los datos en x-www-form-urlencoded

export const AuthRepository = {
    register: async (userData: UserRegisterInterface) => {
        try {
            const formData = new FormData();

            // Añadir datos al FormData
            formData.append("nombre", userData.nombre);
            formData.append("clave", userData.clave);
            formData.append("email", userData.email);
            formData.append("sexo", userData.sexo);
            formData.append("descripcion", userData.descripcion);
            formData.append("fechaNacimiento", userData.fechaNacimiento);
            formData.append("posicion", userData.posicion);
            formData.append("distancia", userData.distancia.toString());

            // Manejo de imágenes en React Native
            if (Array.isArray(userData.imagenes)) {
                userData.imagenes.forEach((uri, index) => {
                    if (uri) {
                        const uriParts = uri.split('/');
                        const fileName = uriParts[uriParts.length - 1];

                        // En React Native, el objeto debe pasarse con `any` para evitar errores de tipo
                        formData.append(`image${index + 1}`, {
                            uri: uri,
                            type: 'image/jpeg', 
                            name: fileName
                        } as any);
                    }
                });
            }

            console.log('URL completa:', ApiFlashmeet.defaults.baseURL + '/auth/signup');
            console.log('Total de imágenes adjuntas:', userData.imagenes ? userData.imagenes.length : 0);

            // Enviar petición al backend
            const response = await ApiFlashmeet.post('/auth/signup', formData, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json"
                }
            });

            return { success: true, data: response.data };
        } catch (error: any) {
            console.error("Error al registrar:", error);
            if (error.isAxiosError) {
                console.error("Detalles del error:", error.response?.data);
                return { 
                    success: false, 
                    message: error.response?.data?.message || "Error en el registro",
                    error: error.response?.data
                };
            }
            return { success: false, message: "Error en el registro" };
        }
    },

    login: async (credentials: UserLoginInterface) => {
        try {
            // Convertir los datos a formato x-www-form-urlencoded
            const formData = qs.stringify({
                email: credentials.email,
                clave: credentials.clave
            });

            const response = await ApiFlashmeet.post("/auth/iniciarSesion", formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });

            return { success: true, data: response.data };
        } catch (error: any) {
            if (error.isAxiosError) {
                return { 
                    success: false, 
                    message: error.response ? "Credenciales incorrectas" : "Error de conexión",
                    error: error.response?.data
                };
            }
            return { success: false, message: "Error al iniciar sesión" };
        }
    },
};
