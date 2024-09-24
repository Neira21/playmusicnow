import { Sequelize } from "sequelize";

const database = process.env.DB_NAME || "test";
const username = process.env.DB_USER || "root";
const password = process.env.DB_PASS || "";
const host = process.env.DB_HOST || "localhost";
const port = process.env.DB_PORT || 3306;
const dialect = process.env.DB_DIALECT || "mysql";

export const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
});


export const dbConnectMysql = async() => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log(error);
  }
}


// import users from "../models/mysql/tracks.js";
// import storage from "../models/mysql/storage.js";
//import tracks from "../models/mysql/tracks.js";
