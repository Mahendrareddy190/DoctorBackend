const User = require("../models/user");
const Doctor = require("../models/doctor");
const bycrypt = require("bcryptjs");
const Patient = require("../models/patient");
const jwt = require("jsonwebtoken");

exports.userId = (req, res, next, Id) => {
  User.findById(Id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: err.message });
    }
    req.userDetails = user;
    next();
  });
};

// *******************************************user signIn*************************************************

exports.signIn = (req, res) => {
  let getuser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "No user present" });
      }
      getuser = user;
      return bycrypt.compare(req.body.password, user.password);
    })
    .then((response) => {
      if (!response) {
        return res.status(400).json({ message: "no response " });
      }
      let jwtToken = jwt.sign(
        {
          email: getuser.email,
          userId: getuser._id,
        },
        "secret",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        Token: jwtToken,
        expiresIn: 3600,
        user: getuser,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        error: "singIn faliled ",
      });
    });
};

// *******************************************user signUp*************************************************

exports.signUp = (req, res) => {
  bycrypt.hash(req.body.password, 10).then((hash) => {
    let user = new User({
      email: req.body.email,
      password: hash,
    });
    user.save((err, user) => {
      if (err || !user) {
        return res.status(400).json({ message: "user already exists" });
      }
      createDoctorDetails(req.body, user._id);
      res.json({ message: "successfully created" });
    });
  });
};

const createDoctorDetails = async (reqbody, Id) => {
  let doctorDetails = new Doctor({
    userId: Id,
    name: reqbody.name,
    age: reqbody.age,
    phoneNumber: reqbody.phoneNumber,
    location: reqbody.location,
  });
  await doctorDetails.save();
};

// **************************************signUp Of Patient by doctor****************************************

exports.signUpOfPatient = (req, res) => {
  var chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var passwordLength = 6;
  var password = "";
  for (var i = 1; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  bycrypt.hash(password, 10).then((hash) => {
    let user = new User({
      email: req.body.email,
      password: hash,
    });
    user.save((err, user) => {
      if (err || !user) {
        return res.status(400).json({ message: "User already exists" });
      }
      let piaId = req.userDetails._id;
      createPatientDetails(req.body, user._id, piaId);
      res.json({ email: req.body.email, password: password });
    });
  });
};

const createPatientDetails = async (reqbody, Id, piaId) => {
  let PatientDetails = new Patient({
    userId: Id,
    patientId: piaId,
    name: reqbody.name,
    age: reqbody.age,
    phoneNumber: reqbody.phoneNumber,
    location: reqbody.location,
    status: reqbody.status,
  });
  await PatientDetails.save();
};

// ************************************ forgot password(updatepassword) ***********************************

exports.updatepassword = (req, res) => {
  bycrypt.hash(req.body.password, 10).then((hash) => {
    let password = hash;
    User.findOneAndUpdate(
      { email: req.body.email },
      { $set: { password: password } }
    ).exec((err, user) => {
      if (err) {
        return res.status(400).json({ message: "Email does not exist" });
      }
      res.json(user);
    });
  });
};

// ************************************  get single user by userId ***********************************

exports.getuser = (req, res) => {
  return res.json(req.userDetails);
};

// ************************************ get all users ***********************************************

exports.getAllUser = (req, res) => {
  User.find().exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "can`t get users",
      });
    }
    res.json(user);
  });
};
