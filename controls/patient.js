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

exports.updatePatient = (req, res) => {
  let doctorId = req.userDetails._id;
  let PatientId = req.Patient._id;
  Patient.findByIdAndUpdate(
    { DoctorId: doctorId, _id: PatientId },
    {
      $set: {
        name: req.body.name,
        age: req.body.age,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
        status: req.body.status,
      },
    }
  ).exec((err, user) => {
    if (err) {
      return res.status(400).json({ message: "status not update" });
    }
    res.json(user);
  });
};

exports.getallPatients = (req, res) => {
  Patient.find().exec((err, patient) => {
    if (err || !patient) {
      return res.status(400).json({ message: "can`t get all users" });
    }
    res.json(patient);
  });
};
