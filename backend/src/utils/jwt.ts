import jwt from "jsonwebtoken";
import { appConfig } from "../config/config";

type tokenPayload = {
  id: string;
  role: string;
};

export function generateAccessToken(payload: tokenPayload): string {
  const token = jwt.sign({ ...payload }, appConfig.jwt_secret, {
    algorithm: "HS256",
    expiresIn: appConfig.jwt_expires_in as any,
  });

  return token;
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, appConfig.jwt_secret) as {
      id: string;
      role: string;
    };
    return decoded;
  } catch (error) {
    throw new Error("Token expired/invalid");
  }
}
