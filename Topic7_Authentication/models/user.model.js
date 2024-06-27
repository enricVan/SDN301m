const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already taken"]
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    type: {
      type: String,
      enum: {
        values: ["system", "google", "facebook", "zalo"],
        message: "{VALUE} IS NOT SUPPORTED"
      },
      required: [true, "Type is required"]
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "role"
      }
    ]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
