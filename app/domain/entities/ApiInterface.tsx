// En ApiInterface.ts o donde tengas tus interfaces de API
export interface ApiResponse<T = any> {
  data: T | any;
  errorCode?: string;
  message: string;
  statusCode: number;
  statusDescripcion: string;
  success: boolean;
}

// Define la estructura de datos de usuario que esperas del backend
export interface UserDataResponse {
  nombre: string;
  idUsuario: string;
  sexo: string;
  fechaNacimiento: string; // O Date, dependiendo de cómo lo manejes
  descripcion: string;
  imagenes: string[];
}
// Definir la interfaz para la respuesta de la API
// Definición de ApiResponse con una estructura esperada
export interface ApiResponseMedia {
  mediaUrl?: string;
  path?: string;
  fileUrl?: string;
  location?: string;
  success?: boolean;
  message?: string;
  url?: string;
  data?: {
    files?: Array<{
      imageUrl?: string;
    }>;
  };
}


