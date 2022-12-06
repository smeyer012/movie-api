const express = require('express'),
    morgan = require('morgan');

const app = express();

let myFlix = [
    {
        title: 'Fight Club',
        director: 'David Fincher'
    },
    {
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino'
    },
    {
        title: 'The Silence of the Lambs',
        director: 'Jonathan Demme'
    },
    {
        title: 'Forrest Gump',
        director: 'Robert Zemeckis'
    },
    {
        title: 'Amélie',
        director: 'Jean-Pierre Jeunet'
    },
    {
        title: 'Inside Out',
        director: 'Pete Docter'
    },
    {
        title: 'The Wolf of Wall Street',
        director: 'Martin Scorsese'
    },
    {
        title: 'Pan\'s Labyrinth',
        director: 'Guillermo del Toro'
    },
    {
        title: 'Kill Bill: Vol. 1',
        director: 'Quentin Tarantino'
    },
    {
        title: 'Fargo',
        director: 'Joel Coen & Ethan Coen'
    }
];

app.use(express.static('public'));


//// GET requests

app.get('/', (req, res) => {
    res.send('Welcome!');
});

app.get('/movies', (req, res) => {
    res.json(myFlix);
});


//// Log errors

app.use(morgan('common'));


//// Listen

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});