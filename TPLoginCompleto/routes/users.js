const multer= require("multer")
const path=require("path");
const {loginForm,login,check, olvidar,usar
} = require("../controllers/usersController.js");
const {body}=require("express-validator")
const fs=require("fs")
const usersPath = path.join(__dirname, "../database/users.json");
const logueado=require("../middlewares/logueado.js")
const json = fs.readFileSync(usersPath, "utf-8");
const users = JSON.parse(json);
let validationLogin=[
  body("Name").notEmpty().withMessage("el nombre debe estar completo").bail(),
/*   .custom((value,{req})=>{
    let name=users.find(elemento=>{
      return elemento.name==req.name
    })
    if(name){
      return true
    }
    else{
      throw new Error("nombre no existe")
    }
  
  }) */
/*   .custom((value,{req})=>{
    let password=users.find(elemento=>{
      return elemento.password==req.password
    })
    if(password){
      return true
    }
    else{
      throw new Error("contraseña incorrecta")
    }
  
  }), */
  body("email").notEmpty().withMessage("pone un email").bail()
  .isEmail().withMessage("pon un email valido"),
  body("Age").notEmpty().withMessage("pone una edad").bail(),

  body("password").notEmpty().withMessage("pone una contraseña").bail()
]

var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get("/login",logueado,loginForm)
 router.post("/login",validationLogin,login)
 router.get("/check",check)
 router.post("/olvidar",olvidar)

module.exports = router;
