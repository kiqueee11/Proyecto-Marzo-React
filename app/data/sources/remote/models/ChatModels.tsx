export class Chat {
    id: number;
    user1Id: string;
    user2Id: string;
    user1Name: string;
    user2Name: string;
    user1Picture: string | null;
    user2Picture: string | null;
    user1Online: boolean;
    user2Online: boolean;
    isChatAnnonimous: boolean;
    user1wantsToRevealIdentity: boolean;
    user2wantstoRevealIdentity: boolean;
    chatId: string;    
    createdAt: Date;
  
    constructor(
      id: number,
      user1Id: string,
      user2Id: string,
      user1Name: string,
      user2Name: string,
      user1Picture: string | null,
      user2Picture: string | null,
      user1Online: boolean,
      user2Online: boolean,
      isChatAnnonimous: boolean,
      user1wantsToRevealIdentity: boolean,
      user2wantstoRevealIdentity: boolean,
      chatId: string,
      createdAt: Date
    ) {
      this.id = id;
      this.user1Id = user1Id;
      this.user2Id = user2Id;
      this.user1Name = user1Name;
      this.user2Name = user2Name;
      this.user1Picture = user1Picture;
      this.user2Picture = user2Picture;
      this.user1Online = user1Online;
      this.user2Online = user2Online;
      this.isChatAnnonimous = isChatAnnonimous;
      this.user1wantsToRevealIdentity = user1wantsToRevealIdentity;
      this.user2wantstoRevealIdentity = user2wantstoRevealIdentity;
      this.chatId = chatId;
      this.createdAt = createdAt;
    }
  
    // Método para actualizar la última actividad
    updateActivity(user1Online: boolean, user2Online: boolean) {
      this.user1Online = user1Online;
      this.user2Online = user2Online;
    }
  }
  
  // Método para transformar la respuesta del backend en un objeto Chat
  export const fromApiResponse = (data: any): Chat => {
    return new Chat(
      data.id,
      data.user1Id,
      data.user2Id,
      data.user1Name,
      data.user2Name,
      data.user1Picture,
      data.user2Picture,
      data.user1Online,
      data.user2Online,
      data.isChatAnnonimous,
      data.user1wantsToRevealIdentity,
      data.user2wantstoRevealIdentity,
      data.chatId,
      new Date(data.createdAt),
    );
  };
  
  export default Chat;