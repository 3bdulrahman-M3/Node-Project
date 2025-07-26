const express = require('express');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
