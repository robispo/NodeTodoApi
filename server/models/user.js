const validator = require("validator");
const _ = require("lodash");

const { mongoose } = require("../db/mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = "auth";
  var token = jwt
    .sign({ _id: user._id.toHexString(), access }, "123456")
    .toString();

  user.tokens.push({ access, token });

  return user.save().then(() => token);
};

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ["email", "_id"]);
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
