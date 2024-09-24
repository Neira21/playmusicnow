import { sequelize } from "../../config/mysql.js";
import { DataTypes } from "sequelize";

import task from "./task.js";

const project = sequelize.define(
  "project",
  {
    project_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);


/**
 * Muchos proyectos pueden tener muchas tareas
 */
/*
project.belongsToMany(task, {
  through: "ProjectTasks",
  foreignKey: "project_id",
  otherKey: "task_id",
  onDelete: "CASCADE",
});
task.belongsToMany(project, {
  through: "ProjectTasks",
  foreignKey: "task_id",
  otherKey: "project_id",
  onDelete: "CASCADE",
});
*/

/**
 * Un proyecto puede tener muchas tareas
 */
project.hasMany(task, {
  foreignKey: "project_id",
  onDelete: 'CASCADE'
})

task.belongsTo(project, {
  foreignKey: "project_id",
})

/**
 * Un proyecto solo tiene una tarea
 */
/*
// Un Project tiene una Task (relación uno a uno)
Project.hasOne(Task, {
  foreignKey: 'projectId',
  sourceKey: 'id',
  onDelete: 'CASCADE'
});

// La Task pertenece a un Project (relación inversa uno a uno)
Task.belongsTo(Project, {
  foreignKey: 'projectId',
  targetKey: 'id',
  onDelete: 'CASCADE'
});
*/

export default project;
