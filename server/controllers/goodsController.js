import { Goods } from "../models/goodsModel.js";
import { validationResult } from 'express-validator';

export const createGoods = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.errors[0].msg);
    }

    const { name, palletizing, price } = req.body;

    const goods = await Goods.find();
    if(!goods) {
        return res.status(400).json("Can't find collection");
    }

    for (const item of goods) {
       if(item.name === name) {
        return res.status(400).json(`${name} if already used`);
       }
    };

    Goods.create({ name, palletizing, price });

    return res.status(200).json('Success');
}