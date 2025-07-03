const categoryModel = require("../models/categoryModel.js");
const category = require("../models/categoryModel.js");

const getAllCategory = async(req, res) => {
    try {
        const categories = await categoryModel.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({message: "Error fetching Categories"});
    }
}

const postCategory = async(req, res) => {
    try {
        const {name} = req.body;
        if(!name) return res.json({message: "Name required for posting"});

        const existing = await categoryModel.findOne({name});
        if(existing) return res.json({message: "Category already exists"});

        const category = new categoryModel({name});
        await category.save();
        res.status(201).json(category);
        } catch (error) {
        res.status(500).json({message: "Error fetching Categories"});
    }
}

module.exports = {getAllCategory, postCategory};