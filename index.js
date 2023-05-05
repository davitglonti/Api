const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const davlag = require("./data.json")
const app = express();
app.use(bodyParser.json());

// GET route to retrieve all items
app.get('/items', (req, res) => {
  // Read the data file
  console.log('heyyy')
  const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  console.log(data)
  // Send the items array back as the response
  res.json(data);
});

// POST route to add a new item
app.post('/items', (req, res) => {
  // Read the data file
  const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

  // Add the new item to the items array
  const newItem = req.body;
  console.log(req.body)
  newItem.id = data.length + 1;
  data.push(newItem);

  // Write the updated data back to the file
  fs.writeFileSync('data.json', JSON.stringify(data));

  // Send the updated items array back as the response
  res.json(data.items);
});

// PUT route to update an existing item
app.put('/items/:id', (req, res) => {
  // Read the data file
  const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

  // Find the item with the matching ID
  const id = parseInt(req.params.id);
  const item = data.items.find((i) => i.id === id);

  if (!item) {
    // If the item doesn't exist, return a 404 error
    res.status(404).json({ error: 'Item not found' });
  } else {
    // Update the item's properties
    const newItem = req.body;
    newItem.id = id;
    Object.assign(item, newItem);

   
    fs.writeFileSync('./data.json', JSON.stringify(data));

  
    res.json(data.items);
  }
});

// DELETE route to delete an item
app.delete('/items/:id', (req, res) => {
  // Read the data file
  const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

  // Find the index of the item with the matching ID
  const id = parseInt(req.params.id);
  const index = data.findIndex((i) => i.id === id);

  if (index === -1) {
    // If the item doesn't exist, return a 404 error
    res.status(404).json({ error: 'Item not found' });
  } else {
    data.splice(index, 1);
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.json(data);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port')})
