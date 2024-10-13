import userModel from '../models/userModel.js';

// addtocart function
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({
            message: "Item added to cart successfully",
            status: true
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Failed to add item to cart",
            status: false
        });
    }
}

// remove items from usercart
const removeFromCart = async (req, res) => {
    try {
        // Find the user by ID
        let userData = await userModel.findById(req.body.userId);

        // Check if userData is null
        if (!userData) {
            return res.json({
                success: false,
                message: "User not found",
            });
        }

        // Access cartData
        let cartData = userData.cartData || {}; // Ensure cartData is defined

        // Check if the item exists in the cart
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

            // If the quantity becomes zero, you might want to remove the item from the cart
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }
        }

        // Update the user with the new cartData
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        res.json({
            message: "Item removed from cart successfully",
            status: true
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to remove item from cart",
        });
    }
}


//fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({
            cartData: cartData,
            status: true
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to fetch cart data",
        })
    }
}

export { addToCart, removeFromCart, getCart };
