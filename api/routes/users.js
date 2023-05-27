const router = require('express').Router();
const User = require('../models/User');
const auth = require("../middleware/auth");

router.post('/', async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });

        user.generateToken();
        await user.save();

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) return res
        .status(400)
        .send({error: 'Username or password incorrect'});

    if (!await user.checkPassword(req.body.password.toString())) return res
        .status(400)
        .send({error: 'Username or password incorrect'});

    try {
        user.generateToken();
        await user.save();

        res.send(user);
    } catch (e) {
        res
            .status(400)
            .send({error: e.message});
    }
});

router.get('/profile', auth, async (req, res) => {
    res.send({
       message: "Секрет",
       username: req.user.username
    });
});

router.delete('/logout', auth, async (req, res) => {
    req.user.token = null;
    req.user.save();

    res.send({message: 'Success'});
});

module.exports = router;
