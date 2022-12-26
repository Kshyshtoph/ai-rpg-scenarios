import { ChatGPTAPIBrowser } from "chatgpt";
import * as dotenv from "dotenv";
dotenv.config();

class Client {
  api = new ChatGPTAPIBrowser({
    email: process.env.OPENAI_EMAIL,
    password: process.env.OPENAI_PASS,
  });
  conversationId = "";
  parentMessageId = "";
  constructor() {
    this.initiate();
  }
  async initiate() {
    // use puppeteer to bypass cloudflare (headful because of captchas)
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
    console.log(options);
    return await this.api
      .sendMessage(mes, options)
      .then((a) => {
        console.log(a);
        this.conversationId = a.conversationId;
        this.parentMessageId = a.messageId;
        return a;
      })
      .catch(console.error);
  }
  async closeSession() {
    api.closeSession();
  }
}

export default Client;
