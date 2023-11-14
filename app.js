const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const User = require('./models/user');
var cors = require('cors');

const app = express();
const dotenv = require('dotenv');

//get config vars
dotenv.config();

app.use(cors());


const { nextTick } = require('process');
const userRoutes = require('./routes/user');
const exp = require('constants');



// app.use(bodyParser.json({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/user', userRoutes);



app.use(errorController.get404);

sequelize
    // .sync({force: true})
    .sync()
    .then(result => {
        // console.log(result);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

