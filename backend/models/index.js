const ENGINE_DB = process.env.ENGINE_DB;

const pathModel = (ENGINE_DB === 'mongo') ? './nosql/' : './mysql/';

// PARA PASAR DE MYSQL A MONGO, se deben importar los modelos de acuerdo al motor de base de datos

//Cambiar el import de acuerdo al motor de base de datos, no se puede usar ${pathModel} porque no se puede importar dinamicamente
//import usersModel from `${pathModel}users.js`;
//import tracksModel from `${pathModel}tracks.js`;
//import storageModel from `${pathModel}storage.js`;

// Por lo que se puede hacer un if ternario para importar el modelo de acuerdo al motor de base de datos

//import usersModel from './mysql/users.js';
//import tracksModel from './mysql/tracks.js';
//import storageModel from './mysql/storage.js';

//import usersModel from './nosql/users.js';
//import tracksModel from './nosql/tracks.js';
//import storageModel from './nosql/storage.js';

import usersModel from './mysql/users.js';
import tracksModel from './mysql/tracks.js';
import storageModel from './mysql/storage.js';

export const models = {
  usersModel,
  tracksModel,
  storageModel
}