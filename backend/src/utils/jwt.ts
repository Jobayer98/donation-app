import jwt from "jsonwebtoken";

type tokenPayload = {
  id: string;
  role: string;
};

export function generateAccessToken(payload: tokenPayload): string {
  const token = jwt.sign({ ...payload }, "mysecret", {
    algorithm: "HS256",
    expiresIn: "1d",
  });

  return token;
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, "mysecret") as {
      id: string;
      role: string;
    };
    return decoded;
  } catch (error) {
    throw new Error("Token expired/invalid");
  }
}
