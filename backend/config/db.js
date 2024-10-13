import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://vijithan678:eMkWqlJ6wWI77Jk2@cluster0.5zdu7.mongodb.net/food-del').then(() => console.log("DB Connected"));
}