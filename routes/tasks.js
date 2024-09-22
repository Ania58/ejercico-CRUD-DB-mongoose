const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js"); 


router.post("/create", async(req, res) => {
    try {
        const task = await Task.create(req.body);
        if (!req.body.title) {
            return res.status(400).send({ message: "Title is required" });
        }
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
        res.status(200).send(tasks);
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
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "An error occurred while fetching the task" });
    }
})


router.put("/markAsCompleted/:_id", async(req,res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params._id, // Use the ID from the URL
            { completed: req.body.completed }, // Update the `completed` field to true (or false; depending on the input)
            { new: true, runValidators: true } // Return the updated task
            );
        if (!task) {
            return res.status(404).send({ message: "The task with the provided id does not exist" })
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "An error occurred while fetching the task" });
    }
})


router.put("/id/:_id", async(req,res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params._id, // Use the ID from the URL
            { title: req.body.title },  // Update only the title
            { new: true }  // Return the updated document
            );
            console.log(task)
        if (!task) {
            return res.status(404).send({ message: "The task with the provided id does not exist" })
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "An error occurred while fetching the task" });
    }
})

router.delete("/id/:_id", async(req,res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params._id);
        if (!task) {
            return res.status(404).send({ message: "The task with the provided id does not exist" })
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "An error occurred while fetching the task" });
    }
})

module.exports = router;