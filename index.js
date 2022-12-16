const express = require('express'),
    morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

let movies = [
    {
        id: 1,
        title: 'Fight Club',
        director: 'David Fincher',
        genres: ['comedy', 'drama', 'action']
    },
    {
        id: 2,
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino',
        genres: ['comedy', 'drama', 'action']
    },
    {
        id: 3,
        title: 'The Silence of the Lambs',
        director: 'Jonathan Demme',
        genres: ['horror', 'drama']
    },
    {
        id: 4,
        title: 'Forrest Gump',
        director: 'Robert Zemeckis',
        genres: ['comedy', 'drama']
    },
    {
        id: 5,
        title: 'Amélie',
        director: 'Jean-Pierre Jeunet',
        genres: ['drama']
    },
    {
        id: 6,
        title: 'Inside Out',
        director: 'Pete Docter',
        genres: ['comedy', 'drama', 'animation']
    },
    {
        id: 7,
        title: 'The Wolf of Wall Street',
        director: 'Martin Scorsese',
        genres: ['drama']
    },
    {
        id: 8,
        title: 'Pan\'s Labyrinth',
        director: 'Guillermo del Toro',
        genres: ['fantasy', 'drama', 'action']
    },
    {
        id: 9,
        title: 'Kill Bill: Vol. 1',
        director: 'Quentin Tarantino',
        genres: ['comedy', 'drama', 'action']
    },
    {
        id: 10,
        title: 'Fargo',
        director: 'Joel Coen & Ethan Coen',
        genres: ['comedy', 'drama']
    }
];

let users = [
    {
        username: 'jdrake123',
        id: "1",
        name: 'Jessica Drake',
        email: 'jdrake@gmail.com',
        dob: '10-05-1992',
        favorites: ["3", "5", "8"]
    },
    {
        username: 'ben_jamin',
        id: "2",
        name: 'Ben Cohen',
        email: 'ben_cohen@gmail.com',
        dob: '09-04-1982',
        favorites: ["2", "6", "7"]
    },
    {
        username: 'li_down',
        id: "3",
        name: 'Lisa Downing',
        email: 'lisa@hotmail.com',
        dob: '08-03-1922',
        favorites: ["4", "5", "9"]
    }
];

let directors = [
    { 
        name: 'David Fincher',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc viverra est eget nulla imperdiet, eget suscipit magna egestas. Nam interdum metus vitae posuere pulvinar. Aliquam vehicula suscipit lacus, hendrerit malesuada ipsum aliquam nec. In dapibus quam dolor, vel dapibus lectus eleifend quis.',
        movies: [1]
    },
    { 
        name: 'Quentin Tarantino',
        description: 'Integer lacinia magna nulla, in elementum enim semper vel. Morbi bibendum nisi eget mauris fermentum ultrices. Aliquam sodales imperdiet lectus, id egestas orci. Cras bibendum suscipit dui, non fermentum enim pellentesque nec. Nam lacinia tortor lectus.',
        movies: [2, 9]
    },
    { 
        name: 'Jonathan Demme',
        description: 'Duis lobortis est volutpat venenatis rutrum. Praesent commodo, erat nec faucibus faucibus, sem nibh hendrerit ex, at semper lectus velit sit amet nulla.',
        moveis: [3]
    },
    { 
        name: 'Robert Zemeckis',
        description: 'Etiam enim erat, aliquet sit amet velit sed, egestas dapibus lorem. Maecenas vitae urna mauris. Donec semper dapibus dapibus. In sed suscipit nulla.',
        movies: [4]
    },
    { 
        name: 'Jean-Pierre Jeunet',
        description: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut aliquet lacinia purus quis iaculis. Mauris cursus iaculis porttitor. Nunc lobortis pretium tortor vitae congue.',
        movies: [5]
    },
    { 
        name: 'Pete Docter',
        description: 'Sed convallis, purus id semper mattis, elit nulla faucibus odio, id sollicitudin mi orci in ante. Pellentesque posuere mauris elit, et bibendum elit laoreet et.',
        movies: [6]
    },
    { 
        name: 'Martin Scorsese',
        description: 'Sed convallis, purus id semper mattis, elit nulla faucibus odio, id sollicitudin mi orci in ante. Pellentesque posuere mauris elit, et bibendum elit laoreet et.',
        movies: [7]
    },
    { 
        name: 'Guillermo del Toro',
        description: 'Sed convallis, purus id semper mattis, elit nulla faucibus odio, id sollicitudin mi orci in ante. Pellentesque posuere mauris elit, et bibendum elit laoreet et.',
        movies: [8]
    },
    { 
        name: 'Joel Coen & Ethan Coen',
        description: 'Sed convallis, purus id semper mattis, elit nulla faucibus odio, id sollicitudin mi orci in ante. Pellentesque posuere mauris elit, et bibendum elit laoreet et.',
        movies: [10]
    },
];

