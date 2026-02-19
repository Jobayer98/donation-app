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

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.query;
  const result = await authService.verifyEmail(token as string);

  res.json({
    success: true,
    message: result.message
  });
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await authService.forgotPassword(email);

  res.json({
    success: true,
    message: result.message
  });
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { token, password } = req.body;
  const result = await authService.resetPassword(token, password);

  res.json({
    success: true,
    message: result.message
  });
});
