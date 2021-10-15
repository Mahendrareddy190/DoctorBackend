const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// controls

const {
  userId,
  signUp,
  getuser,
  getAllUser,
  signUpOfPatient,
  updatepassword,
  signIn,
} = require("./controls/user");
const { doctorId, getDoctor, getAllDoctors } = require("./controls/doctor");
const { PatientId, getPatient, getallPatients } = require("./controls/patient");

// mongodb connection

mongoose
  .connect(process.env.ONLINEDATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db Connected"))
  .catch(() => console.log("db not connected"));

// middlewares

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// *************************************************** user routes*******************************************

app.param("userId", userId);
app.post("/api/signUp", signUp);
app.post("/api/signIn", signIn);
app.post("/api/updatepassword", updatepassword);
app.post("/api/signUpOfPatient/:userId", signUpOfPatient);
app.get("/api/getuser/:userId", getuser);
app.get("/api/getAllusers", getAllUser);

// *************************************************** doctor routes*******************************************

app.param("doctorId", doctorId);
app.get("/api/getdoctor/:doctorId", getDoctor);
app.get("/api/getallDoctorDetails", getAllDoctors);

// *************************************************** patient routes*******************************************

app.param("PatientId", PatientId);
app.get("/api/getPatient/:PatientId", getPatient);
app.get("/api/getallPatients", getallPatients);

// checking server status

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
