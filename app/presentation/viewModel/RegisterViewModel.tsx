import { useState } from "react";
import { RegisterAuthUseCase } from "../../domain/useCases/auth/RegisterAuth";

export const RegisterViewModel = () => {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [values, setValues] = useState({
        userName: "",
        email: "",
        password: "",
        repeatPassword: "",
    });

    const onChangeRegister = (property: keyof typeof values, value: string) => {
        setValues((prev) => ({ ...prev, [property]: value }));
    };

    const validateForm = (): boolean => {
        if (!values.userName.trim()) {
            setErrorMessage("El nombre de usuario es obligatorio");
            return false;
        }
        if (!values.email.trim()) {
            setErrorMessage("El correo es obligatorio");
            return false;
        }
        if (!values.password.trim()) {
            setErrorMessage("La contraseña es obligatoria");
            return false;
        }
        if (!values.repeatPassword.trim()) {
            setErrorMessage("Repetir la contraseña es obligatorio");
            return false;
        }
        if (values.password !== values.repeatPassword) {
            setErrorMessage("Las contraseñas no coinciden");
            return false;
        }
        return true;
    };

    const register = async () => {
        if (!validateForm()) return;

        const response = await RegisterAuthUseCase(values);
        console.log("RESULTADO:", JSON.stringify(response));
    };

    return {
        ...values,
        onChangeRegister,
        register,
        errorMessage,
    };
};