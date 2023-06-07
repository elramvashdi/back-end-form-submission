const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Route handler for the root URL
app.post('/', (req, res) => {
  res.status(200).send('Success'); // Return a 200 response with the message "Success"
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});