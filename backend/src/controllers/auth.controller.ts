import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import authService from "../services/auth.service";
import { loginDTO, registerDTO } from "../schema/auth.shcema";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data: registerDTO = req.body;
  const result = await authService.register(data);

  res.status(201).json({
    success: true,
    message: "User register successfully",
    data: result
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const data: loginDTO = req.body;
  const result = await authService.login(data);

  if (!result) {
    return res.status(401).json({ success: false, message: "Invalid credentail." });
  }

  res.json({
    success: true,
    message: "Login successful.",
    data: result
  });
});
