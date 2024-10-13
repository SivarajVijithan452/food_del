import foodModel from "../models/foodModel.js";
import fs from 'fs';

// add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });
    try {
        await food.save();
        res.json({
            message: "Food item added successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error when add food item" });
    }
}

// get all food
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            success: true,
            data: foods
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error when get food list"
        })
    }
}

// update food item
const updateFood = async (req, res) => {
    const { id, name, description, price, category } = req.body;
    let image_filename = req.file ? `${req.file.filename}` : null;

    try {
        const food = await foodModel.findById(id);
        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

        food.name = name;
        food.description = description;
        food.price = price;
        food.category = category;

        // Update image if new image is provided
        if (image_filename) {
            // Optionally delete the old image if it exists
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.log(err);
            });
            food.image = image_filename;
        }

        await food.save();
        res.json({
            success: true,
            message: "Food item updated successfully"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error when updating food item"
        });
    }
}


// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { });
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "Food item removed successfully"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error when remove food item"
        });
    }
}

export { addFood, listFood, removeFood, updateFood }
