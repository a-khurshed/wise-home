const express = require('express');
const axios = require('axios');

const logger = require('../../logger');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const restCountriesRes = await axios.get(
      `https://restcountries.com/v2/continent/${req.query.region}`
    );

    const countries = restCountriesRes.data;

    if (!(Array.isArray(countries) && countries.length > 0)) {
      return res.status(500).json({
        message: `REST Countries APIs seem to be down. Please check https://restcountries.com/v2/continent/${req.query.region} for confirmation.`,
      });
    }

    return res.json(countries);
  } catch (error) {
    logger.error(error.stack);

    return res
      .status(500)
      .json({ message: 'An unexpected error has occurred.', statusCode: 500 });
  }
});

module.exports = router;
