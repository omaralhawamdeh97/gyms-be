const { Gym } = require("../db/models");

exports.getGyms = async (req, res, next) => {
  try {
    const gyms = await Gym.findAll();
    res.json(gyms);
  } catch (error) {
    next(error);
  }
};

exports.createGym = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.userId = req.user.id;
    const newGym = await Gym.create(req.body);
    res.status(201).json(newGym);
  } catch (error) {
    next(error);
  }
};
