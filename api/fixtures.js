const mongoose = require('mongoose');
const config = require('./config').db;
const Photo = require('./models/Photo');
const User = require('./models/User');
mongoose.connect(config.host + '/' + config.database);

const db = mongoose.connection;

db.once('open', async () => {
    try {
        await db.dropCollection('photos');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [user, john] = await User.create([
        {
            username: "user",
            password: "1111",
            token: null
        },
        {
            username: "John",
            password: "2222",
            token: null
        }
    ]);

    const [nature, sun, moon] = await Photo.create([
        {
            user: user._id,
            title: "Nature",
            image: "priroda.jpg"
        },
        {
            user: user._id,
            title: "Sun",
            image: "sun.jpg"
        },
        {
            user: john._id,
            title: "Moon",
            image: "moon.jpg"
        }
    ]);

    db.close();
});
