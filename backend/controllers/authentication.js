// const router = require('express').Router()
// const db = require("../models")
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

// const { User } = db

// router.post('/', async (req, res) => {
//     console.log('logging in with' + req.body);
//     const { email, password } = req.body;

//     let user = await User.findOne({
//         where: { email: req.body.email }
//     })

//     if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
//         res.status(404).json({ message: `Could not find a user with the provided username and password` })
//     } else {
//         const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET || 'default secret') 
//         res.cookie('token', token, { httpOnly: true });
          
//         res.json({ user: user, token: token });
//     }
// })

// router.get('/profile', async (req, res) => {
//     res.json(req.currentUser)
// })

// module.exports = router
const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {

    let user = await User.findOne({
        where: { email: req.body.email }
    })

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({ message: `Could not find a user with the provided username and password` })
    } else {
        req.session.userId = user.userId
        res.json({ user })
    }
})


router.get('/profile', async (req, res) => {
    res.json(req.currentUser)
})

module.exports = router