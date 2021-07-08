const { Session } = require("../db/models");

exports.getSessions = async (req, res, next) => {
  try {
    const sessions = await Session.findAll();
    res.json(sessions);
  } catch (error) {
    next(error);
  }
};

exports.createSession = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    if (
      req.user.role === "admin" ||
      req.user.role === "owner" ||
      req.user.role === "coach"
    ) {
      const newSession = await Session.create(req.body);
      res.status(201).json(newSession);
    } else {
      res.status(401).end();
    }
  } catch (error) {
    next(error);
  }
};
