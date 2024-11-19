const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    customer: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    total_money: {
        type: Number,
        required: true
    },
    payment_method: {
        type: String,
        enum: ["online", "on delivery"],
        default: "on delivery"
    },
    is_payment: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["pending", "confirm", "ship", "receive"],
        default: "pending"
    },
    cart_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "cart"
    }
})

module.exports = mongoose.model("order", orderSchema);