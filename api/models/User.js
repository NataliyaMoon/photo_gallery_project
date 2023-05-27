const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { nanoid } = require('fix-esm').require('nanoid');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        validate: {
            validator: async function (username) {
                const user = await User.findOne({username});

                return !user || user._id.toString() === this._id.toString();
            },
            message: "This user is already exists"
        }
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false,
        validate: {
            validator: async function (token) {
                if (!token) return true;

                const user = await User.findOne({token});
                return !user || user._id.toString() === this._id.toString();
            },
            message: "Token duplicated"
        }
    }
});

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;

        return ret;
    }
});

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password)
};

UserSchema.methods.generateToken = function () {
    this.token = nanoid();
}

const User = mongoose.model('User', UserSchema);

module.exports = User;