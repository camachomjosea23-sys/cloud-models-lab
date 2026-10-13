const http = require("node:http");
const { uptime } = require("node:process");

const port = Number(process.env.PORT || 3000);
const environment = process.env.APP_ENV || "local";
const version = "1.0.0";

const server = http.createServer((request, response) => {
  console.log(`${new Date().toISOString()} ${request.method} ${request.url}`);

  response.setHeader("Content-Type", "application/json; charset=utf-8");

  if (request.url === "/") {
    response.writeHead(200);
    response.end(JSON.stringify({
      application: "Cloud Models Lab",
      environment,
      version
    }));
    return;
  }

  if (request.url === "/health") {
    response.writeHead(200);
    response.end(JSON.stringify({
      status: "ok",
      uptimeSeconds: Math.floor(process.uptime())
    }));
    return;
  }

  response.writeHead(404);
  response.end(JSON.stringify({
    error: "Ruta no encontrada"
  }));
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Servidor iniciado en puerto ${port}, ambiente ${environment}`);
});