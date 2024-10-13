import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bycrypt from 'bcrypt';
import validator from "validator";

// Login user function
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                status: false,
                message: "User not found"
            });
        }

        // Check password match
        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                status: false,
                message: "Invalid Credentials"
            });
        }

        // Generate token
        const token = createToken(user._id);

        // Send response with userRole
        res.json({
            status: true,
            message: "Login Successful",
            token,
            userId: user._id,
            userRole: user.userRole // Include userRole in the response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error or Failed to login"
        });
    }
};


// Token creation function
const createToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return token;
}

// Register user function
const registerUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        // Check if user exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({
                message: "Email already exists",
                success: false
            });
        }
        // Validate email format and password
        if (!validator.isEmail(email)) {
            return res.json({
                message: "Invalid email format. Enter Valid Email!",
                success: false
            });
        }

        // Check password length
        if (password.length < 8) {
            return res.json({
                message: "Password must be at least 8 characters long",
                success: false
            });
        }

        // Hash the password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            userRole: "user"
        });

        // Save user to database
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({
            message: "User created successfully",
            success: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error when creating user"
        });
    }
};

// Update user password function
const updatePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                status: false,
                message: "User not found"
            });
        }

        // Check old password match
        const isMatch = await bycrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.json({
                status: false,
                message: "Old password is incorrect"
            });
        }

        // Validate new password length
        if (newPassword.length < 8) {
            return res.json({
                message: "New password must be at least 8 characters long",
                success: false
            });
        }

        // Hash the new password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(newPassword, salt);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        res.json({
            status: true,
            message: "Password updated successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
};

// Delete user account function
const deleteAccount = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                status: false,
                message: "User not found"
            });
        }

        // Delete the user account
        await userModel.deleteOne({ email });

        res.json({
            status: true,
            message: "Account deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
};

export { loginUser, registerUser, updatePassword, deleteAccount };
