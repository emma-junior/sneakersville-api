import AllCart from "../models/postCart.js";
import mongoose from "mongoose";

export const getCart = async (req, res) => {
    try {
        const items = await AllCart.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addCart = async (req, res) => {
    const post = req.body;
    const newPost = new AllCart(post);
    try {
        await newPost.save();

        res.status(201).json(newPost);
        console.log("Post Route Reached")
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const delCart = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post with that id");

    await AllCart.findByIdAndRemove(_id);
    res.json({ message: "cart item deleted successfully" });
}

export const incQty = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No cart with that id");
  
    const cart = await AllCart.findById(_id);
    const updatedCart = await AllCart.findByIdAndUpdate(
      _id,
      {
        quantity: cart.quantity + 1,
      },
      { new: true }
    );
    res.json(updatedCart);
};

export const decQty = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No cart with that id");
  
    const cart = await AllCart.findById(_id);
    if (cart.quantity > 1) {
        const updatedCart = await AllCart.findByIdAndUpdate(
            _id,
            {
            quantity: cart.quantity - 1,
            },
            { new: true }
        );
        res.json(updatedCart);
    } else {
        const cartqty = await AllCart.findByIdAndUpdate(
            _id,
            {
            quantity: cart.quantity,
            },
            { new: true }
        );
        res.json(cartqty);
    }
    
};