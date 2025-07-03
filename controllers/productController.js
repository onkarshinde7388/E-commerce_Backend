const productModel = require("../models/productModel.js");

//All products 
const getAllProduct = async(req, res) => {
    try {
        const {category, search} = req.query;
        let filter = {};
        if(category) filter.category = category;
        if(search) filter.search = search;

        const products = await productModel.find(filter).populate(category);
        return res.json(products);
    } catch (error) {
        return res.status(500).json({sucess: false, message: error.message});
    }
};

//single product

const getProduct = async(req, res) => {
    try {
        const id = req.params;
        const product = await productModel.findById(id).populate(category);
        if(!product) return res.status(404).json({sucess:false, message: "Product not found"});
        res.json(product);

    } catch (error) {
        return res.status(500).json({sucess: false, message: error.message});
    }
}

//add product 
const createProduct = async(req, res) => {
    try {
        const {title, description, price, category} = req.body;
        const product = await new productModel({title, description, price, category});
        await product.save();
        res.json(product);
    } catch (error) {
        return res.status(500).json({sucess: false, message: error.message});
    }
}

//update product

const updateProduct = async(req, res) => {
    try {
       const id = req.params.id;
       const updated = await productModel.findByIdAndUpdate(id, req.body, {new: true});
       if(!updated) return res.status(404).json({message: "Product update failed"});
       return res.json();  
    } catch (error) {
        return res.status(500).json({sucess: false, message: error.message});
    } 
};

//delete
const deleteProduct = async(req, res) => {
    try {
        const id = req.body;
        const deleted = await productModel.findByIdAndDelete(id)
        if(!deleted) return res.status(401).json({message: "Failed to delete", error: error.message});
        return res.status(200).json({message:"Deleted Successfully"});
    } catch (error) {
        return res.status(500).json({sucess: false, message: error.message});
    }
};

module.exports = {getAllProduct, getProduct, updateProduct, deleteProduct, createProduct};