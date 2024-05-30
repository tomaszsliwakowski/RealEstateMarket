import prisma from "../../lib/prisma";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

type PostsQueryType = {
  bedroom: string;
  property: Property;
  type: Type;
  city: string;
  minPrice: string;
  maxPrice: string;
};
type Type = "buy" | "rent";

type Property = "apartment" | "house" | "condo" | "land";

export type PostType = {
  id: string;
  title: string;
  price: number;
  images: string[];
  address: string;
  city: string;
  bedroom: number;
  bathroom: number;
  latitude: string;
  longitude: string;
  type: Type;
  property: Property;
  createdAt: Date;
  userId: string;
};

export const getPosts = async (req: Request, res: Response) => {
  const query = req.query;
  const { bedroom, property, type, city, minPrice, maxPrice } =
    query as PostsQueryType;

  try {
    const posts: PostType[] = await prisma.post.findMany({
      where: {
        city: city || undefined,
        type: type || undefined,
        property: property || undefined,
        bedroom: parseInt(bedroom) || undefined,
        price: {
          gte: parseInt(minPrice) || undefined,
          lte: parseInt(maxPrice) || undefined,
        },
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to get posts" });
  }
};

type SavedType = {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
};

export const getPost = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    const post: PostType = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: { select: { username: true, avatar: true } },
      },
    });
    const token = req.cookies.token;
    if (token) {
      verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved: SavedType = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
          res.status(200).json({ ...post, isSaved: saved ? true : false });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get post" });
  }
};
export const addPost = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const newPost: PostType = await prisma.post.create({
      data: {
        ...body.postData,
        userId: body.userId,
        postDetail: {
          create: body.postDetail,
        },
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
    const post: PostType = await prisma.post.findUnique({ where: { id } });

    if (post.userId !== userId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({ where: { id } });

    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post" });
  }
};
