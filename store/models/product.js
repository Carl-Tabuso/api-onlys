import { model, Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required.'],
        trim: true,
        unique: true,
        index: true,
    },
    price: {
        type: Number,
        required: [true, 'Product price is required.'],
    },
    remaining: {
        type: Number,
        default: 0,
    }},
    {
        timestamps: true,
    }
);

export default model('Product', productSchema);