const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'messages.json');

// --- MIDDLEWARE CONFIGURATIONS (Security & Parsing) ---
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parses incoming JSON data formats securely

// --- DATA ACCESS LAYER (JSON Database Helper Functions) ---
function readDatabase() {
    if (!fs.existsSync(DB_FILE)) {
        // If database doesn't exist, create an empty structured array file
        fs.writeFileSync(DB_FILE, JSON.stringify([]));
        return [];
    }
    const rawData = fs.readFileSync(DB_FILE);
    return JSON.parse(rawData);
}

function writeToDatabase(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// --- API ROUTE 1: GET MESSAGE ---
app.get('/api/message', (req, res) => {
    res.json({ 
        status: "Success",
        message: "Hello Jason! This message is coming directly from your local Node.js backend server." 
    });
});

// --- API ROUTE 2: SUBMIT CONTACT FORM (The Router) ---
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Server-Side Input Validation (Crucial for Backend Security)
    if (!name || !email || !message) {
        return res.status(400).json({ status: "Error", error: "All fields are required." });
    }

    // Assemble the data object payload with an absolute timestamp
    const newMessage = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        timestamp: new Date().toISOString()
    };

    try {
        // Read existing array list, append new data records, save back down to disk
        const currentMessages = readDatabase();
        currentMessages.push(newMessage);
        writeToDatabase(currentMessages);

        console.log(`📥 New Portfolio Message Received from: ${name}`);
        res.json({ status: "Success", message: "Thank you! Your message was securely logged into the JSON database." });
    } catch (err) {
        res.status(500).json({ status: "Error", error: "Database transaction failed." });
    }
});

// --- ENGINE ENGAGEMENT ---
app.listen(PORT, () => {
    console.log(`🚀 Full-Stack Server is running locally at http://localhost:${PORT}`);
});