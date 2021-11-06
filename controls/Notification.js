const Notification = require("../models/Notification");

exports.NotificationId = (req, res, next, Id) => {
  Notification.findById(Id).exec((err, notification) => {
    if (err || !notification) {
      return res.status(200).json({ message: "Notification not found" });
    }
    req.notification = notification;
    next();
  });
};

exports.createNotification = (req, res) => {
  let userId = req.userDetails._id;
  let notification = new Notification({
    userId: userId,
    message: req.body.message,
  });
  notification.save((err, notification) => {
    if (err) {
      return res.status(200).json({ message: "Notification not created" });
    }
    return res.status(200).json({ message: "Notification created" });
  });
};

exports.getallnotification = (req, res) => {
  Notification.find().exec((err, notification) => {
    if (err) {
      return res.status(200).json({ message: "Notification not found" });
    }
    return res.status(200).json(notification);
  });
};

exports.getNotification = (req, res) => {
  return res.json(req.notification);
};
