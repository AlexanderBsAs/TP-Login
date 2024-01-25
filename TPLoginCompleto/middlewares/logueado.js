let logueado=function(req,res,next){
/*   if(req.session.usuarioLogueado==undefined){
    next()
  }
  else{ */
    /* let session=req.session.usuarioLogueado */
    if(req.session.usuarioLogueado!=undefined){
       /*  res.send(", ) */
res.render("users/logueado",{session: req.session.usuarioLogueado,body:req.body, color:req.session.usuarioLogueado.color})
    }
    else{
    res.render("users/login")
}
  /* } */
}

module.exports=logueado