const { Thought, User } = require('../models');

const thoughtController = {
    async getThoughts(req, res) {
    try {
    const dbDataThought = await Thought.find()
    .sort({ createdAt: -1 });
    res.json(dbDataThought);
    } catch (err) {
    console.log(err);
    res.status(500).json(err);
    }
    },
    async getSingleThought(req, res) {
    try {
    const dbDataThought = await Thought.findOne({ _id: req.params.thoughtId });
    if (!dbDataThought) {
    return res.status(404).json({ message: 'No luck!' });
    }
    res.json(dbDataThought);
    } catch (err) {
    console.log(err);
    res.status(500).json(err);
    }
    },
    async createThought(req, res) {
    try {
    const dbDataThought = await Thought.create(req.body);
    const dbDataUser = await User.findOneAndUpdate(
    { _id: req.body.userId },
    { $push: { thoughts: dbDataThought._id } },
    { new: true }
    );
    if (!dbDataUser) {
    return res.status(404).json({ message: 'Thought created but no user associated!' });
    }
    res.json({ message: 'Success!' });
    } catch (err) {
    console.log(err);
    res.status(500).json(err);
    }
    },
    async updateThought(req, res) {
    try {
    const dbDataThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
    if (!dbDataThought) {
    return res.status(404).json({ message: 'No thought associated with the id!' });
    }
    res.json(dbDataThought);
    } catch (err) {
    console.log(err);
    res.status(500).json(err);
    }
    },
    async deleteThought(req, res) {
    try {
    const dbDataThought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
    if (!dbDataThought) {
    return res.status(404).json({ message: 'Try again!' });
    }
    const dbDataUser = await User.findOneAndUpdate(
    { thoughts: req.params.thoughtId },
    { $pull: { thoughts: req.params.thoughtId } },
    { new: true }
    );
    if (!dbDataUser) {
    return res.status(404).json({ message: 'No user associated!' });
    }
    res.json({ message: 'Success!' });
    } catch (err) {
    console.log(err);
    res.status(500).json(err);
    }
    },
    async addReaction(req, res) {
        try {
          const dbDataThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
          );
          if (!dbDataThought) {
            return res.status(404).json({ message: 'Try again' });
          }
          res.json(dbDataThought);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
      
      async removeReaction(req, res) {
        try {
          const dbDataThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
          );
          if (!dbDataThought) {
            return res.status(404).json({ message: 'Try again!' });
          }
          res.json(dbDataThought);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      }
      
        
        
        
        
};

module.exports = thoughtController;