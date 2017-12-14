console.log('May the Node be with you');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');


var db;

MongoClient.connect('mongodb://localhost:27017/star-wars-quotes', (err, database) => {
  if (err) return console.log(err);
  db = database.db('quotes');
  app.listen(3000, () => {
    console.log('listening on 3000')
  });
});


app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, results) => {
    if (err) return console.log(err);

    res.render('index.ejs', {quotes: results});
  });
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('saved to database');
    res.redirect('/');
  });
});
