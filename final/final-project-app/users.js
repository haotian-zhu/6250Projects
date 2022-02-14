const users = {};

function getUserData(username) {
  return users[username];
};

function setUserData(username, userData) {
  users[username] = userData;
};

module.exports = {
  getUserData,
  setUserData,
};
