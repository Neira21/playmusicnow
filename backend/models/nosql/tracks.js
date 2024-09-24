import mongoose from 'mongoose';

const TracksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    album:{
      type: String,
    },
    cover:{
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: props => `${props.value} is not a valid URL!`
      }
    },
    artist:{
      name: {
        type: String,
      },
      nickname:{
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration:{
      start: {
        type: Number,
      },
      end:{
        type: Number,
      },
    },
    mediaId:{
      type: mongoose.Types.ObjectId,
    }
  },
  {
    timestamps: true, // createdAt, updatedAt
    versionKey: false,
  }
)

export default mongoose.model('tracks', TracksSchema);