import express from 'express';
import http from 'node:http';
import { createBareServer } from '@tomphttp/bare-server-node';
import cors from 'cors';
import path from "path";
import { hostname } from "node:os"

const server = http.createServer();
const app = express(server);
const __dirname = process.cwd();
const bareServer = createBareServer('/bare/');
const PORT = 2100;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public/'));
app.use(cors());

server.on('request', (req, res) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res)
    } else {
        app(req, res)
    }
})

server.on('upgrade', (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeUpgrade(req, socket, head)
    } else {
        socket.end()
    }
})

server.on('listening', () => {
    const address = server.address();

    console.log(`\thttp://localhost:${address.port}`);
    console.log(`\thttp://${hostname()}:${address.port}`);
    console.log(
        `\thttp://${address.family === "IPv6" ? `[${address.address}]` : address.address
        }:${address.port}`
    );
})

server.listen({ port: PORT, })

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close();
    bareServer.close();
    process.exit(0);
}