const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    product : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required: true,
    },
    quantity : {
        type: Number,
        default: 1,
    },
});

module.exports = mongoose.model("Cart", cartSchema);