export const customHeaderApiKey = (req, res, next) => {
  try {
    
    const apikey = req.headers.apikey
    if(apikey !== '123456') {
      res.status(403)
      res.send({message: 'No tienes acceso, la key no es el correcto'})
      return
    }else{
      res.send({message: 'Tienes acceso'})
      next();
    }
  } catch (error) {
    res.status(403)
    res.send({message: 'Algo salió mal'})
  }
}