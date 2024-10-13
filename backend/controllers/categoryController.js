import categoryModel from "../models/categoryModel.js";

// Add a new category
const addCategory = async (req, res) => {
    const { name } = req.body;
    const category = new categoryModel({ name });

    try {
        await category.save();
        res.json({ success: true, message: "Category added successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error adding category" });
    }
};

// List all categories
const listCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.json({ success: true, data: categories });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching categories" });
    }
};

// Remove a category
const removeCategory = async (req, res) => {
    try {
        await categoryModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Category removed successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error removing category" });
    }
};

// Update a category
const updateCategory = async (req, res) => {
    const { id, name } = req.body;
    try {
        await categoryModel.findByIdAndUpdate(id, { name });
        res.json({ success: true, message: "Category updated successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error updating category" });
    }
};

export { addCategory, listCategories, removeCategory, updateCategory };
