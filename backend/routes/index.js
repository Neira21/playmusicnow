import { Router } from "express";
import fs from "fs";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const removeExtension = (filename) => {
  return filename.split('.').shift();
}

// Leer archivos del directorio actual
fs.readdirSync(__dirname).forEach(file => {
  const name = removeExtension(file);

  // Ignorar el archivo index.js y asegurarse de que sea un archivo .js
  if (name !== 'index' && file.endsWith('.js')) {
    
    const route = `./${file}`;
    import(route).then((module) => {
      router.use(`/${name}`, module.default);
    }).catch((error) => {
      console.error(`Error al cargar la ruta ${file}:`, error);
    });
  }
});

export default router;