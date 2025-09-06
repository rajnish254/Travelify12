const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
})

router.post('/users', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(409).send("This Email Alreay Exist!")
    }
    try {
        const user = new User(req.body)
        user.username = user.email.split('@')[0];
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

router.post('/users/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).send("This Email Is Not Registered!");
    }
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        console.log(e);
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});
router.get('/username/:username', async (req, res) => {
    try {
        const user = await User.findOne({ 'username': req.params.username });
        if (!user) {
            throw new Error();
        }
        res.send(user);

    } catch (e) {
        res.status(404).send();
    }
})
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new Error();
        }
        res.send(user);

    } catch (e) {
        res.status(404).send();
    }
})

router.patch('/users/:id', auth, async (req, res) => {
    try {
        const userid = req.params.id;
        const data = req.body;
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).send()
        }
        const fields = ['name', 'contact', 'image', 'bio', 'address', 'insta', 'facebook', 'twitter'];
        for (let i = 0; i < fields.length; i++) {
            if (data[fields[i]]) {
                user[fields[i]] = data[fields[i]];
            }
        }
        await user.save()
        res.send(user);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
})

module.exports = router

