
import { UserLocalRepositoryImpl } from "../../../data/repositories/UserLocalRepository";
import { UserLoginInterface } from "../../entities/User";

const userLocalRepository = new UserLocalRepositoryImpl();

export const loginAuthUseCase = async (credentials: UserLoginInterface) => {
    const storedUser = await userLocalRepository.getUser();

    if (!storedUser) {
        return { success: false, message: "Usuario no encontrado" };
    }

    // Validar credenciales (incluyendo el usuario por defecto "admin / admin")
    if (
        (credentials.email === storedUser.email && credentials.password === storedUser.password) ||
        (credentials.email === "Admin" && credentials.password === "Admin")
    ) {
        return { success: true, data: storedUser };
    } else {
        return { success: false, message: "Credenciales incorrectas" };
    }
};