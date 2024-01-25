const fs = require("fs");
const path = require("path");
const {validationResult}=require("express-validator");
const session = require("express-session");
let json = fs.readFileSync(
    path.join(__dirname, "../database/users.json"),
    "utf-8"
  );
const usuarios = JSON.parse(json);


const usersController={
    loginForm:(req,res)=>{
     console.log("informacion de color login")
     console.log(req.session.usuarioLogueado.color)
     if(req.session.usuarioLogueado!=undefined){
      res.render("users/logueado")
    }
    else{
       res.render("users/login")
    }
    
 
    },
    login:(req,res)=>{
        let json = fs.readFileSync(
            path.join(__dirname, "../database/users.json"),
            "utf-8"
          );
          let usuarioLogueado=undefined
        const usuarios = JSON.parse(json);
        const errors=validationResult(req)
        let usuarios2=usuarios.find(elemento=>{
            return elemento.name==req.body.name
          })
          let contraseñas=usuarios.find(elemento=>{
            return elemento.password==req.body.password
          })
         


          if(errors.isEmpty()){
            let usuarioName=usuarios.find(elemento=>{
                return elemento.name==req.body.Name
            })

            for(let i=0;i<usuarios.length;i++){
              if(usuarios[i].name==req.body.Name){
                if(usuarios[i].password==req.body.password){

                  usuarioLogueado=usuarios[i]
                }
              }
              break;
              
              
            }

            if(usuarioLogueado==undefined){
              res.render("users/login",{errors:errors.array(),old:req.body})
            }
            let usuarios2=usuarios.find(elemento=>{
              return elemento.name==req.body.Name
            })
            

            req.session.usuarioLogueado=usuarioLogueado
            req.session.usuarioLogueado.color=req.body.color
            if(req.body.recordame!=undefined){
              res.cookie("recordame",usuarioLogueado.email,{maxAge:60000*10})
            }

            res.render("users/logueado",{session: req.session.usuarioLogueado,body:req.body, color:req.session.usuarioLogueado.color})
           


          }
        
          else{
            res.render("users/login",{errors:errors.array(),old:req.body})
          }

        
        
        },
         check:function(req,res){
          if(req.session.usuarioLogueado!=undefined){
            res.render("users/check",{session:req.session.usuarioLogueado,color:req.session.usuarioLogueado.color})
          }
          else{
            res.send("no estas logueado")
          }
         },
         olvidar:function(req,res){
          if(req.body.olvidar!=undefined){
            req.session.usuarioLogueado.color="white"
            
          }
res.redirect("/users/login")
         }
    }


module.exports= usersController