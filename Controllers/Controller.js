const {Product, User} = require("../models")
const { Op } = require("sequelize");

class Controller{

    static async showSeller(req,res){
       try {
        const products = await Product.findAll();
        res.render('sellerView', { products});
       } catch (error) {
        console.log(error);
        res.send(error);
       }
    }

    static async showBuyer(req,res){
        try {
         const products = await Product.findAll();
         res.render('buyerView', { products });
        } catch (error) {
         console.log(error);
         res.send(error);
        }
     }

}

module.exports = Controller