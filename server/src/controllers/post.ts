import prisma from "../../lib/prisma";
import { Request, Response } from "express";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to get posts" });
  }
};
export const getPost = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        // postDetail: true,
        user: { select: { username: true, avatar: true } },
      },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to get post" });
  }
};
export const addPost = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: body.userId,
        postDetail: { create: body.postDetail },
      },
    });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Failded to add post" });
  }
};
export const updatePost = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: "Failed to update post" });
  }
};
export const deletePost = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const userId = req.body.userId;
  try {
    const post = await prisma.post.findUnique({ where: { id } });

    if (post.userId !== userId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({ where: { id } });

    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post" });
  }
};
