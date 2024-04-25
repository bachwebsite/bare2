import { createBareServer } from "@tomphttp/bare-server-node";
import express from "express";
import { createServer } from "node:http";
import { SocksProxyAgent } from "socks-proxy-agent";
const socksProxyAgent = new SocksProxyAgent("socks://localhost:40000");
import pkg from "@titaniumnetwork-dev/ultraviolet";
const uv = pkg.uv;
import { join } from "node:path";
import { hostname } from "os";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import serveStatic from "serve-static";

const __dirname = fileURLToPath(import.meta.url);
const publicPath = join(__dirname, "../public");

const bare = createBareServer("/bare/", {});
const app = express();
dotenv.config();
app.use(serveStatic('public'));
app.use(express.static("uv"));

const server = createServer();
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

const port = process.env.PORT || 2100;
server.on("listening", () => {
  console.log("Server is up and running!");
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
