const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const idValidator = require('mongoose-id-validator');

const PhotoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Пользователь обязателен']
    },
    title: {
        type: String,
        required: [true, 'Название обязательно']
    },
    image: {
        type: String,
        required: [true, 'Изображение обязательно']
    }
});

PhotoSchema.plugin(
    idValidator,
    {message: 'Передайте корректный идентификатор пользователя'}
);

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;