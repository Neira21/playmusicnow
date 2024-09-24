import { sequelize } from '../../config/mysql.js'
import { DataTypes } from 'sequelize'

const tracks = sequelize.define('tracks', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist_nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist_nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration_start: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration_end: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mediaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default tracks