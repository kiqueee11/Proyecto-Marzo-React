import { useState } from "react";
import { RegisterAuthUseCase } from "../../domain/useCases/auth/RegisterAuth";
import { UserRegisterInterface } from "../../domain/entities/User";

// Función para formatear la fecha de nacimiento
const formatFechaNacimiento = (fecha: string): string => {
    const [day, month, year] = fecha.split('-'); // Dividir la fecha por el guion
    // Retornar la fecha en el formato deseado
    return `${year}-${month}-${day}T10:30:30Z`;
};

export const RegisterViewModel = () => {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [fieldErrors, setFieldErrors] = useState<any>({});
    const [values, setValues] = useState<UserRegisterInterface>({
        nombre: "",
        clave: "",
        repeatClave: "",
        email: "",
        imagenes: [],  // Ahora es un array vacío que se llenará con las URIs de las imágenes
        sexo: "",
        posicion: "",
        fechaNacimiento: "",
        descripcion: "",
        distancia: ""
    });

    const onChangeRegister = (property: keyof UserRegisterInterface, value: any) => {
        setValues({ ...values, [property]: value });
    };

    const register = async () => {
        if (validateForm()) {
            try {
                // Formateamos la fecha de nacimiento
                const formattedValues = {
                    ...values,
                    fechaNacimiento: formatFechaNacimiento(values.fechaNacimiento)
                };

                const response = await RegisterAuthUseCase(formattedValues);
                console.log("RESULTADO: ", response);

                if (!response.success) {
                    setErrorMessage(response.message || "Error en el registro");
                }
                
                return response;
            } catch (error) {
                setErrorMessage("Error al registrar.");
                console.error("Error al registrar:", error);
                return { success: false, message: "Error al registrar." };
            }
        }
        return { success: false, message: "Formulario inválido" };
    };

    const validateForm = (): boolean => {
        const errors: any = {};

        if (!values.nombre.trim()) {
            errors.nombre = "El nombre de usuario es obligatorio";
        }
        if (!values.email.trim()) {
            errors.email = "El correo es obligatorio";
        }
        if (!values.clave.trim()) {
            errors.clave = "La contraseña es obligatoria";
        }        
        if (values.clave !== values.repeatClave) {
            errors.repeatClave = "Las contraseñas no coinciden";
        }
        if (!["HOMBRE", "MUJER"].includes(values.sexo)) {
            errors.sexo = "Debe seleccionar un sexo válido";
        }
        if (!values.posicion) {
            errors.posicion = "Debe ingresar una ciudad o coordenadas";
        }
        if (!values.fechaNacimiento.trim()) {
            errors.fechaNacimiento = "Debe ingresar una fecha de nacimiento";
        }
        if (!values.descripcion.trim()) {
            errors.descripcion = "Debe ingresar una descripción";
        }
        if (typeof values.distancia !== 'string' || !values.distancia.trim() || isNaN(Number(values.distancia)) || Number(values.distancia) <= 0) {
            errors.distancia = "Debe ingresar una distancia válida en metros";
        }

        // Validación modificada para imágenes
        if (!values.imagenes || values.imagenes.length < 1) {
            errors.image = "Debe proporcionar al menos una imagen";
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setErrorMessage("Hay errores en el formulario");
            return false;
        }

        setErrorMessage("");
        setFieldErrors({});
        return true;
    };

    return {
        ...values,
        onChangeRegister,
        register,
        errorMessage,
        fieldErrors
    };
};