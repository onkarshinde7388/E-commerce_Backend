const cartModel = require("../models/cartModel.js");
const productModel = require("../models/productModel.js")

const getCart = async(req, res) => {
    try {
        const {userId} = req.body;
        if(!userId) return res.json({message: "userId not exists"})
        
        const items = await cartModel.find({userId}).populate("product");
        res.json(items);
    } catch (error) {
        return res.status(501).json({message: "Getting cart failed"});
    }
}

const addtoCart = async(req, res) => {
    try {
        const {userId, productId, quantity} = req.body;
        console.log(req.body);
        if(!userId || !productId) return res.json({message:"UserId and ProductId required"});
        const existing = await cartModel.findOne({userId, product: productId});
        if(existing) return res.json({message: "Item already existed"});

        const item = new cartModel({userId, product: productId, quantity: quantity ||1});
        await item.save();
        res.status(201).json({message: "Item added successfully"});
    } catch (error) {
        return res.status(501).json({message: "Add to cart failed",error: error.message});
    }
};

const deletefromCart = async(req, res) => {
    try {
        const {itemId} = req.params;
        const deleteItem = await cartModel.findByIdAndDelete(itemId);
        if(!deleteItem) return res.status(404).json({message: "cart item not found"});
        return res.json({message: "Delted from cart successfully!"});
    } catch (error) {
        return res.status(501).json({message: "Add to cart failed"});
    }
}

module.exports = {getCart, addtoCart, deletefromCart};