import express from "express";
import http from "node:http";
import path from "node:path";
import createBareServer from "@tomphttp/bare-server-node";
import request from "@cypress/request";


const __dirname = path.resolve();
const server = http.createServer();
const app = express(server);
const bareServer = createBareServer("/bare/");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/g", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/g.html"));
});
app.get("/a", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/a.html"));
});
app.get("/p", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/p.html"));
});
app.get("/t", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/t.html"));
});
app.get("./public/data/js/worker.js", (req, res) => {
  request("./public/data/js/worker.js", (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.setHeader("Content-Type", "text/javascript");
      res.send(body);
    } else {
      res.status(500).send("Error fetching worker script");
    }
  });
});
app.use((req, res) => {
  res.statusCode = 404;
  res.sendFile(path.join(__dirname, "./public/404.html"));
});


server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});
server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});
server.on("listening", () => {
  console.log(
    `breakium running on port https://localhost:${server.address().port}`
  );
});


server.listen({ port: 2100 });
