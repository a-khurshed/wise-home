const express = require('express');
const axios = require('axios');

const logger = require('../../logger');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const restCountriesRes = await axios.get(
      `https://restcountries.com/v2/continent/${req.query.region}`
    );

    res.json(restCountriesRes.data);
  } catch (error) {
    logger.error(error.stack);

    res
      .status(500)
      .json({ message: 'An unexpected error has occurred.', statusCode: 500 });
  }
});

module.exports = router;