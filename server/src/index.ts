import { app } from "./app";
import { getConfig } from "./config";
import { runServer } from "./utils/runServer";
import { getWsRouter } from "./router/ws";

const { server: serverConfig } = getConfig();

const server = runServer({
  app,
  ...serverConfig
});

app.use("/ws", getWsRouter(server));

export { server };
