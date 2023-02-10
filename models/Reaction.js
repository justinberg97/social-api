const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/Format');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => Format(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

module.exports = reactionSchema;

