const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://transport:transport@transport.k3jil.mongodb.net/travel2';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Database is connected');
  })
  .catch(err => console.error('Database connection error:', err.message));
