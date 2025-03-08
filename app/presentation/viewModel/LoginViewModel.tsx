import { useState } from "react";
import { AuthRepository } from "../../data/repositories/AuthRepository";

export const LoginViewModel = () => {
    const [email, setEmail] = useState<string>("");
    const [clave, setClave] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onChangeLogin = (field: string, value: string) => {
        if (field === "email") {
            setEmail(value);
        } else if (field === "clave") {
            setClave(value);
        }
    };

    const login = async () => {
        try {
            setIsLoading(true);
            console.log("Datos enviados al backend:", { email, clave });
            const loginResponse = await AuthRepository.login({ email, clave });
    
            // Ahora el token estaría correctamente disponible si login fue exitoso
            if (loginResponse.success && loginResponse.data && loginResponse.data.token) {
                console.log("Login exitoso");
                return true;
            } else {
                setErrorMessage(loginResponse.message || "Error al iniciar sesión.");
                return false;
            }
        } catch (error) {
            setErrorMessage("Hubo un problema al iniciar sesión.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };
    

    return {
        email,
        clave,
        onChangeLogin,
        login,
        errorMessage,
        isLoading,
    };
};