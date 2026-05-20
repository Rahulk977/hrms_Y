import { Request, Response } from "express";
import { users } from "../db/mockDb";

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const { password: _, ...userData } = user;
  res.json({
    message: "Login successful",
    user: userData,
  });
};