let genres = [
    { 
        genre: 'comedy',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc viverra est eget nulla imperdiet, eget suscipit magna egestas. Nam interdum metus vitae posuere pulvinar. Aliquam vehicula suscipit lacus, hendrerit malesuada ipsum aliquam nec. In dapibus quam dolor, vel dapibus lectus eleifend quis.'
    },
    { 
        genre: 'drama',
        description: 'Integer lacinia magna nulla, in elementum enim semper vel. Morbi bibendum nisi eget mauris fermentum ultrices. Aliquam sodales imperdiet lectus, id egestas orci. Cras bibendum suscipit dui, non fermentum enim pellentesque nec. Nam lacinia tortor lectus.'
    },
    { 
        genre: 'horror',
        description: 'Duis lobortis est volutpat venenatis rutrum. Praesent commodo, erat nec faucibus faucibus, sem nibh hendrerit ex, at semper lectus velit sit amet nulla.'
    },
    { 
        genre: 'action',
        description: 'Etiam enim erat, aliquet sit amet velit sed, egestas dapibus lorem. Maecenas vitae urna mauris. Donec semper dapibus dapibus. In sed suscipit nulla.'
    },
    { 
        genre: 'fantasy',
        description: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut aliquet lacinia purus quis iaculis. Mauris cursus iaculis porttitor. Nunc lobortis pretium tortor vitae congue.'
    },
    { 
        genre: 'animation',
        description: 'Sed convallis, purus id semper mattis, elit nulla faucibus odio, id sollicitudin mi orci in ante. Pellentesque posuere mauris elit, et bibendum elit laoreet et.'
    },
];

//// GET requests

// Welcome msg
app.get('/', (req, res) => {
    res.send('Welcome!');
});

// Get all movies
app.get('/movies', (req, res) => {
    res.json(movies);
});

// Get information about a movie by title
app.get('/movies/:title', (req, res) => {
    res.json(movies.find((movie) =>
    { return movie.title === req.params.title }));
});

// Get information about a genre
app.get('/genres/:genre', (req, res) => {   
    res.json(genres.find((genre) => { return genre.genre === req.params.genre }));   
});

// Get information about a director
app.get('/directors/:director', (req, res) => {
    res.json(director = directors.find((director) => { return director.name === req.params.director }));
});

// Get list of all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Get a user's data by ID or username
app.get('/users/:userid', (req, res) => {
    let givenID = String(req.params.userid);
    let user = users.find((user) => { if (user.id === givenID || user.username === givenID ) { return true } });

    if (user) {
        res.json(user);
    }
    else {
        res.status(404).send('User was not found.');
    }    
});

// Add a user
app.post('/users', (req, res) => {
    let newUser = req.body;
  
    if (!newUser.username) {
      const message = 'Missing name in request body';
      res.status(400).send(message);
    } else {
      let user = users.find((user) => { return user.username === newUser.username });
      if (user) {
        res.status(404).send('Username is taken.');
      }
      else {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).send(newUser);
      }
    }
});

// Add or update a current user's information by id or username (username, password, email, date of birth, favorite movies, etc)
app.put('/users/:userid/:datatype/:data', (req, res) => {
    let givenID = String(req.params.userid);
    let user = users.find((user) => { if (user.id === givenID || user.username === givenID ) { return true } });
  
    if (user) {
      let key = req.params.datatype;
      let val = req.params.data;
      if (key == "favorites") {
        if ('favorites' in user) {
            let userFavs = user.favorites;
            if (!userFavs.includes(val)) {
                userFavs.push(val);
                user.favorites = userFavs;
                res.status(201).send('Movie was successfully added to User\'s Favorites');
            } else {
                res.status(500).send('Movie is already in Favorites.');
            }
        } else {
            user.favorites = [val];
        }
      } else if (key != "id" && key != "username") {
        user[key] = val;
        res.status(201).send('User\'s information was successfully updated');
      } else {
        res.status(500).send('Cannot change User\'s id or username.');
      }
    } else {
      res.status(404).send('User was not found.');
    }
});

// Deletes a user by ID or username
app.delete('/users/:userid', (req, res) => {
    let givenID = String(req.params.userid);
    let user = users.find((user) => { if (user.id === givenID || user.username === givenID ) { return true } });
  
    if (user) {
      users = users.filter((obj) => { if (obj.id !== givenID && obj.username !== givenID) { return true } });
      res.status(201).send('User was deleted.');
    } else {
        res.status(404).send('User was not found.');
    }
});


// Remove key/value pair with any value from user by ID or username(such as removing an email address)
app.delete('/users/:userid/:datatype/', (req, res) => {
    let givenID = String(req.params.userid);
    let user = users.find((user) => { if (user.id === givenID || user.username === givenID ) { return true } });
  
    if (user) {
      let key = req.params.datatype;
      if (key == "username" || key == "id") {
        res.status(500).send('Cannot remove username or id from user.');
      }
      else {
        if (key in user) {
            delete user[key];
        } else {
            res.status(404).send('Data not found for user with the id ' + req.params.id + '');
        }
        res.status(201).send('Data was removed from ' + user.username + '.');
      }
    } else {
      res.status(404).send('User was not found.');
    }
});

// Remove key/value pair with a known value from user by ID or usernam (such as a movie from user's list of favorites)
app.delete('/users/:userid/:datatype/:data', (req, res) => {
    let givenID = String(req.params.userid);
    let user = users.find((user) => { if (user.id === givenID || user.username === givenID ) { return true } });
  
    if (user) {
      let key = req.params.datatype;
      let val = req.params.data;
      if (key == "username" || key == "id") {
        res.status(500).send('Cannot remove username or id from user.');
      }
      else {
        if (key in user) {
            if (key == "favorites") {
                let userFavs = user.favorites;
                userFavs = userFavs.filter(function(value){ 
                    return value != val;
                });
                user.favorites = userFavs;
            } else {
                delete user[key];
            }
        } else {
            res.status(404).send('Data not found for user with the ' + msg + '');
        }
        res.status(201).send('Data was removed from ' + user.username + '.');
      }
    } else {
      res.status(404).send('User was not found.');
    }
});


//// Log errors

app.use(morgan('common'));


//// Handle Errors

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


//// Listen

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});