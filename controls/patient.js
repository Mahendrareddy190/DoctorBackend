const Patient = require("../models/patient");

exports.PatientId = (req, res, next, Id) => {
  Patient.findById(Id)
    .populate("User")
    .exec((err, patient) => {
      if (err || !patient) {
        return res.status(400).json({ message: "patient Id not created" });
      }
      req.Patient = patient;
      next();
    });
};

exports.getPatient = (req, res) => {
  return res.json(req.Patient);
};

exports.getallPatients = (req, res) => {
  Patient.find().exec((err, patient) => {
    if (err || !patient) {
      return res.status(400).json({ message: "can`t get all users" });
    }
    res.json(patient);
  });
};
