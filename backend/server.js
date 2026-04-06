import app from "./src/app.js";

console.log("1. server.js se está ejecutando");

const PORT = 3001;

const server = app.listen(PORT, () => {
  console.log(`2. Servidor corriendo en http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.error("3. Error al iniciar el servidor:");
  console.error(error);
});