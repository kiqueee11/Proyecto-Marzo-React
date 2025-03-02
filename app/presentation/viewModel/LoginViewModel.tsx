import { useState } from "react";
import { loginAuthUseCase } from "../../domain/useCases/auth/LoginAuth";
import { SaveUserUseCase } from "../../domain/useCases/userLocal/SaveUser";
import { useUserLocalStorage } from "../hooks/useUserLocalStorage";
import { UserLogin, UserLoginInterface } from "../../domain/entities/User";

export const LoginViewModel = () => {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [values, setValues] = useState<UserLoginInterface>({ email: "", password: "" });

    const { user, getUserSession } = useUserLocalStorage();

    const onChangeLogin = (property: keyof UserLoginInterface, value: string) => {
        setValues((prev) => ({ ...prev, [property]: value }));
    };

    const validateForm = (): boolean => {
        if (!values.email.trim()) {
            setErrorMessage("El correo es obligatorio");
            return false;
        }
        if (!values.password.trim()) {
            setErrorMessage("La contraseña es obligatoria");
            return false;
        }
        return true;
    };

    const login = async () => {
        if (!validateForm()) return;

        const response = await loginAuthUseCase(values);
        if (!response.success) {
            setErrorMessage(String(response.message || "Ocurrió un error desconocido."));
        } else {
            await SaveUserUseCase(response.data as UserLogin);
            getUserSession();
        }
    };

    return {
        ...values,
        onChangeLogin,
        login,
        errorMessage,
        user,
    };
};