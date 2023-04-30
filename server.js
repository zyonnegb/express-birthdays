const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const uri =
  'mongodb+srv://zyonnegb:Noble123@resilientcoders.0jj8y8p.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db, collection;

async function connectToMongo() {
  try {
    await client.connect();
    db = client.db('data');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }
}

connectToMongo();

app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('data').find().toArray()
    .then(result => {
      res.render('index.ejs', {data: result});
    })
});

app.get('/js/main.js', (req, res) => {
  res.sendFile(__dirname + '/js/main.js');
});

app.get('/css/style.css', (req, res) => {
  res.sendFile(__dirname + '/css/style.css');
});

// app.get(`/api`, (req, res) => { //generates hexcode
//   const { month, day, year } = req.query;
//   let hex;
//   if (month && day && year) {
//     hex = `#${month}${day}${year}`;
//   } else {
//     hex = '#000000';
//   }
//   res.json(hex);
//   res.redirect('/')
// });

app.post('/data', (req, res) => { //places data in Database
 
  
  
  let { month, day, year } = req.body;
  if (month === 'january') {
    month = '1F';
  } else if (month === 'february') {
    month = '2F';
  } else if (month === 'march') {
    month = '3F';
  } else if (month === 'april') {
    month = '4F';
  } else if (month === 'may') {
    month = '5F';
  } else if (month === 'june') {
    month = '6F';
  } else if (month === 'july') {
    month = '7F';
  } else if (month === 'august') {
    month = '8F';
  } else if (month === 'september') {
    month = '9F';
  } else if (month === 'october') {
    month = '1F';
  } else if (month === 'november') {
    month = '6F';
  } else if (month === 'december') {
    month = '7F';
  } else {
    return res.status(400).send('Invalid month value');
  }
 
  day = day.split('').reverse().join('');
  year = year.split('').slice(2).reverse().join('');
  let hexCode = [month, day, year];
  let monthMonth = req.body.month;
  let dayDay = req.body.day;
  let yearYear = req.body.year;
  hexCode = `#${hexCode.join('')}`;
  console.log('hi')


  db.collection('data').insertOne({monthMonth, dayDay, yearYear, hexCode}, (err, res) => {
  
    if (err) return res.send(500, err)
    console.log('Data saved to database');
  }); 

  res.redirect('/')

})

  
app.delete('/data', (req, res) => {
    db.collection('messages').findOneAndDelete({month: req.body.monthMonth, day: req.body.dayDay, year: req.body.yearYear, hex: req.body.hexCode}, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
})
  

  
app.use((req, res) => {
  res.status(404).send('Page not found')
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Internal Server Error')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
