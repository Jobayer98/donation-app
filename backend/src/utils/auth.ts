import bcrypt from "bcrypt";
import logger from "./logger";

const saltRounds = 10;

export async function hashPassword(
  plainPassword: string,
): Promise<string | undefined> {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    logger.error("Error hashing password:", error);
  }
}

export async function verifyPassword(
  plainPassword: string,
  storedHash: string,
) {
  const isMatch = await bcrypt.compare(plainPassword, storedHash);
  return isMatch;
}
