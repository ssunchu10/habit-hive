// src/pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    proxy.once("proxyRes", () => resolve(true));
    proxy.once("error", reject);

    proxy.web(req, res, {
      target: "https://habit-hive-server.onrender.com",
      changeOrigin: true,
      secure: false,
    });
  });
}
