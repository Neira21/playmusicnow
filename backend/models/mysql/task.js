import { sequelize } from "../../config/mysql.js";
import { DataTypes } from "sequelize";

const task = sequelize.define(
  "task",
  {
    task_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
    },
    done: {
      type: DataTypes.INTEGER,
    }
  },
  {
    timestamps: true,
  }
);





export default task;