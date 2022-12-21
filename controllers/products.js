import AllProducts from "../models/product.js";
import { verifyTokenAndAdmin } from "./verifyToken.js";

export const getProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await AllProducts.find().sort({ createdAt: -1 }).limit(6);
    } else if (qCategory) {
      products = await AllProducts.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await AllProducts.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateProducts =
  (verifyTokenAndAdmin,
  async (req, res) => {
    try {
      const updatedProduct = await AllProducts.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });

export const deleteProducts =
  (verifyTokenAndAdmin,
  async (req, res) => {
    try {
      await AllProducts.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

export const getDetails = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (_id.match(/^[0-9a-fA-F]{24}$/)) {
      const foundItem = await AllProducts.findById(_id);

      res.status(200).json(foundItem);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProducts = async (req, res) => {
  const post = req.body;
  const newPost = new AllProducts(post);
  try {
    await newPost.save();

    res.status(201).json(newPost);
    console.log("Post Route Reached");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
