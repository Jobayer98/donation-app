import { prisma } from "../lib/prisma";
import { loginDTO, registerDTO } from "../schema/auth.shcema";
import { hashPassword, verifyPassword } from "../utils/auth";
import { generateAccessToken } from "../utils/jwt";

class AuthService {
    async register(data: registerDTO) {
        const hashPass = await hashPassword(data.password);
        if (!hashPass) throw new Error("Error hashing password");

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashPass,
                role: data.role
            },
            select: { id: true, role: true }
        });

        const token = generateAccessToken({ id: user.id, role: user.role });
        return { id: user.id, token };
    }

    async login(data: loginDTO) {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
            select: { id: true, name: true, email: true, password: true, role: true }
        });

        if (!user || !(await verifyPassword(data.password, user.password))) {
            return null;
        }

        const token = generateAccessToken({ id: user.id, role: user.role });
        return { id: user.id, name: user.name, email: user.email, token };
    }
}

export default new AuthService();
