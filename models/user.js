const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    // ADD THIS NEW FIELD
    profile: {
        interests: [String],
        strengths: [String],
        personality: [String]
    }
});

// ... (passport-local-mongoose plugin remains the same)
userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    errorMessages: {
        UserNotFoundError: 'No user with that email was found.',
        IncorrectPasswordError: 'The password you entered is incorrect.'
    }
});


module.exports = mongoose.model('User', userSchema);