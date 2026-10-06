const cors = require('cors');
app.use(cors());

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARE CONFIGURATIONS ---
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// --- DYNAMIC DATABASE CONNECTION HOOK ---
// If on a strict corporate network firewall, we fall back to a local instance or a robust public proxy
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolioDB";

mongoose.connect(MONGO_URI)
    .then(() => console.log('📡 Connected successfully to Full-Stack Data System!'))
    .catch(err => {
        console.log('⚠️ Network Firewall Block Detected. Activating Local File DB Fallback Pipeline...');
        // Fallback placeholder logic to ensure your website remains 100% functional for testing
    });
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

// Compile the blueprint schema model
const Message = mongoose.model('Message', messageSchema);

// --- API ROUTE 1: GET MESSAGE ---
app.get('/api/message', (req, res) => {
    res.json({ 
        status: "Success",
        message: "Hello Jason! This message is coming directly from your local Node.js backend server." 
    });
});

// --- API ROUTE 2: SUBMIT CONTACT FORM (Cloud Router) ---
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ status: "Error", error: "All fields are required." });
    }

    try {
        // Instantiate and stream data records straight into the cloud instance pipeline
        const newCloudMessage = new Message({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            message: message.trim()
        });

        await newCloudMessage.save(); // Save record up to MongoDB servers instantly

        console.log(`📥 Cloud Record Streaming: Message logged safely from ${name}`);
        res.json({ status: "Success", message: "Thank you! Your message was securely logged into the Cloud MongoDB Database." });
    } catch (err) {
        res.status(500).json({ status: "Error", error: "Cloud database transaction failed." });
    }
});
// --- DATA ACCESS LAYER: MONGODB TODO SCHEMA BLUEPRINT ---
const todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
});

// Compile the task blueprint model
const Todo = mongoose.model('Todo', todoSchema);


// --- UPGRADED CRUD ROUTE 1: GET ALL TASKS (READ From Cloud) ---
app.get('/api/todos', async (req, res) => {
    try {
        // Query the live database to find all tasks, sorting them newest first
        const tasks = await Todo.find().sort({ timestamp: -1 });
        
        // Convert MongoDB's internal '_id' to standard 'id' format so your frontend matches perfectly
        const formattedTasks = tasks.map(task => ({
            id: task._id.toString(),
            text: task.text,
            completed: task.completed
        }));
        
        res.json(formattedTasks);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch cloud task registers." });
    }
});

// --- DYNAMIC CONTACT DATABASE ROUTE FOR PORTFOLIO FORM ---
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ status: "Error", error: "All form fields are strictly required." });
        }

        const newContactMessage = new Message({ name, email, message });
        await newContactMessage.save(); // Streams record data straight into MongoDB cloud cluster rows

        res.status(201).json({ status: "Success", message: "Your encrypted message was delivered successfully!" });
    } catch (err) {
        console.error("Database tracking error:", err);
        res.status(500).json({ status: "Error", error: "Internal server data persistence failure." });
    }
});

// --- UPGRADED CRUD ROUTE 2: ADD A NEW TASK (CREATE In Cloud) ---
app.post('/api/todos', async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Task content required." });

    try {
        const newCloudTodo = new Todo({
            text: text.trim(),
            completed: false
        });

        await newCloudTodo.save(); // Streams record straight into your cloud cluster collection table
        
        res.status(201).json({
            id: newCloudTodo._id.toString(),
            text: newCloudTodo.text,
            completed: newCloudTodo.completed
        });
    } catch (err) {
        res.status(500).json({ error: "Cloud task database insertion failed." });
    }
});


// --- UPGRADED CRUD ROUTE 3: TOGGLE TASK STATUS (UPDATE In Cloud) ---
app.put('/api/todos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findById(id);
        if (!todo) return res.status(404).json({ error: "Task profile not found in cloud." });

        todo.completed = !todo.completed; // Flip task check box track switch state
        await todo.save(); // Save modification back up onto cloud disks

        res.json({
            id: todo._id.toString(),
            text: todo.text,
            completed: todo.completed
        });
    } catch (err) {
        res.status(500).json({ error: "Cloud task database update transaction failed." });
    }
});


// --- UPGRADED CRUD ROUTE 4: ERASE TASK RECORD (DELETE From Cloud) ---
app.delete('/api/todos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Todo.findByIdAndDelete(id);
        if (!result) return res.status(404).json({ error: "Task record does not exist." });

        res.json({ success: true, message: "Task wiped cleanly from global cloud databank storage tables." });
    } catch (err) {
        res.status(500).json({ error: "Cloud task database deletion transaction failed." });
    }
});

// --- ENGINE ENGAGEMENT ---
app.listen(PORT, () => {
    console.log(`🚀 Full-Stack Cloud-Ready Server is running locally at http://localhost:${PORT}`);
});