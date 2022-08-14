const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 3000;
// json parser
app.use(express.json());


// routes
// app.get('/',(req, res) => {
//     return res.status(200).json({message: 'Hello World'})
// })
app.use('/api/v1/auth', require('./routes/auth'));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
