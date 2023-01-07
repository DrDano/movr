const { Schema, model } = require("mongoose");
const ItemSchema = require("./Item")

const BoxSchema = new Schema(
    {
        createdAt: {
            type: Date,
            default: Date.now,
        },
        roomName: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 280,
        },
        boxSize: {
            type: String,
            required: false,
            minLength: 1,
        },
        boxPacked: {
            type: Boolean,
            required: true,
        },
        items: [ItemSchema],
        boxContentsImage: {
            type: Buffer,
            required: false,
        },
        userId: {
            type: String,
            required: true,
        },
    }
);
