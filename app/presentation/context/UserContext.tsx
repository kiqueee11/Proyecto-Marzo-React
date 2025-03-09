import React, { createContext, useContext, useState } from "react";
import { GetDataRepository } from "../../domain/repositories/GetDataRepository";

export interface Usuario {
    fotos?: any;
    userId?: string;
    userName: string;
    edad: number;
    sexo: string;
    descripcion: string;
}

interface UserContextProps {
    usuario: Usuario | null;
    loading: boolean;  // Para gestionar el estado de carga
    error: string | null;  // Para gestionar el error
    cargarUsuario: (userId: string) => Promise<void>;
    limpiarUsuario: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState<boolean>(false);  // Estado de carga
    const [error, setError] = useState<string | null>(null);  // Estado de error

    const cargarUsuario = async (userId: string) => {
        setLoading(true);  // Empieza a cargar
        setError(null);  // Limpiar el error previo
        try {
            const datos = await GetDataRepository.obtenerDatosUsuario(userId);
            if (datos) {
                setUsuario(datos);
            } else {
                setError("No se pudieron obtener los datos del usuario");
            }
        } catch (err) {
            setError("Ocurrió un error al obtener los datos");
            console.error(err);
        } finally {
            setLoading(false);  // Finaliza la carga
        }
    };

    const limpiarUsuario = () => {
        setUsuario(null);
    };

    return (
        <UserContext.Provider value={{ usuario, loading, error, cargarUsuario, limpiarUsuario }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser debe estar dentro de un UserProvider");
    }
    return context;
};
