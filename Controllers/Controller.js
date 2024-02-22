const {Product, User} = require("../models")
const { Op } = require("sequelize");

class Controller{

    static async showProduct(req,res){
       try {
        const products = await Product.findAll();
        const users = await User.findAll();
        console.log(users);
        res.render('HomePage', { products, users });
       } catch (error) {
        console.log(error);
        res.send(error);
       }
    }

}

module.exports = Controller