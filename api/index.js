const cors    = require('cors');
const express = require('express');
const app     = express();
const {port, db: dbConfig} = require('./config');
const mongoose = require('mongoose');
const createPhotosRoutes = require('./routes/photos');
const userRoutes = require('./routes/users');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/v1/photos', createPhotosRoutes());
app.use('/api/v1/users', userRoutes);

const run = async () => {
    await mongoose.connect(
        dbConfig.host + '/' + dbConfig.database,
        {useNewUrlParser: true}
    );

    app.listen(port, () => {
        console.log("Server running at http://localhost:" + port);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(e => console.error(e));
