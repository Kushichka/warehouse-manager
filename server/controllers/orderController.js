import { getRandomFromInterval } from '../helpers/getRandomFromInterval.js';
import { Goods } from '../models/goodsModel.js';
import { User } from '../models/user.js';

export const createOrder = async (req, res) => {
    try {
        const { email, amount } = req.body; // amount of orders to create

        const goods = await Goods.find();
        const user = await User.findOne({ email });

        if (!goods || !user) {
            return req.status(400).json('Wrong user or goods');
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