const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { data } = req.body;
  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, error: 'Invalid input format' });
  }

  const numbers = data.filter(item => typeof item === 'number');
  const alphabets = data.filter(item => typeof item === 'string' && item.length === 1);

  const highestLowercase = alphabets
    .filter(c => c >= 'a' && c <= 'z')
    .sort()
    .pop() || '';

  res.json({
    is_success: true,
    user_id: '786',
    email: 'shaad@google.com',
    roll_number: '21BCE1542',
    numbers,
    alphabets,
    highest_lowercase: highestLowercase
  });
});

router.get('/', (req, res) => {
  res.json({ operation_code: 1 });
});

module.exports = router;
