class AuthStorage {
    private static instance: AuthStorage;
    private tokenId: string | null = null;
    private userId: string | null = null;
  
    private constructor() {}
  
    public static getInstance(): AuthStorage {
      if (!AuthStorage.instance) {
        AuthStorage.instance = new AuthStorage();
      }
      return AuthStorage.instance;
    }
  
    public setAuthData(token: string, user: string): void {
      this.tokenId = token;
      this.userId = user;
    }
  
    public getToken(): string | null {
      return this.tokenId;
    }
  
    public getUserId(): string | null {
      return this.userId;
    }
  
    public clear(): void {
      this.tokenId = null;
      this.userId = null;
    }
  }
  
  export default AuthStorage.getInstance(); 