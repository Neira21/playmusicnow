import { matchedData } from 'express-validator';
import { models } from '../models/index.js';
import { handleHttpErrors } from '../utils/handleErrors.js';
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const ENGINE_DB = process.env.ENGINE_DB;

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:3000';
const MEDIA_PATH = `${__dirname}/../storage`

export const getItems = async (req, res) => {
  try {
    let data;
    if(ENGINE_DB === 'mysql'){
      console.log("mysql")
      data = await models.storageModel.findAll();
    }else{
      data = await models.storageModel.find();
    }
    res.send({data})
  } catch (error) {
    handleHttpErrors(res, "ERROR_GET_STORAGE_ALL", 403)
  }
}

export const getItem = async (req, res) => {
  try{
    req = matchedData(req)
    const { id } = req
    console.log("id", id)
    const data = ENGINE_DB === 'mysql' ? await models.storageModel.findOne({where: {id: id}}) : await models.storageModel.findById(id)
    if (!data) {
      return res.status(404).send({ message: "Item not found" });
    }
    res.send({data});
  }catch(e){
    console.log("error", e)
    handleHttpErrors(res, "ERROR_GET_STORAGE_ONE", 403)
  }
}

export const createItem = async (req, res) => {
  try {
    const { file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await models.storageModel.create(fileData);
    res.send({data})
    
  } catch (error) {
    handleHttpErrors(res, "ERROR_CREATE_STORAGE", 403)
  }
}

export const deleteItem = async (req, res) => {
  try{
    const { id } = matchedData(req)
    console.log("id", id)
    const dataFile = ENGINE_DB === 'mysql' ? await models.storageModel.findOne({where: {id: id}}) : await models.storageModel.findById(id)
    if (!dataFile) {
      return res.status(404).send({ message: "Item not found" });
    }
    // Ruta del archivo
    const filePath = `${MEDIA_PATH}/${dataFile.filename}`;
    // Verificar si el archivo existe antes de intentar eliminarlo
    if (fs.existsSync(filePath)) {
      // Si el archivo existe, eliminarlo
      fs.unlinkSync(filePath);
    } else {
      console.log(`File not found: ${filePath}, skipping unlink`);
    }
    
    if(ENGINE_DB === 'mysql'){
      await models.storageModel.destroy({where: {id: id}})
    }else{
      await models.storageModel.deleteOne({_id: id})
    }
    const data= {
      filePath,
      deleted: 1
    }
    res.send({data});
  }catch(e){
    handleHttpErrors(res, "ERROR_DELETE_STORAGE", 403)
  }
}