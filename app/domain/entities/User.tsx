export interface UserLoginInterface {
    email: string;
    password: string;
}

export interface UserRegisterInterface {
    userName: string;
    email: string;
    password: string;
}

export interface UserLogin {
    id: string;
    userName: string;
    email: string;
    token: string;
}