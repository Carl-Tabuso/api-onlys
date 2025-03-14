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
    },
    featured: {
        type: Boolean,
        default: false,
    }, 
    rating: {
        type: Number,
        default: 0,
    },
    vendor: {
        type: String,
        enum: {
            values: ["Purefoods", "San Miguel", "Pampanga's Best"],
            message: 'Vendor named {VALUE} was not found',
        }
    }},
    {
        timestamps: true,
    }
);

export default model('Product', productSchema);