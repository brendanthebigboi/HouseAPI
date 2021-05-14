"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const database = require("./database");
const addHouse = require("./routes/addHouse");
const getUser = require("./routes/getUser");
const removeHouse = require("./routes/removeHouse");
const addHousePoints = require("./routes/addHousePoints");
const getHouse = require("./routes/getHouse");
const removeHousePoints = require("./routes/removeHousePoints");
const addUserPoints = require("./routes/addUserPoints");
const removeUserPoints = require("./routes/removeUserPoints");
const getHousePoints = require("./routes/getHousePoints");
const getUserPoints = require("./routes/getUserPoints");
const getLeaderboard = require("./routes/leaderboard");
const getHouseMembers = require("./routes/getHouseMembers");
const app = express();
const port = 3000;
app.use('/add_house', addHouse);
app.use('/get_user', getUser);
app.use('/remove_house', removeHouse);
app.use('/add_house_points', addHousePoints);
app.use('/remove_house_points', removeHousePoints);
app.use('/get_house', getHouse);
app.use('/add_user_points', addUserPoints);
app.use('/remove_user_points', removeUserPoints);
app.use('/get_house_points', getHousePoints);
app.use('/get_user_points', getUserPoints);
app.use('/leaderboard', getLeaderboard);
app.use('/house_members', getHouseMembers);
app.listen(port, '144.172.75.88', async () => {
    console.log(`Server is now listening at: http://144.172.75.88:${port}`);
    await database.createTables();
});