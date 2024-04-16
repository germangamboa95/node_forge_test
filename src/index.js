import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (_, res) => {
  return res.json({
    message: "hello world",
    addition: "I was added to test deployments",
  });
});

app.listen(process.env.PORT, (_) => {
  console.log("The App Server is running");
});
