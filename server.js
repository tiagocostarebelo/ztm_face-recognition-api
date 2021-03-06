const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex')

const register = require('./controlers/register'); 
const signin = require('./controlers/signin'); 
const profile = require('./controlers/profile'); 
const image = require('./controlers/image'); 
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

db.select('*').from('users')
    .then(data => {
    //   console.log(data)
    })

app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})

app.get('/', (req, res) => {res.send('Working smoothly')})
app.post('/signin', (req, res) => {signin.handleSignin (req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})
app.put ('/image', (req, res) => {image.handleImage(req, res, db)})
app.post ('/imageurl', (req, res) => {image.handleApiCall(req, res)})





