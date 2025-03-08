import React, { createContext, useContext, useState, useEffect } from "react";
import { UserRepository, UserData } from "../../data/repositories/UserRepository";

interface UserContextType {
    user: UserData | null;
    loading: boolean;
    error: string | null;
    refreshUserData: () => Promise<void>; // Función para refrescar los datos
    updateUser: (userData: Partial<UserData>) => void; // Actualizar datos localmente
}

// Crear contexto con un valor inicial
const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Función para cargar los datos del usuario
    const fetchUserData = async () => {
        try {
            setLoading(true);
            setError(null);
            const userData = await UserRepository.obtenerDatosUsuario();
            setUser(userData);
        } catch (error) {
            setError("Error al obtener los datos del usuario.");
            console.error("Error al cargar datos:", error);
        } finally {
            setLoading(false);
        }
    };

    // Función para actualizar datos del usuario localmente
    const updateUser = (userData: Partial<UserData>) => {
        setUser(prevUser => prevUser ? { ...prevUser, ...userData } : null);
    };

    // Cargar datos al montar el componente
    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider 
            value={{ 
                user, 
                loading, 
                error, 
                refreshUserData: fetchUserData,
                updateUser 
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

// Hook personalizado para acceder al contexto del usuario
export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser debe utilizarse dentro de un UserProvider");
    }
    return context;
}