const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');
const secret = process.env.JWT_SECRET

async function authenticateToken(req, res, next) {

  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, secret, async (err, user) => {

    if (err) return res.sendStatus(403);

    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });

    if (!dbUser) return res.sendStatus(403);
    req.user = dbUser;
    next();
  });
}

module.exports = { authenticateToken };
