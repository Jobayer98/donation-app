import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { registerDto } from "../schema/auth.shcema";
import { hashPassword } from "../utils/auth";
import { generateAccessToken } from "../utils/jwt";

export async function register(req: Request, res: Response) {
  try {
    let data: registerDto = req.body;
    const hashPass = await hashPassword(data.password);

    if (!hashPass) {
      throw new Error("Error hashing password");
    }

    let user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashPass,
        role: data.role,
      },
    });

    const token = generateAccessToken({ id: user.id, role: user.role });

    res.status(201).json({
      success: true,
      message: "User register successfully",
      data: {
        id: user.id,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}
