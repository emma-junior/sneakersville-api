import Users from "../models/user.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";

//Update User
export const updateUser =
  (verifyTokenAndAuthorization,
  async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }

    try {
      const updateUser = await Users.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json(err);
    }
  });

//Delete User
export const deleteUser =
  (verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      await Users.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (error) {
      res.status(500).json(err);
    }
  });

//Get User
export const getUser =
  (verifyTokenAndAdmin,
  async (req, res) => {
    try {
      const user = await Users.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Get All User
export const getAllUser =
  (verifyTokenAndAdmin,
  async (req, res) => {
    const query = req.query.new;
    try {
      const user = query
        ? await Users.find().sort({ _id: -1 }).limit(5)
        : await Users.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Get User stats
export const getUserStats =
  (verifyTokenAndAdmin,
  async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
      const data = await Users.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });
