const express = require('express');
const { json } = require('express/lib/response');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

// insert your scraper API key as an argument in the below function...
const generateScraperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json()); // allows app to parse json input -> i.e. middleware - converts client data into json before it reaches the server

app.get('/', (req, res) => {
  res.end(`Server running on ${PORT}`);
});

// GET product details. Uses request method to fetch product details by id from params.
app.get('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateBaseUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`
    );

    res.status(200).json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// GET product reviews. Uses request method to fetch product reviews by id from params.
app.get('/products/:id/reviews', async (req, res) => {
  const productId = req.params.id;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateBaseUrl(
        api_key
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    );

    res.status(200).json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// GET product offers. Uses request method to fetch product offers by id from params.
app.get('/products/:id/offers', async (req, res) => {
  const productId = req.params.id;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateBaseUrl(
        api_key
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );

    res.status(200).json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// GET search results. Uses request method to search by id from params.
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateBaseUrl(
        api_key
      )}&url=https://www.amazon.com/s?k=${searchQuery}`
    );

    res.status(200).json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
