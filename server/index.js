const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routers/');
require('dotenv').config({ path: '.env' });

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());
app.use('/api', router);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
};

const start = async () => {
  await connectToDatabase();
  startServer();
};

start();
