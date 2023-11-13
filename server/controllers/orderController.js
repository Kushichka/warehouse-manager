import { validationResult } from 'express-validator';

import { getRandomFromInterval } from '../helpers/getRandomFromInterval.js';
import { Goods } from '../models/goodsModel.js';
import { User } from '../models/user.js';

export const createOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.errors[0].msg);
    }
    
    try {
        const { email, amount } = req.body; // amount - orders to create
        const goods = await Goods.find();
        if (!goods) {
            return res.status(400).json('Goods error');
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json('User error');
        }

        for (let i = 0; i < amount; i++) {
            if (user.orders.length !== 5) { // max orders
                const randomGoods = getRandomFromInterval(0, goods.length - 1);
                const randomQuantity = getRandomFromInterval(1, 10); // from 1 to 10 pallets
                const currentDate = new Date();
                
                user.orders.push({
                    goods: goods[randomGoods]._id,
                    quantity: randomQuantity,
                    time: currentDate.setDate(currentDate.getDate() + 2), // 2 days form this order
                });
            }
        };

        await user.save();
        return res.status(200).json('Success');
    } catch (error) {
        console.error(error);
        return res.status(500).json('Order create error')
    }
}

export const changeOrderStatus = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors.errors[0].msg);
    }

    try {
        const { email, id, status } = req.body;

        const user = await User.findOne({ email: { $regex: email, $options: 'i' } }); // ignore register
        if (!user) {
            return res.status(400).json('User error');
        }

        const order = user.orders.find(order => order._id.toString() === id);
        if (!order) {
            return res.status(400).json('Order error');
        }

        order.status = status;
        await user.save();
        return res.status(200).json('Success');
    } catch (error) {
        console.error(error);
        return res.status(500).json('Change order status error');
    }
}