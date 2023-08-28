const { UserManagerDb } = require("../dao/userManagerDb");

const pagesFn = (io) => {
  const manager = new UserManagerDb(io);

  const register = async (req, res) => {
      res.render("register");
    
  };

  const login = async (req, res) => {
    res.render("login");
  };

  const recoveryPassword = async (req, res) => {
    res.render("recoveryPassword.handlebars");
  };

  return {
    register,
    login,
    recoveryPassword
  };
};

module.exports = pagesFn;
