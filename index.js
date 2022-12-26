import express from "express";
import bodyParser from "body-parser";
import TextClient from "./textGeneration/index.js";
import ImageClient from "./imageGeneration/index.js";

const router = express.Router({ port: 3000 });
const app = express();
const textGeneration = new TextClient();
const imageGeneration = new ImageClient();

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.static("static"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post("/story", async ({ body }, res) => {
  console.log(body);
  const textResponse = await textGeneration.message(body.story);
  res.send(textResponse);
});

router.post("/image", async ({ body }, res) => {
  console.log(body);
  const textResponse = await imageGeneration.generateImage(body.desc);
  res.send(textResponse);
});

app.use("/", router);
process.on("exit", () => {
  textGeneration.closeSession();
});

app.listen(3000, () => console.log("app listening on port 3000"));
