import multer from 'multer';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${__dirname}/../storage`
    cb(null, pathStorage)
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const filename = `${file.fieldname}-${Date.now()}.${ext}`
    cb(null, filename )
  }
})
  
const uploadMiddleware = multer({ storage: storage })  

export { uploadMiddleware }