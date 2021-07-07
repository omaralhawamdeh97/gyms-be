const { Class } = require("../db/models");

exports.getClasses = async (req, res, next) => {
  try {
    const classes = await Class.findAll();
    res.json(classes);
  } catch (error) {
    next(error);
  }
};

exports.createClass = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    if (req.user.role === "admin" || req.user.role === "owner") {
      const newClass = await Class.create(req.body);
      res.status(201).json(newClass);
    } else {
      res.status(401).end();
    }
  } catch (error) {
    next(error);
  }
};
