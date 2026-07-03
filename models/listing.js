const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: {
        type: String,
        default: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?fm=jpg&q=60&w=3000&auto=format&fit=crop",
    },
    url: {
        type: String,
        default: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?fm=jpg&q=60&w=3000&auto=format&fit=crop",
    },
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;