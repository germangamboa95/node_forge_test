import "dotenv/config";
import express from "express";
import client from "prom-client";

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

const app = express();

app.get("/", (_, res) => {
  return res.json({
    message: "hello world",
    addition: "I was added to test deployments",
  });
});

app.get("/metrics", (req, res) => {
  res.set("Content-Type", Prometheus.register.contentType);
  res.end(Prometheus.register.metrics());
});

app.listen(process.env.PORT, (_) => {
  console.log("The App Server is running");
});
