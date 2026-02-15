import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { loginDTO, registerDTO } from "../schema/auth.shcema";
import { hashPassword, verifyPassword } from "../utils/auth";
import { generateAccessToken } from "../utils/jwt";
import asyncHandler from "../utils/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
  let data: registerDTO = req.body;
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
})

export const login = asyncHandler(async (req: Request, res: Response) => {
  const data: loginDTO = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentail." });
  }

  const isMatch = await verifyPassword(data.password, user!.password);

  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentail." });
  }

  const token = generateAccessToken({ id: user!.id, role: user!.role });

  const userWithoutPassword = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    token: token,
  };

  res.json({
    success: true,
    message: "Login successful.",
    data: userWithoutPassword,
  });
});
