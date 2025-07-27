require('dotenv').config({ path: 'config.env' });
const mongoose = require('mongoose');
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
