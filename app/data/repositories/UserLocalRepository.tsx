import { UserLogin, UserLoginInterface } from "../../domain/entities/User";
import { UserLocalRepository } from "../../domain/repositories/UserLocalRepository";
import { LocalStorage } from "../sources/local/LocalStorage";

export class UserLocalRepositoryImpl implements UserLocalRepository {
    async save(user: UserLoginInterface): Promise<void> {
        const { save } = LocalStorage();
        save("flashmeet_usuario", JSON.stringify(user));
    }

    async getUser(): Promise<UserLoginInterface | null> {
        const { getItem } = LocalStorage();
        const data = await getItem("flashmeet_usuario");

        if (data) {
            return JSON.parse(data) as UserLoginInterface;
        }

        // Si no hay usuario guardado, devolver un usuario admin por defecto
        return {
            email: "Admin",
            password: "Admin",
        };
    }

    async deleteItem(): Promise<void> {
        const { deleteItem } = LocalStorage();
        await deleteItem("flashmeet_usuario");
    }
}