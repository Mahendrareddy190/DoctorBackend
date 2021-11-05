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
const {
  PatientId,
  getPatient,
  getallPatients,
  updatePatient,
} = require("./controls/patient");
const {
  ConditionId,
  createCondtions,
  getAllConditions,
  getConditions,
} = require("./controls/Conditions");
const {
  SuggestionId,
  createSuggestion,
  getAllSuggestion,
  getSuggestion,
} = require("./controls/Suggestions");
const {
  dailyReportId,
  createdailyReport,
  getAlldailyReport,
  getdailyReport,
  Reportupdate,
} = require("./controls/dailyReport");

const {
  NotificationId,
  createNotification,
  getallnotification,
  getNotification,
} = require("./controls/Notification");

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
app.post("/api/signUpOfPatient/:doctorId/:ConditionId", signUpOfPatient);
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
app.put("/api/updateStatus/:doctorId/:PatientId", updatePatient);

// *************************************************** Conditions routes*******************************************

app.param("ConditionId", ConditionId);
app.post("/api/createCondtions", createCondtions);
app.get("/api/getAllconditions", getAllConditions);
app.get("/api/getconditions/:ConditionId", getConditions);

// *************************************************** Suggestions routes*******************************************

app.param("SuggestionId", SuggestionId);
app.post("/api/createSuggestion/:ConditionId", createSuggestion);
app.get("/api/getAllSuggestion", getAllSuggestion);
app.get("/api/getSuggestion/:SuggestionId", getSuggestion);

// ***************************************************dailyReport routes*******************************************

app.param("dailyReportId", dailyReportId);
app.post(
  "/api/createdailyReport/:PatientId/:ConditionId/:SuggestionId/:userId",
  createdailyReport
);
app.get("/api/getAlldailyReport", getAlldailyReport);
app.get("/api/getdailyReport/:dailyReportId", getdailyReport);
app.put("/api/updatereport/:dailyReportId", Reportupdate);

// *************************************************** Conditions routes*******************************************

app.param("NotificationId", NotificationId);
app.post("/api/createNotification/:userId", createNotification);
app.get("/api/getallnotification", getallnotification);
app.get("/api/getNotification/:NotificationId", getNotification);

// checking server status

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
