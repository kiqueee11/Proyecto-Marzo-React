import { useState } from "react";
import { IUser } from "../../domain/entities/User";
import { ApiFlashmeet } from "../../data/sources/remote/api/ApiFlashmeet";
import authStorage from "../../data/sigletons/authDataSingleton";
import { ApiResponse } from "../../domain/entities/ApiInterface";

const useMeetViewModel = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Obtener el token JWT del almacenamiento (usando el singleton de authStorage)
  const token = authStorage.getToken(); // Aquí obtienes el token
  console.log("Token obtenido:", token);

  const fetchUsersByPosition = async (): Promise<void> => {
    if (!token) {
      console.error("❌ No se encontró el token de autenticación.");
      return;
    }

    setLoading(true);

    try {
      // Usar la posición fija '40.4168,-3.7038' para la solicitud
      const posicion = '40.4168,-3.7038';  // Posición estática
      const distancia = 1000;  // Distancia en metros

      try {
        // Realizar la solicitud al servidor con la posición y distancia
        const response = await ApiFlashmeet.post<ApiResponse>(
          "userservice/users/buscarusuarioporposicion",
          {
            posicion,  // Usar la posición fija
            distancia,  // Distancia en metros
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,  // Asegúrate de incluir el token en los encabezados
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        console.log("Respuesta del servidor:", response.data);

        // Verificar si la respuesta es exitosa y procesar los datos
        if (response.data.statusCode === 200) {
          setUsers(response.data.data);
        } else {
          console.error("No se encontraron usuarios:", response.data.message);
          throw new Error(response.data.message || "No se encontraron usuarios");
        }
      } catch (error: any) {
        console.error("Error en la solicitud:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error al obtener los usuarios");
      } finally {
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Error inesperado:", error.message);
      setLoading(false);
      throw new Error("Ocurrió un error inesperado");
    }
  };

  return { users, loading, fetchUsersByPosition };
};

export default useMeetViewModel;