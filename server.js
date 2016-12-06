/**
 * Created by william.reilly on 12/5/16.
 */

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// __dirname
/*
$ pwd
/Users/william.reilly/dev/Node/Udemy-NODE-Complete-Developer-Course-Mead/05WebApp/node-web-server
 */

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Move STATIC *below* our "Maintenance Page" check
// app.use(express.static(__dirname + '/public'));


// EXPRESS MIDDLEWARE
app.use( (req, res, next) => {
    let now = new Date().toString();

let log = `${now}: hoo-ha : ${req.method} ${req.url} ${req.originalUrl}`; // TO TERMINAL! Not Browser.

// NODE V6:
fs.appendFile('server.log', log + '\n');
// NODE V7:
/*
fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
        console.log('Huh. Unable to append to server.log!');
    }
});
*/

console.log('log! : ', log);
next(); // Gotta call this, eventually!

});

app.use( (req, res, next) => {
   res.render('maintenance.hbs');
    // For our MAINTENANCE Page, we do NOT call any "next()" - We just let it/the-user SIT THERE
    // (till kingdom come...)
});

// Move STATIC *below* our "Maintenance Page" check
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});

let currentYearFing = new Date().getFullYear();

app.get('/', (req, res) => {
    res.render('home.hbs', {
    pageTitle: 'HOME Page data thing',
        welcomeMessage: 'Something for you here on top',
    // currentYear: currentYearFing, << Now a HELPER
});
    /*res.send({
        heho: 'ten',
        json: 'yes'
    });*/
});

app.get('/about', (req, res) => {
    // res.send('About info in text');
res.render('about.hbs', {
    pageTitle: 'About Page data thing',
    // currentYear: currentYearFing, << Now a HELPER
});
});

app.get('/wrong-o', (req, res) => {
    // res.send('A mis-take has been ma-de.');
res.send({
    errorMessage: 'A mis-take a la JSON has be-en ma-a-a-de'
});
});

app.listen(3000, () => {
    console.log('Server is up on port :3000. Thanks, Express.');
});