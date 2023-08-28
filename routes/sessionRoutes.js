const { Router } = require("express");

const sessionRoutesFn = ((io)=>{

  const pagesFn = require("../controllers/sessionsControllers")

  const { register, registerPost, registerDelete, resetPassword } = pagesFn(io)  

const router = Router();

  router.get("/", register);

  router.post("/register", registerPost);

  router.delete("/register", registerDelete);

  router.post("/resetPassword", resetPassword);

  return router;

})


module.exports = sessionRoutesFn ;
