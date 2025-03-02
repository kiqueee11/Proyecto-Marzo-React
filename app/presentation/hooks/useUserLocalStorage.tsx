import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserLogin } from "../../domain/entities/User";

export const useUserLocalStorage = () => {
    const [user, setUser] = useState<UserLogin | null>(null);

    const getUserSession = async () => {
        try {
            const userData = await AsyncStorage.getItem("user");
            if (userData) setUser(JSON.parse(userData));
        } catch (error) {
            console.error("Error al obtener la sesión del usuario:", error);
        }
    };

    const clearUserSession = async () => {
        try {
            await AsyncStorage.removeItem("user");
            setUser(null);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    useEffect(() => {
        getUserSession();
    }, []);

    return { user, getUserSession, clearUserSession };
};