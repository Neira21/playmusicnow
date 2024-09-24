import express from 'express';
import { 
  getItems, 
  getItem, 
  createItem, 
  updateItem, 
  deleteItem
 } from '../controllers/tracks.js';
import { validatorCreateItem, validatorGetItem, validatorCreateItemMysql } from '../validators/tracks.js';
//import { customHeaderApiKey } from '../middlewares/customHeader.js';
import { authMiddleware } from '../middlewares/session.js';
import { checkRoleAuth } from '../middlewares/rol.js';

const tracksRouter = express.Router();

// Ruta get /tracks se ejecuta el middleware authMiddleware para verificar si el usuario está autenticado
tracksRouter.get("/tracks", authMiddleware, getItems)
tracksRouter.get("/tracks/:id", validatorGetItem, getItem)
tracksRouter.post("/tracks", validatorCreateItemMysql, createItem)
tracksRouter.put("/tracks/:id", validatorGetItem, validatorCreateItemMysql, updateItem)
tracksRouter.delete("/tracks/:id",validatorGetItem, deleteItem)


export default tracksRouter;



