const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Array to hold items (in a real app, this would be in a database)
let items = [];

// Route to get items
app.get('/api/items', (req, res) => {
    res.json(items);
});

// Route to add an item
app.post('/api/items', (req, res) => {
    const newItem = req.body.item; // Extract the item from the object
    if (typeof newItem === 'string' && newItem.trim()) {
        items.push(newItem);
        return res.status(201).json({ message: 'Item added', item: newItem });
    }
    return res.status(400).json({ message: 'Invalid item' });
});


// Route to delete an item by index
app.delete('/api/items/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (!isNaN(index) && index >= 0 && index < items.length) {
        const removedItem = items.splice(index, 1);
        return res.json({ message: 'Item deleted', item: removedItem });
    }
    return res.status(404).json({ message: 'Item not found' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

