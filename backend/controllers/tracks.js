import { matchedData } from 'express-validator';
import { models } from '../models/index.js';
import { handleHttpErrors } from '../utils/handleErrors.js';

const ENGINE_DB = process.env.ENGINE_DB;

export const getItems = async (req, res) => {
  try {
    const user = req.user;
    let data;
    if (ENGINE_DB === 'mysql') {
      data = await models.tracksModel.findAll();
    } else {
      data = await models.tracksModel.find();
    }
    res.send({data, user})
  } catch (error) {
    console.log("error", error)
    handleHttpErrors(res, 'ERROR_GET_ITEMS', 500) //3er parametro opcional, es 403
  }
}

export const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = ENGINE_DB = 'mysql' ? await models.tracksModel.findByPk(id) : await models.tracksModel.findById(id);
    res.send({data})
  } catch (error) {
    handleHttpErrors(res, 'ERROR_GET_ITEM') // 3er parametro opcional, es 403
  }
}

export const createItem = async (req, res) => {
  try {
    const body = matchedData(req)
    console.log("aaaaaaaaaaa")
    console.log(body)
    const data = await models.tracksModel.create(body);
    console.log(data)
    res.send({data})
  } catch (error) {
    console.log("ERROR", error)
    handleHttpErrors(res, 'ERROR_CREATE_ITEM') // 3er parametro opcional, es 403
  }
}

export const updateItem = async (req, res) => {
  try {
    const {id, ...body} = matchedData(req)
    ENGINE_DB === 'mysql' ? await models.tracksModel.update(body, {where: {id: id}}) : await models.tracksModel.findByIdAndUpdate(id, body)
    res.send({message: "Updated successfully"})
  } catch (error) {
    console.log("ERROR", error)
    handleHttpErrors(res, 'ERROR_UPDATE_ITEM') // 3er parametro opcional, es 403
  }
}

export const deleteItem = async (req, res) => {
  try {
    const {id} = matchedData(req)
    const data = ENGINE_DB === 'mysql' ? await models.tracksModel.destroy({where: {id: id}}) : await models.tracksModel.deleteOne({_id: id})
    console.log("data", data)
    // Si no se elimina ningún registro
    if (data === 0) {
      return res.status(404).send({ message: "Item not found or already deleted" });
    }
    // Si se elimina correctamente
    return res.status(200).send({ message: "Item deleted successfully" });
  } catch (error) {
    console.log("ERROR", error)
    handleHttpErrors(res, 'ERROR_DELETE_ITEM') // 3er parametro opcional, es 403
  }
}
