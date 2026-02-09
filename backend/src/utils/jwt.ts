import jwt from "jsonwebtoken";

type tokenPayload = {
  id: string;
  role: string;
};

export function generateAccessToken(payload: tokenPayload): string {
  const token = jwt.sign({ ...payload }, "mysecret", {
    algorithm: "HS256",
    expiresIn: "5m",
  });

  return token;
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, "mysecret");
    console.log(decoded);
  } catch (error) {
    console.log("Error verify token", error);
  }
}
