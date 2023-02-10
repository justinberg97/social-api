
const router = require("express").Router();
const {
getThoughts,
getSingleThought,
createThought,
updateThought,
deleteThought,
addReaction,
removeReaction,
} = require("../../controllers/thoughtController");

// Define routes for thoughts
router.get("/", getThoughts);
router.post("/", createThought);

// Define routes for a single thought
router.get("/:thoughtId", getSingleThought);
router.put("/:thoughtId", updateThought);
router.delete("/:thoughtId", deleteThought);

// Define routes for reactions of a thought
router.post("/:thoughtId/reactions", addReaction);
router.delete("/:thoughtId/reactions/:reactionId", removeReaction);

module.exports = router;