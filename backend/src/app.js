import express from "express";
import cors from "cors";

console.log("A. app.js se está ejecutando");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API de Gestor de Misiones Espaciales funcionando correctamente"
  });
});

export default app;