const router = require('express').Router();
const User = require('../models/user');
const List = require('../models/list');


//Add a task
router.post("/addTask", async (req, res) => {
    try {
        const { title, body, id } = req.body;
        if (!title || !body || !id) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findById(id);
        if (existingUser) {
            const list = new List({ title, body, user: id }); // Store user ID
            await list.save();
            return res.status(200).json({ message: "Task added successfully", task: list });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


// Update an existing task
router.put("/updateTask", async (req, res) => {
    const { _id, title, body } = req.body;
    try {
        if (!_id || (!title && !body)) {
            return res.status(400).json({ message: "Task ID and at least one field are required" });
        }

        const updatedTask = await List.findByIdAndUpdate(
            _id,
            { title, body },
            { new: true } // Return the updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
});


  

// Delete a task
router.delete("/deleteTask", async (req, res) => {
    try {
        const { taskId } = req.body; // Use the correct key
        const task = await List.findByIdAndDelete(taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
});



// Get all tasks for a user
router.get("/getTasks/:id", async (req, res) => {
    try {
        const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
        if (list.length > 0) {
            return res.status(200).json({ tasks: list });
        } else {
            return res.status(404).json({ message: "No tasks found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

  

module.exports = router;
