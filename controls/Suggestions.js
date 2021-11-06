const Suggestion = require("../models/Suggestions");

exports.SuggestionId = (req, res, next, Id) => {
  Suggestion.findById(Id).exec((err, suggestion) => {
    if (err) {
      return res
        .status(200)
        .json({ message: "suggestionId has not been created" });
    }
    req.Suggestion = suggestion;
    next();
  });
};

exports.createSuggestion = (req, res) => {
  let conId = req.condition._id;
  let suggestion = new Suggestion({
    conditionId: conId,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    option5: req.body.option5,
  });
  suggestion.save((err, suggestion) => {
    if (err || !suggestion) {
      return res.status(200).json({ message: "Error in saving suggestion" });
    }
    res.json(suggestion);
  });
};

exports.getSuggestion = (req, res) => {
  return res.json(req.Suggestion);
};

exports.getAllSuggestion = (req, res) => {
  Suggestion.find().exec((err, suggestion) => {
    if (err) {
      return res.status(200).json({ message: "can`t get all conditions" });
    }
    res.json(suggestion);
  });
};
