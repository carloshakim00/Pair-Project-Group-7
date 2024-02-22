const {Product} = require("../models")
const { Op } = require("sequelize");

class Controller{

    static async showProductSeller(req,res){
       try {
         await Product.
         res.render("sellerView")
       } catch (error) {
            console.log(error);
            res.send(error);
       }
    }

    static async showProductBuyer(req,res){
        try {
            await
            res.render("buyerView")
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }




}

module.exports = Controller