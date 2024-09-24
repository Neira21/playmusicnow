import { sequelize } from '../../config/mysql.js'
import Sequelize from 'sequelize'

const storage = sequelize.define('storages', {
    url: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    filename:{
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default storage