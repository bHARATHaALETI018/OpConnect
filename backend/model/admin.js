const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminModel = mongoose.Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true },
    phone: { type: Number, trim: true, required: true, unique: true },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

adminModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

adminModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

const Admin = mongoose.model("Admin", adminModel);

module.exports = Admin;
