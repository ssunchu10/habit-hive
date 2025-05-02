import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      console.log("Received request body:", req.body);
      console.log("Forwarding to backend with cookie:", req.headers.cookie);

      const backendRes = await fetch("https://habit-hive-server.onrender.com/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: req.headers.cookie || "", // forward cookie for auth
        },
        body: JSON.stringify(req.body),
      });

      const data = await backendRes.json();
      console.log("Backend response status:", backendRes.status);
      console.log("Backend response data:", data);

      return res.status(backendRes.status).json(data);
    } catch (error) {
      console.error("Error forwarding request:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
