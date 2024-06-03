import prisma from "../../lib/prisma";
import { Request, Response } from "express";

export type MessageType = {
  id: string;
  text: string;
  userId: string;
  chatId: string;
  createdAt: Date;
};

export const addMessage = async (req: Request, res: Response) => {
  const userId: string = req.body.userId;
  const chatId: string = req.params.chatId;
  const text: string = req.body.text;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [userId],
        },
      },
    });

    if (!chat) return res.status(404).json({ message: "Chat not found!" });

    const message: MessageType = await prisma.message.create({
      data: {
        text,
        chatId,
        userId,
      },
    });

    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: [userId],
        lastMessage: text,
      },
    });

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: "Failed to add message!" });
  }
};
