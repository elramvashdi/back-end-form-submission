import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { downloadFile } from './utils/downloadFile.js';

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
      
      const link = 'https://uploads-ssl.webflow.com/5f7e0f9d75fee6f6f546df46/63f36e80cdf34e35f9c70bb9_note-taking.pdf';
      const fileName = 'pdffile';

      if (response.ok){
        const downloadPdfCode = downloadFile(link,fileName);
        // Send the response containing the JavaScript code
        res.send(downloadPdfCode);

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});