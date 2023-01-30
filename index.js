const express= require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();


const app= express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));


app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/padres', require('./routes/padres'));
app.use('/api/nineras', require('./routes/nineras'));
app.use('/api/login', require('./routes/auth'));
// app.use('/api/todo',require('./routes/busquedas'));
// app.use('/api/upload',require('./routes/uploads'));

app.listen(3000);