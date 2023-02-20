const { Schema, model } = require("mongoose");
const {sharp} = require('sharp');

const ItemSchema = new Schema(
    {
        createdAt: {
            type: Date,
            default: Date.now,
        },
        itemName: {
            type: String,
            required: false,
            trim: true,
            minlength: 1,
            maxlength: 280,
        },
        roomName: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 280,
        },
        itemSize: {
            type: Number,
            enum: [1, 2, 3],
            required: false,
        },
        imageBuffer: {
            type: Buffer,
            required: false,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    {
        methods: {
            async generateItemImageBuffer(image) {
                try {
                    const buffer = await sharp(image)
                        .resize({
                            width: 100,
                            height: 66,
                            fit: 'cover',
                        })
                        .toFormat('gif')
                        .toBuffer((err, data, info) => {
                            if (err) {
                                return err;
                            }
                            return {data, info};
                        });
                    return buffer;
                } catch (err) {
                    return err;
                }
            }
        },
    }
);

// const Item = model('Item', ItemSchema);
module.exports = ItemSchema;