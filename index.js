import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS with allowed origin set to "www.wordtune.com"
app.use(cors({
  origin: 'https://www.wordtune.com'
}));

// Parse JSON body
app.use(bodyParser.json());

// Route handler for the root URL
app.post('/', async (req, res) => {
  const email  = new URLSearchParams( req.body ).toString(); // Assuming the email is sent as part of the request body

  if (email) {
    try {
      // Send the email data as JSON in the request body
      const response = await fetch(`https://script.google.com/macros/s/AKfycbyBRW8H1bWV5GTCAfQRzHnYt_1RENkgbr6YmchR-bwYi2QECJmkBJ28zvmOcwlZNO9pUQ/exec?${ email }`, {
        method: 'GET',
      });
      if (response.ok){
        // Get the PDF data from the URL
        const pdfResponse = await fetch('https://www.orimi.com/pdf-test.pdf');
        const arrayBuffer = await pdfResponse.arrayBuffer();
        const pdfBuffer = Buffer.from(arrayBuffer);
        
        // Set the response headers for the PDF file
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=download.pdf');
        
        // Send the PDF file to the user
        res.attachment('download.pdf');
        res.send(pdfBuffer);
      }
      else{
        console.error('Error:', response.status);
        res.status(500).json({ error: 'Internal Server Error' }); // Return an error if there was an issue with the request
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' }); // Return an error if there was an issue with the request
    }
  } else {
    res.status(400).json({ error: 'Email not provided' }); // Return an error if email is missing
  }
});

// Utility function to convert a stream to a buffer
function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', (error) => reject(error));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
