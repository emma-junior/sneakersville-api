import mongoose from "mongoose";


// const reviewSchema = mongoose.Schema({
//     name: String,
//     rating: Number,
//     comment: String
// })

const productSchema = mongoose.Schema({
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

const AllProducts = mongoose.model('AllProducts', productSchema)

export default AllProducts