import express from "express";
import bodyParser from "body-parser";
import Client from "./textGeneration/index.js";

const router = express.Router({ port: 3000 });
const app = express();
const textGeneration = new Client();

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.static("static"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post("/story", async ({ body }, res) => {
  console.log(body);
  const openAPIResponse = await textGeneration.message(body.story);
  res.send(openAPIResponse);
});

app.use("/", router);
process.on("exit", () => {
  textGeneration.closeSession();
});

app.listen(3000, () => console.log("app listening on port 3000"));
