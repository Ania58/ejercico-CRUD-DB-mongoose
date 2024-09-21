const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js"); 


router.post("/create", async(req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).send(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a task" });
    }
});

router.get("/", async(req,res) => {
    try {
        const tasks = await Task.find(); // Fetch all tasks from the database
        res.status(201).send(tasks);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to get all the tasks" });
    }
})

router.get("/id/:_id", async(req,res) => {
    try {
        const task = await Task.findById(req.params._id);
        if (!task) {
            return res.status(404).send({ message: "The task with the provided id does not exist" })
        }
        res.status(201).send(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "An error occurred while fetching the task" });
    }
})

module.exports = router;