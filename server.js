const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now} ${request.method} ${request.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('error occurred' + err);
        }
    });
    console.log(log);
    next();
});

app.use((req, res, next) => {
    //res.render('maintenance.hbs');
    next();
});

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageHeader: 'Home Page',
        welcomeMessage: 'Welcome to Node.js'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageHeader: 'About Page'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageHeader: 'We are currently in maintenance mode'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage : 'Error Handling Request'
    });
});
app.listen(3000, () => {
    console.log('server is up and running');
});
