export interface IChat {
    chatId: string;
    user1_id: string;
    user2_id: string;
    createdAt: string;
    isRevealed: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    statusCode: number;
    data: T | null;
}