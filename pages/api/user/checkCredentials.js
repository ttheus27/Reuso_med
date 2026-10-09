import { prisma } from "@/pages/api/server/db/prisma";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

function generateJwtForUser(user) {
  if (!user) throw new Error("User object is null");
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const secretKey = process.env.JWT_SECRET_KEY;
  const expiresIn = "6h";
  return jwt.sign(payload, secretKey, { expiresIn });
}

const checkCredentials = async (req, res) => {
  console.log("ENTREI");
  console.log(req.body, "BODY", "ENTREI");

  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
    select: {
      id: true,
      name: true,
      email: true,

      createdAt: true,
      password: true,
      role: true, // 👈 enum direto
    },
  });

  console.log(user);

  if (
    user &&
    user.password &&
    (await compare(req.body.password, user.password))
  ) {
    const jwtToken = generateJwtForUser(user);

    const { password, ...userWithoutPassword } = user;
    const responsePayload = {
      ...userWithoutPassword,
      jwt: jwtToken,
    };

    res.status(200).json(responsePayload);
  } else {
    res.status(400).send("Email ou senha inválidos");
  }
};

export default checkCredentials;
