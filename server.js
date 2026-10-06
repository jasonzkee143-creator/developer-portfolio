const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Global Cross-Origin Resource Sharing
app.use(cors());
app.use(express.json());

// Cloud Database Connection Configuration
const MONGO_URI = "mongodb+srv://jasonbelbestre:jasonzkee143@cluster0.onb7o.mongodb.net/portfolioDB?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
.then(() => console.log("✔️ Successfully connected to MongoDB Atlas Cloud Cluster!"))
.catch(err => console.error("❌ MongoDB Atlas Cloud Connection Failure:", err));

// --- 🗄️ DATABASE SCHEMA SPECIFICATIONS ---
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

const todoSchema = new mongoose.Schema({
    task: String,
    completed: { type: Boolean, default: false }
});
const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);

// --- 🌐 API ENDPOINT ROUTING MANAGEMENT ---

// Base Check Root Route
app.get('/', (req, res) => {
    res.json({ status: "Success", service: "Jason's Full-Stack Backend Engine Layer", online: true });
});

// Dynamic Contact Form Database Storage Router
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ status: "Error", error: "All form fields are strictly required." });
        }
        const newContactMessage = new Message({ name, email, message });
        await newContactMessage.save();
        res.status(201).json({ status: "Success", message: "Your encrypted message was delivered successfully!" });
    } catch (err) {
        console.error("Form transmission fault:", err);
        res.status(500).json({ status: "Error", error: "Internal server data persistence failure." });
    }
});

// Fetch All Todo Tasks Router
app.get('/api/todos', async (req, res) => {
    try {
        const activeTasks = await Todo.find();
        res.json(activeTasks);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch cloud task registers." });
    }
});

// Create New Todo Task Router
app.post('/api/todos', async (req, res) => {
    try {
        const { task } = req.body;
        if (!task) return res.status(400).json({ error: "Task content is required." });
        const newTodo = new Todo({ task });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: "Failed to store task in database cluster." });
    }
});

// Delete Todo Task Router
app.delete('/api/todos/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: "Task dropped from database cluster successfully." });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete task from database." });
    }
});

// Launch Continuous Backend Environment Listener
app.listen(PORT, () => {
    console.log(`🚀 Production server engine active on environment port ${PORT}`);
});
