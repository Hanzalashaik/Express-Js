import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 25,
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 25,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    maxlength: 500,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("users", userSchema, "user");
