const {Product} = require("../models")
const { Op } = require("sequelize");

class Controller{

    static async showProduct(req,res){
       try {
        const products = await Product.findAll();
        const role = req.user.role
        res.render('HomePage', { products, role });
       } catch (error) {
        console.log(error);
        res.send(error);
       }
    }

}

module.exports = Controller