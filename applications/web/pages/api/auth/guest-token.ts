import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { handleCors } from "../../../middlewares/handleCors";

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET || "your-secret-key"; // Replace with a secure key

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  handleCors(req, res);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, conversationKey } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Email and name are required" });
  }

  try {
    const token = jwt.sign({ email, name, conversationKey }, SECRET_KEY, {
      expiresIn: "7d",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error creating user:", error.message);
    return res.status(500).json({ error: error.message });
  }
}


