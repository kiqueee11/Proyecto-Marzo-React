const BASE_URL = "https://10.0.2.2:8089"; // Reemplaza con tu URL real

const apiCall = async (endpoint: string, method: string = "GET", body?: any, headers: any = {}) => {
  try {
    const token = await getToken(); // Obtén el token si es necesario
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error en la petición");
    }

    return data;
  } catch (error) {
    console.error("Error en apiCall:", error);
    throw error;
  }
};

// Función para obtener el token (ajústala según tu implementación de autenticación)
const getToken = async () => {
  // Implementa la lógica para recuperar el token de almacenamiento local o contexto
  return "tu_token_aqui"; // Reemplaza esto con la obtención real del token
};

export default apiCall;