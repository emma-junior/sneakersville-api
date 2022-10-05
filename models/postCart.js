import mongoose from "mongoose";


const cartSchema = mongoose.Schema({
    title: String,
    description: String,
    imageOne: String,
    imageTwo: String,
    imageThree: String,
    imageFour: String,
    price: Number,
    formerPrice: Number,
    categories: [{
        type: String
    }],
    quantity: {
        type: Number,
        default: 1
    },
    tag: [{
        type: String
    }],
    sizes: [{
        type: String
    }],
    reviewerName: String
})

const AllCart = mongoose.model('AllCart', cartSchema)

export default AllCart