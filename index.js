const express = require('express'),
    morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
const Models = require('./models.js');
const ObjectId = mongoose.Types.ObjectId

const Users = Models.User; // makes users directly accessible for authentication

// This allows for bracket notation in order to use the request parameter as a variable, minimizing code redundancy
const myModels = {
    movies: Models.Movie,
    users: Models.User,
    directors: Models.Director,
    genres: Models.Genre
};

mongoose.set('strictQuery',false); // used to satisfy a deprecation warning

mongoose.connect('mongodb://0.0.0.0:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

//// GET requests

// Welcome msg
app.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Welcome!');
});

// Get all movies/users/directors/genres
app.get('/:dataType', passport.authenticate('jwt', { session: false }), (req, res) => {
    myModels[req.params.dataType].find()
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

// Get information about a movie/user/director/genre by title/name/username/id
app.get('/:dataType/:data', passport.authenticate('jwt', { session: false }), (req, res) => {
  let dataName = req.params.data;
  if(ObjectId.isValid(req.params.data)){
    myModels[req.params.dataType].findOne({_id: req.params.data})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  } else {
    myModels[req.params.dataType].findOne({ $or: [
      {Name: dataName},
      {Username: dataName},
      {Title: dataName}
    ]})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  }
});

//Add a user
/* We’ll expect JSON in this format
{
  Username: String,(required)
  Password: String,(required)
  Email: String,(required)
  Birthday: Date
}*/
app.post('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    myModels['users'].findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
            myModels['users']
            .create({
              Username: req.body.Username,
              Password: req.body.Password,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
});

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,(required)
  Password: String,(required)
  Email: String,(required)
  Birthday: Date
}*/
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  myModels['users'].findOneAndUpdate({ Username: req.params.Username }, { $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    myModels['users'].findOneAndUpdate({ Username: req.params.Username }, {
       $push: { Favorites: req.params.MovieID }
     },
     { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

// Remove a movie to a user's list of favorites
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    myModels['users'].findOneAndUpdate({ Username: req.params.Username }, {
       $pull: { Favorites: req.params.MovieID }
     },
     { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});


// Delete a user by username
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    myModels['users'].findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found');
        } else {
          res.status(200).send(req.params.Username + ' was deleted.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

// Update a movies's info, by ID
/* We’ll expect JSON in this format
{
  Title: String,(required)
  Description: String,(required)
  Genre: [String],
  Director: [String],
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
}*/
app.put('/movies/:ID', passport.authenticate('jwt', { session: false }), (req, res) => {
  myModels['movies'].findOneAndUpdate({ _id: req.params.ID }, { $set:
      {
        Title: req.body.Title,
        Description: req.body.Description,
        Genre: req.body.Genre,
        Director: req.body.Director,
        Actors: req.body.Actors,
        ImagePath: req.body.ImagePath,
        Featured: req.body.Featured,
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedMovie) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedMovie);
      }
    });
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