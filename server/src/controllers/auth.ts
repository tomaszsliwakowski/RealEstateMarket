import { Request, Response } from "express";
import bccrypt from "bcrypt";
import prisma from "../../lib/prisma";
import jwt, { JwtPayload, verify } from "jsonwebtoken";

type LoginRequestData = {
  username: string;
  email: string;
  password: string;
};

type UserType = {
  id: string;
  email: string;
  username: string;
  password: string;
  avatar?: string | null;
  createdAt: Date;
};

export const register = async (req: Request, res: Response) => {
  const { username, email, password }: LoginRequestData = req.body;

  try {
    const hashedPassword: string = await bccrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user: UserType = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) return res.status(404).json({ message: "Invalid Credentials!" });
    const isPasswordValid = await bccrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials!" });
    const age: number = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: age,
      }
    );
    const { password: userPassword, ...userInfo } = user;
    res
      .cookie("token", token, { httpOnly: true, maxAge: age })
      .status(200)
      .json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Failed to login!" });
  }
};

type CookieType = {
  id: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
};

export const getLogged = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;
    const cookie = verify(token, process.env.JWT_SECRET_KEY) as CookieType;
    if (!cookie) res.status(500);
    const user = await prisma.user.findUnique({ where: { id: cookie.id } });
    const { password, ...userInfo } = user;
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
