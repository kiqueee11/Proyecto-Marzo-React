import { ApiFlashmeet } from '../../../data/sources/remote/api/ApiFlashmeet';
import { UserLoginInterface } from '../../../domain/entities/User';
import qs from 'qs'; // Importa qs

export const loginAuthUseCase = async (values: UserLoginInterface) => {
    try {
        // Formatear los datos correctamente en x-www-form-urlencoded
        const formData = qs.stringify({
            email: values.email,
            clave: values.clave,
        });

        // Realizar la solicitud con el formato correcto usando fetch
        const response = await fetch(ApiFlashmeet.defaults.baseURL + "/auth/iniciarSesion", {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
        });

        // Verificar si la respuesta fue exitosa (status 2xx)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error desconocido');
        }

        const data = await response.json();

        // Agregar console.log para confirmar que la conexión fue exitosa
        console.log("Login exitoso, respuesta del servidor:", data);

        return { success: true, data };
    } catch (error: unknown) {
        console.error("Error en loginAuthUseCase:", error);

        // Verificar el tipo de error y su mensaje
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }

        return { success: false, message: "Error en la conexión al servidor. Intenta más tarde." };
    }
};
