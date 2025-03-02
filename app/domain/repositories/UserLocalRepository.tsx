import {UserLogin, UserLoginInterface} from "../entities/User";


export interface UserLocalRepository {
    save(user: UserLoginInterface): Promise<void>;
    getUser(): Promise<UserLoginInterface | null>;
    deleteItem(): Promise<void>;
}