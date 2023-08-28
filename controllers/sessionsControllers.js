const { UserManagerDb } = require("../dao/userManagerDb");
const { isValidPassword } = require("../utils/passwordHash");

const pagesFn = (io) => {
  const manager = new UserManagerDb(io);

  // router.get("/", register);
  // router.post("/register", registerPost);
  // router.delete("/register/:uid", registerDelete);
  // router.post("/resetPassword", serestPassword);

  const register = async (req, res) => {
    //console.log(data);
  };

  const registerPost = async (req, res) => {
    const data = req.body;
    let response = await manager.getUser(data.email);
    if (response == null) {
      console.log(`El usuario ${data.email} no existe`);
      res.json({
        status: 400,
        data: "Usuario o contraseña invalido",
      });
      return;
    }
    //console.log(isValidPassword(data.password,response.password)) // Aca comparo la password que me pasaron con la password hasheada, esto me retorna true o false.
    if (!isValidPassword(data.password, response.password)) {
      // Chequeo si las password hacen match pero antes paso la password por nuestra funcion de hash para poder comprarlas.
      console.log(`Contraseña invalida`);
      res.json({
        status: 400,
        data: "Usuario o contraseña invalido",
      });
      return;
    }
    console.log(`${data.email} a iniciado sesion`);
    response = response.toObject(); // Conbierto la respuesta de mongo a objeto para poder borrar el password y que no quede en el backend
    delete response.password; // Borro la contraseña para que no quede en el backend
    if (!req.session.counter) {
      // Si la sesion no existe la genero
      req.session.counter = 1;
      //console.log(req.session.counter)
      req.session.counter++;
      req.session.email = data.email; // Guardo el email en la sesion
    } else {
      console.log(req.session.counter);
      //console.log(req.session)
    }
    if (response.rol == "admin") {
      res.json({
        status: 200,
        data: `Usuario admin: ${data.email} a iniciado sesion`,
      });
    } else {
      res.json({ status: 200, data: `${data.email} a iniciado sesion` });
    }
    return;
  };

  const registerDelete = async (req, res) => {
    req.session.destroy((err) => {
      if (!err) {
        console.log("Se destruyo la sesion");
        res.json({ status: 200, data: "Se destruyo la sesion" });
      } else {
        res.send(err);
      }
    });
  };

  const resetPassword = async (req, res) => {
    const data = req.body;
    let response = await manager.getUser(data.email);
    if (response == null) {
      console.log(`El usuario ${data.email} no existe`);
      res.json({
        status: 400,
        data: `El usuario ${data.email} no existe`,
      });
      return;
    }
    let responseRecovery = await manager.recoveryPassword(data);
    console.log(responseRecovery);
    res.json(responseRecovery);
  };

  return {
    register,
    registerPost,
    registerDelete,
    resetPassword,
  };
};

module.exports = pagesFn;
