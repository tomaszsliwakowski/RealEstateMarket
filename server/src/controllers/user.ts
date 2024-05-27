import prisma from "../../lib/prisma";
import { Request, Response } from "express";
import bccrypt from "bcrypt";

type UserType = {
  id: string;
  email: string;
  username: string;
  password: string;
  avatar?: string | null;
  createdAt: Date;
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: UserType[] = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    const user: UserType = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to get user!" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const userId: string = req.body.userId;
  const { password, avatar, ...inputs } = req.body;
  if (id !== userId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }
  let hashedPassword = null;
  try {
    if (password && password !== "") {
      hashedPassword = await bccrypt.hash(password, 10);
    }
    const updatedUser: UserType = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(hashedPassword && { password: hashedPassword }),
        ...(avatar && { avatar }),
      },
    });
    const { password: userPassword, ...userInfo } = updatedUser;
    console.log(updatedUser);
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user!" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const userId: string = req.body.userId;
  if (id !== userId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user!" });
  }
};

export const savePost = async (req: Request, res: Response) => {
  const postId: string = req.body.postId;
  const userId: string = req.body.userId;
  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      res.status(200).json({ message: "Post removed from saved list" });
    } else {
      await prisma.savedPost.create({
        data: {
          userId,
          postId,
        },
      });
      res.status(200).json({ message: "Post saved" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to save post!" });
  }
};
