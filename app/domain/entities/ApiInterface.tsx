
export interface ApiResponse {
  refreshToken: any;
  userId: any;
  success: boolean;
  token?: string; 
  data: {
    id?: string;
    userId?: string;
    [key: string]: any;
  };
  message?: string;
}