const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const recipesRoute = require('./src/routes/ingredient');
const userRoutes = require('./src/routes/user'); 
const favoriteRoutes = require('./src/routes/favorite'); 

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/recipes', recipesRoute);
app.use('/users', userRoutes);
app.use('/favorites', favoriteRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
