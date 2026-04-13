import express from "express";
import cors from "cors";
import missionsRoutes from "./routes/missions.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API de Gestor de Misiones Espaciales funcionando correctamente"
  });
});

app.use("/api/missions", missionsRoutes);

export default app;