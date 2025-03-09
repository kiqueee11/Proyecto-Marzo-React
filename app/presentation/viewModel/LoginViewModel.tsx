import { useState } from "react";
import { AuthRepository } from "../../data/repositories/AuthRepository";
import { useUser } from "../context/UserContext";

export const LoginViewModel = () => {
    const [email, setEmail] = useState<string>("");
    const [clave, setClave] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { cargarUsuario } = useUser(); // Usamos el contexto para almacenar datos del usuario

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
    
            if (loginResponse.success && loginResponse.data?.userId) {
                console.log("Login exitoso, obteniendo datos del usuario...");
                
                await cargarUsuario(loginResponse.data.userId); // Carga los datos en UserContext
                
                return true; // Retorna true si el login es exitoso
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
