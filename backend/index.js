// const express = require('express');
// const bodyParser = require('body-parser');
// const bfhlRoutes = require('./routes/bfhl');

// const app = express();
// app.use(bodyParser.json());

// app.use('/bfhl', bfhlRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;

// Configure CORS to allow specific origins
const corsOptions = {
  origin: [
    'http://localhost:5173', // Adjust port if necessary
    'https://shaad-bajaj-finserv-test-frontend.vercel.app',
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions)); // Enable CORS with specified options
app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
  console.log('Request Body:', req.body); // Add this line for debugging
  const { data } = req.body;
  const user_id = "786"; 

  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: 'Invalid input' });
  }

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));

  const lowercaseAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));
  const highestLowercaseAlphabet = lowercaseAlphabets.length
    ? [lowercaseAlphabets.sort().pop()]
    : [];

  res.json({
    is_success: true,
    user_id,
    email: "shaad@google.com",
    roll_number: "21BCE1542",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
  });
});

app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
