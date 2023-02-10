const { User, Thought } = require("../models");

const userController = {
  async getUsers(req, res) {
    console.log('hello')
    try {
      const dbDataUser = await User.find().select("-__v");
      res.json(dbDataUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const dbDataUser = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("friends")
        .populate("thoughts");

      if (!dbDataUser) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(dbDataUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getUsers(req, res) {
    try {
      const dbDataUser = await User.find().select("-__v");
      res.json(dbDataUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const dbDataUser = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("friends")
        .populate("thoughts");
      if (!dbDataUser) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(dbDataUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const dbDataUser = await User.create(req.body);
      res.json(dbDataUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const dbDataUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      );
      if (!dbDataUser) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(dbDataUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const dbDataUser = await User.findOneAndDelete({
        _id: req.params.userId,
      });
      if (!dbDataUser) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      await Thought.deleteMany({ _id: { $in: dbDataUser.thoughts } });
      res.json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      const dbDataUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!dbDataUser) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(dbDataUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const dbDataUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!dbDataUser) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(dbDataUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
