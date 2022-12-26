import { ChatGPTAPIBrowser } from "chatgpt";
import * as dotenv from "dotenv";
dotenv.config();

class Client {
  api = new ChatGPTAPIBrowser({
    email: process.env.OPENAI_EMAIL,
    password: process.env.OPENAI_PASS,
  });
  lastMessage = {};
  conversationId = "";
  parentMessageId = "";
  constructor() {
    this.initiate();
  }
  async initiate() {
    await this.api.initSession();
  }
  async message(mes) {
    const options =
      this.conversationId === ""
        ? {}
        : {
            conversationId: this.conversationId,
            parentMessageId: this.parentMessageId,
          };
    if (mes == "!!") {
      return this.lastMessage;
    }
    console.log(options);
    return await this.api
      .sendMessage(mes, options)
      .then((a) => {
        console.log(a);
        this.conversationId = a.conversationId;
        this.parentMessageId = a.messageId;
        this.lastMessage = a;
        return a;
      })
      .catch(console.error);
  }
  async closeSession() {
    api.closeSession();
  }
}

export default Client;
