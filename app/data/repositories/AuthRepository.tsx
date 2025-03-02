import axios from "axios";
import { UserRegisterInterface, UserLoginInterface } from "../../domain/entities/User";

const API_URL = "https://tu-api.com/auth"; // Cambia esto por tu URL real

export const AuthRepository = {
    register: async (userData: UserRegisterInterface) => {
        try {
            const response = await axios.post(`${API_URL}/register`, userData);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, message: "Error en el registro" };
        }
    },

    login: async (credentials: UserLoginInterface) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, message: "Credenciales incorrectas" };
        }
    },
};