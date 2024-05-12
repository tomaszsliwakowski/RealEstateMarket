import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

type CookieType = {
  id: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not Valid!" });
    req.body.userId = payload.id;
    next();
  });
};
