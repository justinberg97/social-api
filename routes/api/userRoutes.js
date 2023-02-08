const express = require('express');
const router = express.Router();
const {
getUsers,
getSingleUser,
createUser,
updateUser,
deleteUser,
addFriend,
removeFriend,
} = require('../../controllers/user-controller');

const userRoutes = (app) => {
app.get('/', getUsers);
app.post('/', createUser);

app.get('/:userId', getSingleUser);
app.put('/:userId', updateUser);
app.delete('/:userId', deleteUser);

app.post('/:userId/friends/:friendId', addFriend);
app.delete('/:userId/friends/:friendId', removeFriend);
};

module.exports = router;

