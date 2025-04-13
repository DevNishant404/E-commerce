const mongoose = require("mongoose");
const Cart = require("../../models/cart");
const Product = require("../../models/product");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (
      !isValidObjectId(userId) ||
      !isValidObjectId(productId) ||
      quantity <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[itemIndex].quantity += quantity;
    }

    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const validItems = cart.items.filter((item) => item.productId);

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const items = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({ success: true, data: { ...cart._doc, items } });
  } catch (error) {
    console.error("Fetch cart items error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (
      !isValidObjectId(userId) ||
      !isValidObjectId(productId) ||
      quantity <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const items = cart.items.map((item) => ({
      productId: item.productId?._id ?? null,
      image: item.productId?.image ?? null,
      title: item.productId?.title ?? "Product not found",
      price: item.productId?.price ?? null,
      salePrice: item.productId?.salePrice ?? null,
      quantity: item.quantity,
    }));

    res.status(200).json({ success: true, data: { ...cart._doc, items } });
  } catch (error) {
    console.error("Update quantity error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!isValidObjectId(userId) || !isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId or productId",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();

    const items = cart.items.map((item) => ({
      productId: item.productId?._id ?? null,
      image: item.productId?.image ?? null,
      title: item.productId?.title ?? "Product not found",
      price: item.productId?.price ?? null,
      salePrice: item.productId?.salePrice ?? null,
      quantity: item.quantity,
    }));

    res.status(200).json({ success: true, data: { ...cart._doc, items } });
  } catch (error) {
    console.error("Delete cart item error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  addToCart,
  fetchCartItems,
  updateCartItemQty,
  deleteCartItem,
};
