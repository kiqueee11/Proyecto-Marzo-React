import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserLogin } from "../../entities/User";

export const SaveUserUseCase = async (user: UserLogin) => {
    try {
        await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
        console.error("Error al guardar el usuario:", error);
    }
};