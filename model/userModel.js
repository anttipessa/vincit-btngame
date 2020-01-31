const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    points: {
        type: Integer,
        default: 20,
    },
    cookie: {
        type: Boolean,
        required: true
    }
});

const user = mongoose.model('User', userSchema);