import { Request, Response } from "express";
import bccrypt from "bcrypt";

type LoginRequestData = {
  username: string;
  email: string;
  password: string;
};

export const register = async (req: Request, res: Response) => {
  const { username, email, password }: LoginRequestData = req.body;
  const hashedPassword: string = await bccrypt.hash(password, 10);
};
export const login = async (req: Request, res: Response) => {};
export const logout = async (req: Request, res: Response) => {};
