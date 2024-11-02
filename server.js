const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const recipesRoute = require('./src/routes/ingredient');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use('/recipes', recipesRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
