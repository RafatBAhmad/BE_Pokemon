const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
const app = express();
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))

const connectionString = "mongodb+srv://rafat:0123456789@cluster0.mxmxo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('QuotesApp')
        const quotesCollection = db.collection('quotes')

    // Middleware
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))

   app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(quotes => {
          res.render('index.ejs', { quotes: quotes })
        })
        .catch(/* ... */)
    })

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })

// Listening to PORT
    app.listen(PORT, function() {
        console.log(`listening on ${PORT}`)
    })

})
.catch(console.error)