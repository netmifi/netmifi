const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const waitlistFilePath = path.join(__dirname, '../data/waitlist.json');

// Ensure the data directory exists
if (!fs.existsSync(path.dirname(waitlistFilePath))) {
    fs.mkdirSync(path.dirname(waitlistFilePath), { recursive: true });
}

// Read existing waitlist data or initialize an empty array
const readWaitlist = () => {
    try {
        const data = fs.readFileSync(waitlistFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return []; // Return empty array if file does not exist or is unreadable
    }
};

// Write waitlist data to the file
const writeWaitlist = (data) => {
    fs.writeFileSync(waitlistFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// POST route to handle form submissions
router.post('/', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }

    const waitlist = readWaitlist();
    waitlist.push({ name, email, timestamp: new Date().toISOString() });

    writeWaitlist(waitlist);

    res.status(201).json({ message: "Successfully added to the waitlist!" });
});

// GET route to retrieve waitlist (optional for debugging)
router.get('/', (req, res) => {
    res.json(readWaitlist());
});

module.exports = router;
