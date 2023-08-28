const passport = require("passport");
const passportLocal = require("passport-local");
const userModel = require("../models/userModel")

const LocalStrategy = passportLocal.LocalStrategy;

passport.use(  // El promer parametro es un string, seria el nombre del passport y el segundo es una instacia
  "regiter",    // Nombre del passport
  new LocalStrategy(    // Instanciamos el passport, el primer parametro es un objeto y el segundo es una fincion
    { passReqToCallback: true, userNameField: "email" }, // Si no le indicamos el email toma por default el nombre si tiene.
    async ( req, userName, password, done ) => { // El userName siermpre hace referencia al email porque lo definimos en la linea de arriba.
        try{


            

            



            
        } catch(e) {

        }
    }
  )
);
