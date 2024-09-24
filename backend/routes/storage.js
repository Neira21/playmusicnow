import router from 'express';
import { uploadMiddleware } from '../utils/handleStorage.js';
import { getItems, getItem, createItem, deleteItem } from '../controllers/storage.js';
import { validatorGetItem } from '../validators/storage.js'

const storageRouter = router.Router();
//http://localhost:3000/api/storage


//getItems
storageRouter.get("/storage/", getItems)

//getItem
storageRouter.get("/storage/:id", validatorGetItem, getItem)

//usa "multi" en vez de "single" para subir varios archivos
storageRouter.post("/storage/", uploadMiddleware.single("myfile"), createItem )

//deleteItem
storageRouter.delete("/storage/:id", validatorGetItem, deleteItem)

export default storageRouter;