const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    is_order: {
        type: Boolean,
        default: false
    },
    account_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "accounts"
    },
    items: [
        {
            food: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "foods"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
})

module.exports = mongoose.model("cart", cartSchema);