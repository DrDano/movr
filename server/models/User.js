const { Schema, model, mongoose } = require("mongoose");
const BoxSchema = require("./Box");

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 280,
        },
        sub: {
            type: String,
            required: true,
            minLength: 1,
        },
        sid: {
            type: String,
            required: true,
            minLength: 1,
        },
        box: {
            type:BoxSchema,
        }
    },
    {
        collection: 'Users',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        query: {
            getAllBoxes(){
                const boxData = this.find({}).select('box');
                return boxData;
            }
        },
        statics: {
            getUser(subId){
                return this.where({sub: subId});
            },
        },
    }
);

const User = model('User', UserSchema);
module.exports = User;