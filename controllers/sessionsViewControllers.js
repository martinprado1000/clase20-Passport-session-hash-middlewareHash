const { UserManagerDb } = require("../dao/userManagerDb");

const pagesFn = (io) => {
  const manager = new UserManagerDb(io);

  const register = async (req, res) => {
      res.render("register");
    
  };

  const login = async (req, res) => {
    //console.log(req.flash('error'))
    //const error = req.flash('error')[0];
    //console.log(error)
    //console.log({user:req.user, session:req.session})
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
