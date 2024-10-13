import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place the order
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    try {
        console.log('Received order data:', req.body); // Log the incoming request body

        const newOrder = new orderModel({
            userId: req.body.userId, // Check if this is correctly passed
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();
        console.log('Order saved successfully:', newOrder);

        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare line items for Stripe
        const lineItems = req.body.items.map((item) => ({
            price_data: {
                currency: 'gbp',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        lineItems.push({
            price_data: {
                currency: 'gbp',
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2000,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder.id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder.id}`,
        });

        res.json({
            session_url: session.url,
            success: true,
        });
    } catch (error) {
        console.error('Error in placeOrder:', error); // More specific error logging
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({
                success: true,
                message: "Payment Process Successfully Completed!!"
            });
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({
                success: false,
                message: "Payment Failed!!"
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

//user Orders
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body; // Destructure userId from the request body
        const orders = await orderModel.find({ userId });
        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error when fetching the orders"
        });
    }
};

//listing orders 
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({
            success: true,
            data: orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error When fetching all orders"
        })
    }
}

//update order status
const updateOrderStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({
            success: true,
            message: "Order status updated successfully"
        });
    } catch (error) {
        consolelog(error);
        res.json({
            success: false,
            message: "Error when updating order status"
        })
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateOrderStatus };
