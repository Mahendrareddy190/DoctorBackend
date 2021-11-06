const Doctor = require("../models/doctor");

exports.doctorId = (req, res, next, Id) => {
  Doctor.findById(Id).exec((err, doctor) => {
    if (err || !doctor) {
      return res.status(200).json({ message: err.message });
    }
    req.doctorDetails = doctor;
    next();
  });
};

exports.getDoctor = (req, res) => {
  return res.json(req.doctorDetails);
};

exports.getAllDoctors = (req, res) => {
  Doctor.find()
    .populate("User")
    .exec((err, doctor) => {
      if (err) {
        return res.status(200).json({ message: "can`t get all doctorDetails" });
      }
      res.json(doctor);
    });
};
