import "dotenv/config";
import express from "express";
import client, { Counter } from "prom-client";

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();

register.setDefaultLabels({
  service: "test_api",
});
collectDefaultMetrics({ register });

const cc = new Counter({
  name: "home_hits",
  help: "this is a counter",
  labelNames: ["home_hits"],
  registers: [register],
});

const app = express();

app.get("/", (_, res) => {
  cc.inc();
  return res.json({
    message: "hello world",
    addition: "I was added to test deployments",
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);

  console.log(await register.metrics());
  res.end(await register.metrics());
});

app.listen(process.env.PORT, (_) => {
  console.log("The App Server is running");
});
