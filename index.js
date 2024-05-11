import { createBareServer } from "@tomphttp/bare-server-node";
import express from "express";
import http from "http";
import { dirname, join } from "path";
import { hostname } from "node:os";
import { fileURLToPath } from "url";
import compression from 'compression';
import chalk from 'chalk';
import 'dotenv/config';
import path from "node:path";

let port = parseInt(process.env.PORT || "");
if (isNaN(port)) port = 2100;

const bare = createBareServer("/bare/");
const app = express();

const __dirname = process.cwd();

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/public/index.html'));
});
app.get('/english', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/public/g.html'));
});
app.get('/science', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/public/a.html'));
});
app.get('/math', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/public/p.html'));
});
app.get('/app', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/public/q.html'));
});
app.get('/@', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/public/s.html'));
});
app.get('/tabs', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/public/test.html'));
});

app.get("/search=:query", async (req, res) => {
  const { query } = req.params;

  const response = await fetch(
    `http://api.duckduckgo.com/ac?q=${query}&format=json`
  ).then((apiRes) => apiRes.json());

  res.send(response);
});

app.use(compression());
app.use(express.static(process.cwd() + "/public/"));
app.use("/public/uv/", express.static(process.cwd() + "/uv/"));

app.use((req, res) => {
  res.status(404);
  res.send(
    `404`
  );
});

const server = http.createServer();

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.on("listening", () => {
  const address = server.address();
  console.log("Breakium listening on:");
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
  console.log(
    `\thttp://${
      address.family === "IPv6" ? `[${address.address}]` : address.address
    }:${address.port}`
  );
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close();
  bare.close();
  process.exit(0);
}

server.listen({
  port,
});