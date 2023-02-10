const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;

// const { Schema, model } = require('mongoose');
// const reactionSchema = require('./Reaction');
// const dateFormat = require('../utils/Format');

// const thoughtSchema = new Schema({
//   thoughtText: {
//     type: String,
//     required: true,
//     minlength: 1,
//     maxlength: 280,
//     trim: true,
//   },
//   username: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//     get: (timestamp) => Format(timestamp),
//   },
//   reactions: [reactionSchema],
// }, {
//   toJSON: {
//     getters: true,
//   },
//   versionKey: false,
// });

// thoughtSchema.virtual('reactionCount').get(function() {
//   return this.reactions.length;
// });

// const Thought = model('Thought', thoughtSchema);

// module.exports = Thought;


