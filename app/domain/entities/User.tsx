export interface UserLoginInterface {
    email: string;
    clave: string;
    errorMessage?: string;
}

export interface UserLogin {
    userId: number;       // ID del usuario autenticado
    token: string;        // Token de acceso (JWT)
    refreshToken: string; // Token para renovar sesión
}
export interface UserRegisterInterface {
    nombre: string;
    clave: string;
    email: string;
    sexo: string;
    descripcion: string;
    fechaNacimiento: string;
    posicion: string;
    distancia: string | number;
    imagenes?: string[]; // Añade esta propiedad como opcional con el tipo correcto
    repeatClave?: string; // Opcional si es necesario
}

export interface UserInterface {
    id: string;
    userName: string;
    email: string;
    clave: string;
}