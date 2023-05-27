const express = require('express');
const router = express.Router();
const { nanoid } = require('fix-esm').require('nanoid');
const multer = require('multer');
const path = require('path');
const { uploadPath } = require('./../config');
const Photo = require('../models/Photo');
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const createRoutes = () => {
    router.post('/', [auth, upload.single('image')], async (req, res) => {
        const photoData = { ...req.body };

        if (req.file) photoData.image = req.file.filename;
        else photoData.image = null;

        try {
            const photo = new Photo(photoData);

            res
                .status(201)
                .send(await photo.save());
        } catch (e) {
            res
                .status(400)
                .send(e);
        }
    });

    router.get('/', async (req, res) => {
        let query = {};

        if (req.query.user) {
            query.user = req.query.user;
        }

        if (req.query.username) {
            query.username = req.query.username;
        }

        try {
            res.send(await Photo.find(query).populate('user', 'username'));
        } catch (e) {
            res.sendStatus(500);
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            const result = await Photo.findById(req.params.id).populate('user', 'username');

            if (result) return res.send(result);

            res.sendStatus(404);
        } catch (e) {
            res.sendStatus(500);
        }
    });

    router.delete('/:id', auth, async (req, res) => {
        try {
            const photo = await Photo.findById(req.params.id);

            if (!photo) return res.sendStatus(404);

            await photo.deleteOne();

            res.send(photo._id);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    });

    return router;

};

module.exports = createRoutes;