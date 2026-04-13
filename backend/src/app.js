import express from "express";
import cors from "cors";
import missionsRoutes from "./routes/missions.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API de Gestor de Misiones Espaciales funcionando correctamente"
  });
});

app.use("/api/missions", missionsRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  });
});

app.use(errorHandler);

export default app;