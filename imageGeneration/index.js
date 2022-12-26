import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_TOKEN,
});

class Client {
  openai = new OpenAIApi(configuration);

  async generateImage(desc) {
    return await this.openai
      .createImage({
        prompt: desc,
        n: 1,
        size: "1024x1024",
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
  }
}

export default Client;
