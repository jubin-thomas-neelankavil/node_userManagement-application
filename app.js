require('dotenv').config();

const { render } = require('ejs');
const express = require("express");
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override')
const  {flash}  = require('express-flash-message');
const session = require('express-session');
const connectDb = require('./server/confic/db');


const app = express();
const port = 5000 || process.env.PORT;

//connect to database  
connectDb();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
//static files
app.use(express.static('public'));

// Express session

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 24 * 7,  // one week
    }
}));

//Flash messages

app.use(flash({ sessionKeyName: 'flashMessage'}))

//templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');




app.use('/', require('./server/route/customer'))




//Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404');
})


app.listen(port, () => {
    console.log(`app.listen on port ${port}`)
})