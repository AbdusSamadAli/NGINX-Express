const express = require('express');
const path = require('path');
const morgan = require('morgan'); // Import morgan for logging
const app = express();

// Middleware to log requests
app.use(morgan('combined', { stream: process.stdout })); // Log to console

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
let items = [];

app.get('/api/items', (req, res) => {
    res.json(items);
});

app.post('/api/items', (req, res) => {
    const newItem = req.body.item; 
    if (typeof newItem === 'string' && newItem.trim()) {
        items.push(newItem);
        return res.status(201).json({ message: 'Item added', item: newItem });
    }
    return res.status(400).json({ message: 'Invalid item' });
});

app.delete('/api/items/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (!isNaN(index) && index >= 0 && index < items.length) {
        const removedItem = items.splice(index, 1);
        return res.json({ message: 'Item deleted', item: removedItem });
    }
    return res.status(404).json({ message: 'Item not found' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

