const prisma = require("../prisma/client");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/hash");

const JWT_SECRET = process.env.JWT_SECRET;

async function registrar(req, res) {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Usuário já existe" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return res.status(201).json({message: "Usuário registrado com sucesso",id: user.id,email: user.email,name: user.name,role: user.role,
      });
  } catch (error) {
    console.error("Erro em registrar:", error);
    res.status(500).json({ message: "Erro ao registrar usuário" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const passwordValid = await comparePassword(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    if (!JWT_SECRET) {
      console.error("JWT_SECRET não está definido no ambiente");
      return res
        .status(500)
        .json({ message: "Configuração do servidor incompleta" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET
    );
    res.json({ token });
  } catch (error) {
    console.error("Erro em login:", error);
    res.status(500).json({ message: "Erro ao fazer login" });
  }
}

module.exports = { registrar, login };
