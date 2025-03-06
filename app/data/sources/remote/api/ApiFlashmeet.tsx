import axios from 'axios';

// Crear instancia de Axios con la URL del backend
const ApiFlashmeet = axios.create({
    baseURL: 'http://10.0.2.2:8089/auth', // Solo la base del backend
    timeout: 10000 // Tiempo de espera de 10 segundos
});

// Interceptor de respuesta para manejar errores
ApiFlashmeet.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);

        if (error.response) {
            // La solicitud fue enviada y el servidor respondió con un código de error
            console.error('Error data:', error.response.data);
            console.error('Error status:', error.response.status);
            return Promise.reject({
                success: false,
                message: error.response.data.message || 'Error en la solicitud',
                status: error.response.status,
                data: error.response.data
            });
        } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta del servidor
            console.error('No response received:', error.request);
            return Promise.reject({
                success: false,
                message: 'No se recibió respuesta del servidor. Verifica tu conexión.',
            });
        } else {
            // Algo falló antes de que se enviara la solicitud
            console.error('Request error:', error.message);
            return Promise.reject({
                success: false,
                message: 'Error al procesar la solicitud.',
                error: error.message
            });
        }
    }
);

export { ApiFlashmeet };
