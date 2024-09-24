import users from './users.js';
import storage from './storage.js';
import tracks from './tracks.js';

import task from './task.js';
import project from './projects.js';
import { sequelize } from '../../config/mysql.js';

export const CreateTablesModels = async() => {
  try {
    // await users.sync({ alter: true });
    // await storage.sync({ alter: true });
    // await tracks.sync({ alter: true });
    // await project.sync({ alter: true });
    // await task.sync({ alter: true });
    await sequelize.sync({ alter: true });
    console.log("Syncronized successfully. Users");
  } catch (error) {
    console.log(error);
  }
}
