import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserLogin } from "../../entities/User";

export const SaveUserUseCase = async (user: UserLogin) => {
    try {
        await AsyncStorage.setItem("token", user.token);
        await AsyncStorage.setItem("refreshToken", user.refreshToken);
        await AsyncStorage.setItem("userId", user.userId.toString());
    } catch (error) {
        console.error("Error guardando los datos del usuario:", error);
    }
};