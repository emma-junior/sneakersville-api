import AllProducts from "../models/product.js"

export const getProducts = async (req, res) => {
    try {
        const items = await AllProducts.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getDetails = async (req, res) => {
    const { id: _id } = req.params;
    try {
        if (_id.match(/^[0-9a-fA-F]{24}$/)) {
            const foundItem = await AllProducts.findById(_id)

            res.status(200).json(foundItem)
        }       
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createProducts = async (req, res) => {
    const post = req.body;
    const newPost = new AllProducts(post);
    try {
        await newPost.save();

        res.status(201).json(newPost);
        console.log("Post Route Reached")
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

