const Conditions = require("../models/Conditions");

exports.ConditionId = (req, res, next, Id) => {
  Conditions.findById(Id).exec((err, condtions) => {
    if (err) {
      return res
        .status(200)
        .json({ message: "conditionId has not been created" });
    }
    req.condition = condtions;
    next();
  });
};

exports.createCondtions = (req, res) => {
  let condtions = new Conditions({
    name: req.body.name,
  });
  condtions.save((err, condtions) => {
    if (err || !condtions) {
      return res.status(200).json({ message: "conditions not created" });
    }
    res.json(condtions);
  });
};

exports.getConditions = (req, res) => {
  return res.json(req.condition);
};

exports.getAllConditions = (req, res) => {
  Conditions.find().exec((err, conditions) => {
    if (err) {
      return res.status(200).json({ message: "can`t get all conditions" });
    }
    res.json(conditions);
  });
};
