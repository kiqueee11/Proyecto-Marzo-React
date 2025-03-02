import { AuthRepository } from "../../../data/repositories/AuthRepository";
import { UserRegisterInterface } from "../../entities/User";

export const RegisterAuthUseCase = async (userData: UserRegisterInterface) => {
    try {
        const response = await AuthRepository.register(userData);
        return response;
    } catch (error) {
        return { success: false, message: "Error en el registro" };
    }
};