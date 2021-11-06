const Patient = require("../models/patient");

exports.PatientId = (req, res, next, Id) => {
  Patient.findById(Id).exec((err, patient) => {
    if (err || !patient) {
      return res.status(200).json({ message: "patient Id not created" });
    }
    req.Patient = patient;
    next();
  });
};

exports.getPatient = (req, res) => {
  return res.json(req.Patient);
};

exports.updatePatient = (req, res) => {
  let doctorId = req.doctorDetails._id;
  let PatientId = req.Patient._id;
  Patient.findOneAndUpdate(
    { DoctorId: doctorId, _id: PatientId },
    {
      $set: req.body,
    }
  ).exec((err, user) => {
    if (err) {
      return res.status(200).json({ message: "status not update" });
    }
    res.json(user);
  });
};

exports.getallPatients = (req, res) => {
  Patient.find()
    .populate("userId", "email")
    .populate("DoctorId")
    .populate("conditionId")
    .exec((err, patient) => {
      if (err || !patient) {
        return res.status(200).json({ message: "can`t get all users" });
      }
      res.json(patient);
    });
};
