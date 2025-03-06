import {UserInterface, UserLoginInterface} from "../entities/User";
import {ApiFlashmeetResponse} from "../../data/sources/remote/models/ResponseApiFlashmeet";


export interface AuthRepository {
    register: (user: UserInterface) => Promise<ApiFlashmeetResponse>;
    login: (user: UserLoginInterface) => Promise<ApiFlashmeetResponse>;

}