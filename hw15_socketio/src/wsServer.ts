import { Server } from "socket.io";
import { createServer } from "node:http";

const startWebSocketServer = () => {
  const httpServer = createServer();
  const wsServer = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  wsServer.on("connection", (socket) => {
    console.log("new frontend connected");
    socket.on("message", (socket) => {
      console.log("new message: ", socket);
      wsServer.emit("response", `response: ${socket}`);
    });
  });

  const wsPort: number = Number(process.env.WS_PORT) || 5000;
  httpServer.listen(wsPort, () =>
    console.log(`--- WebSocketServer start on port ${wsPort} ---`)
  );
};

export default startWebSocketServer;
