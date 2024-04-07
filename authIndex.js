require('dotenv').config()
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


const app = express()
app.use(express.json())

const renewedToken = []

app.post('/token', (req, res) => {
    const renewedToken = req.body.token
    if (renewedToken == null) return res.sendStatus(401)
    if (renewedToken.includes(renewedToken)) return res.sendStatus(403)
    jwt.verify(renewedToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
if (err) return res.sendStatus(403)
const accessToken = generateAccessToken({name :user.name})
res.json({accessToken: accessToken})
    })
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const user = {name: username}

    const accessToken = generateAccessToken(user)
    const renewedToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    renewedToken.push(renewedToken)
    res.json({ accessToken: accessToken, renewedToken: renewedToken})
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'30m'})
}

app.listen(5000)

