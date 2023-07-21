const schedule = require('node-schedule');
const express = require("express");

const app = express();
// const date = new Date("2023-07-21");
schedule.scheduleJob("*/15 * * * * *", () => {
    console.log("---------------------");
    console.log("running a task every 15 seconds");
})
app.listen(3000, () => {
    console.log("application listening.....");
});