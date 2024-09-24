import { sequelize } from '../../config/mysql.js'
import Sequelize from 'sequelize'

const users = sequelize.define('users', {
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
  }},
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default users