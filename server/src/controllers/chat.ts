import prisma from "../../lib/prisma";
import { Request, Response } from "express";

type ReceiverType = {
  id: string;
  username: string;
  avatar: string;
};
type ChatType = {
  id: string;
  userIDs: string[];
  createdAt: Date;
  seenBy: string[];
  lastMessage: string;
  receiver?: ReceiverType;
};

export const getChats = async (req: Request, res: Response) => {
  const userId: string = req.body.userId;
  try {
    const chats: ChatType[] = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [userId],
        },
      },
    });
    for (const chat of chats) {
      const receiverId = chat.userIDs.find((id) => id !== userId);

      const receiver = await prisma.user.findUnique({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.receiver = receiver;
    }
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Failed to get chats!" });
  }
};
export const getChat = async (req: Request, res: Response) => {
  const userId: string = req.body.userId;
  const id: string = req.params.id;
  try {
    const chat: ChatType = await prisma.chat.findUnique({
      where: {
        id,
        userIDs: {
          hasSome: [userId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Failed to get chat!" });
  }
};
export const addChat = async (req: Request, res: Response) => {
  const userId: string = req.body.userId;
  const receiverId = req.body.receiverId;
  try {
    const newChat: ChatType = await prisma.chat.create({
      data: {
        userIDs: [userId, receiverId],
      },
    });
    res.status(200).json(newChat);
  } catch (error) {
    res.status(500).json({ message: "Failed to add chat!" });
  }
};
export const readChat = async (req: Request, res: Response) => {
  const userId: string = req.body.userId;
  const id: string = req.params.id;
  try {
    const chat = await prisma.chat.update({
      where: {
        id,
        userIDs: {
          hasSome: [userId],
        },
      },
      data: {
        seenBy: {
          set: [userId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Failed to read chat!" });
  }
};
