const fs = require("fs");
const path = require("path");
const {validationResult}=require("express-validator")

let recordame=function(req,res,next){
   

   
    if(req.cookies.recordame!=undefined&&req.session.usuarioLogueado==undefined){
 let json = fs.readFileSync(
        path.join(__dirname, "../database/users.json"),
        "utf-8"
      );   
       const usuarios = JSON.parse(json); 
      let usuarioLogueado
        for(let i=0;i<usuarios.length;i++){
          if(usuarios[i].email==req.cookies.recordame){
            usuarioLogueado=usuarios[i]

          }
          break;
        }


        req.session.usuarioLogueado=usuarioLogueado
}
    next()
}
module.exports=recordame