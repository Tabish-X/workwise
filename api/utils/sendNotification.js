const Users = require("../models/Users");

async function sendNotification(notificationId, authId, message, redirect) {
  try {
    const user = await Users.findByIdAndUpdate(
      notificationId,
      {
        $push: {
          notifications: {
            userId: authId,
            message,
            time: Date.now(),
            redirect,
          },
        },
      },
      { new: true }
    );
    if (user) {
      return user;
    } else {
      return false;
    }
  } catch (error) {
    return error.message;
  }
}

module.exports = sendNotification;
