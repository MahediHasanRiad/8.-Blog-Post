import { Schema, model } from "mongoose";

const signInSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid Email !`,
      },
      required: [true, "Valid Email required"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const SignIn = model('SignIn', signInSchema)

module.exports = SignIn
