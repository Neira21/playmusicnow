import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age:{
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role:{
      type: ["user", "admin"],
      default: 'user',
    }
  },
  {
    timestamps: true, // createdAt, updatedAt
    versionKey: false,
  }
)

export default mongoose.model('users', UserSchema);