const { Schema, model } = require("mongoose");
const ItemSchema = require("./Item")

const BoxSchema = new Schema(
    {
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
    },
    {
        methods: {
            getBoxImageBuffersArr() {
                const itemArr = model('Item', this.items);
                const itemImageBuffersArr = itemArr.map(item => item.imageBuffer);
                return 'items';
            }
        },
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

// const Box = model('Box', BoxSchema);
module.exports = BoxSchema;
