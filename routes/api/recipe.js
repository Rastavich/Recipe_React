const express = require('express');
const router = express.Router();

// @route   GET api/recipes
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Recipe Route'));

module.exports = router;