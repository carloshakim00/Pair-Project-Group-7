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

     static async getLogout(req,res){
        try {
            req.session.destroy((error)=>{
                if (error) {
                    console.log(error);
                } else {
                    res.redirect("/home");
                }
            })
        } catch (error) {
            console.log(error);
         res.send(error);
        }
     }

     static async showAddForm(req,res){
        try {
            let data = await Product.findAll();
            res.render("addForm", {data})
        } catch (error) {
            console.log(error);
            res.send(error);
        }
     }

     static async postAddForm(req,res){
        try {
        let {name, price,description,imageUrl} = req.body
        await Product.create({name, price,description,imageUrl})
        res.redirect("/sellerHomePage")
        } catch (error) {
            console.log(error);
            res.send(error);
        }
     }

}

module.exports = Controller