const { Type } = require("../db/models");

exports.getTypes = async (req, res, next) => {
  try {
    const types = await Type.findAll();
    res.json(types);
  } catch (error) {
    next(error);
  }
};

exports.createType = async (req, res, next) => {
  try {
    const newType = await Type.create(req.body);
    res.status(201).json(newType);
  } catch (error) {
    next(error);
  }
};
