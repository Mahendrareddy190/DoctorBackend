const Daily = require("../models/dailyReport");
const Patient = require("../models/patient");

exports.dailyReportId = (req, res, next, Id) => {
  Daily.findById(Id)
    .populate("Patient")
    .exec((err, Report) => {
      if (err) {
        return res.status(400).json({ message: " ReportId not created" });
      }
      req.daily = Report;
      next();
    });
};

exports.createdailyReport = (req, res) => {
  let patientId = req.Patient._id;
  let conId = req.condition._id;
  let suggId = req.Suggestion._id;
  let dailyReport = new Daily({
    patientId: patientId,
    conditionId: conId,
    suggestionId: suggId,
    dailyUpdate: req.body.dailyUpdate,
    painLevel: req.body.painLevel,
  });
  dailyReport.save((err, dailyReport) => {
    if (err) {
      return res.status(400).json({ message: "Error in saving daily report" });
    }
    Patient.findOneAndUpdate(
      { userId: req.userDetails._id },
      {
        $set: { date: Date.now() },
      }
    ).exec((err, pia) => {
      if (err) {
        return res.status(400).json({ message: "can`t update date" });
      }
      res.json(dailyReport);
    });
  });
};

exports.getdailyReport = (req, res) => {
  return res.json(req.daily);
};

exports.getAlldailyReport = (req, res) => {
  Daily.find()
    .populate("patientId")
    .exec((err, daily) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Error in getting all dailyReport" });
      }
      res.json(daily);
    });
};
