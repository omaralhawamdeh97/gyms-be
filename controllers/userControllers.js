const bcrypt = require("bcrypt");
const { User, Gym, Session } = require("../db/models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
    role: user.role,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};
exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
exports.signin = (req, res, next) => {
  const token = generateToken(req.user);
  res.json({ token });
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      include: [
        {
          model: Gym,
          as: "gyms",
          attributes: ["id"],
        },
        {
          model: Session,

          attributes: ["id"],
        },
      ],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (req.user.role === "admin" || req.user.role === "owner") {
      const foundUser = await User.findByPk(userId);
      await foundUser.update(req.body);
      res.status(204).end();
    } else {
      res.status(401).end();
    }
  } catch (error) {
    next(error);
  }
};
