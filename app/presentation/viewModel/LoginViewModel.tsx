import { useState } from "react";
import { loginAuthUseCase } from "../../domain/useCases/auth/LoginAuth";

export function LoginViewModel() {
    const [email, setEmail] = useState("");
    const [clave, setClave] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onChangeLogin = (field: string, value: string) => {
        if (field === "email") setEmail(value);
        if (field === "clave") setClave(value);
    };

    const login = async (): Promise<boolean> => {
        setIsLoading(true);
        try {
            const response = await loginAuthUseCase({ email, clave });
            if (response.success) {
                setIsLoading(false);
                
                // Agregar un console.log para mostrar que el login fue exitoso
                console.log("Login exitoso, datos del usuario:", response.data);
                
                return true;
            } else {
                setErrorMessage(response.message || "Error desconocido");  // Aquí se setea el mensaje de error
                setIsLoading(false);
                return false;
            }
        } catch (error) {
            setErrorMessage("Error al iniciar sesión. Intenta nuevamente.");
            setIsLoading(false);
            return false;
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
}
