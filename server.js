require('dotenv').config();

const express= require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const route = express();

route.use(express.json());
const users = [
    {
        username: 'Joe',
        title: 'SE',
        password : bcrypt.hash('password1',10)
    },
    {
        username: 'Mosh',
        title: 'SSE',
        password : bcrypt.hash('password2',10)
    },
    {
        username: 'Sam',
        title: 'BOA',
        password : bcrypt.hash('password3',10)
    }
];
module.exports = users

route.get('/users', (req, res) => {
    res.json(users)//.filter(post => post.username === req.user.name));
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

route.listen(3000)