const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const PORT = 3000


MongoClient.connect('mongodb+srv://hilton-au:Lolcatz_12345@hilton.xh8yvub.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('atla-characters')
        const charactersCollection = db.collection('characters')
        app.use(bodyParser.urlencoded({extended: true}))
        app.set('view engine', 'ejs')
        app.get('/',(request, response) => {
            charactersCollection.find().toArray()
                .then(results => {
                    response.render('index.ejs',{characters: results})
                })
                .catch(error => console.error(error))

        })

        app.post('/characters',(request, response) => {
            charactersCollection.insertOne(request.body)
                .then(result =>{
                    response.redirect('/') 
                })
                .catch(error => console.error(error))
        })
        app.listen(PORT, () =>{
            console.log(`Listening on port: ${PORT}`)
        })
    })
    .catch(error => console.error(error))