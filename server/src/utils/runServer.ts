import { readFileSync } from "fs";
import { resolve } from "path";
import * as express from "express";
import * as httpsHelper from "https";
import { AddressInfo } from "net";

export function runServer(pars: { app: express.Express; https: boolean; pfx?: string; pfxPassword?: string; port: number }) {
  const { app, https = false, pfx, pfxPassword, port = 80 } = pars;
  if (https) {
    const options = {
      pfx: readFileSync(resolve(__dirname, pfx)),
      passphrase: pfxPassword
    };

    const httpsServer = httpsHelper.createServer(options, app);
    httpsServer.listen(port, () => {
      const { address, port } = httpsServer.address() as AddressInfo;
      console.log(`Server listening at https://${address}:${port}`);
    });
    return httpsServer;
  } else {
    const httpServer = app.listen(port, () => {
      const { address, port } = httpServer.address() as AddressInfo;
      console.log(`Server listening at http://${address}:${port}`);
    });
    return httpServer;
  }
}
