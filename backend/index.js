import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Importar la conexión a la base de datos Mongo
import { connect } from "./config/mongo.js";

// Importar la conexión a la base de datos MySQL
import { dbConnectMysql } from "./config/mysql.js";

//Import all routes here using index
import routes from "./routes/index.js";

import fs from "fs";

// Morgan
import morgan from "morgan";
import morganBody from "morgan-body";


import { CreateTablesModels } from "./models/mysql/migration.js"

// Path y fileURLToPath
import { dirname, join } from "path";
import { fileURLToPath } from 'url';  // Importa para obtener __dirname

// Configurar el directorio base para el proyecto
const __filename = fileURLToPath(import.meta.url); // Obtener el nombre del archivo actual
const __dirname = dirname(__filename); // Obtener el directorio del archivo actual


const ENGINE_DB = process.env.ENGINE_DB

dotenv.config();
const port = process.env.PORT || 3000;

// Configurar express: crear aplicación | Configurar CORS | Configurar JSON para aceptar body JSON | carpeta storage pública | Configurar morgan
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("storage"))
app.use(morgan('dev'));

// Configurar el logger (morgan-body)
const logStream = fs.createWriteStream(join(__dirname, 'logs.txt'), { flags: 'a' });
morganBody(app, {
  stream: logStream, // Guardar los logs en un archivo
  logReqDateTime: false, // Opcional: No loguear fecha y hora
  logReqUserAgent: true, // Loguear el User Agent del cliente
});

// Ruta de inicio
app.get("/", (req, res) => {
  res.send("This is the home page");
})

import authRouter from "./routes/auth.js";
import tracksRouter from "./routes/tracks.js";
import storageRouter from "./routes/storage.js";
import projectRouter from "./routes/project.js";


// Configurar las rutas
app.use("/api", projectRouter);
app.use("/api", authRouter);
app.use("/api", tracksRouter);
app.use("/api", storageRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})


{ENGINE_DB === 'mongo' ? connect() : dbConnectMysql()}

{ENGINE_DB === 'mysql' ? CreateTablesModels() : null}


