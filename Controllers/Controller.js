const {Product, User} = require("../models")
const { Op } = require("sequelize");
const formatter = require ("../helpers/formatPrice")
class Controller{

    static async showSeller(req,res){
       try {
        let { search , deleteProduct } = req.query
        let option = {
        };
        if (search){
            option.where = {
                name:{
                    [Op.iLike]: `%${search}%`,
                },
            };
        }
        const products = await Product.findAll(option);
        res.render('sellerView', { products , deleteProduct , formatter });
       } catch (error) {
        console.log(error);
        res.send(error);
       }
    }

    static async showBuyer(req,res){
        try {
            let { search } = req.query
            let option = {
                order:[["price", "DESC"]]
            };
            if (search){
                option.where = {
                    name:{
                        [Op.iLike]: `%${search}%`,
                    },
                };
            }
         const products = await Product.findAll(option);
         res.render('buyerView', { products , formatter});
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
            const {error} = req.query;
            let data = await Product.findAll();
            res.render("addForm", {data, error})
        } catch (error) {
            console.log(error);
            res.send(error);
        }
     }

     static async postAddForm(req,res){
        try {
        let {name, price,description,imageUrl,stock,productCode} = req.body
        await Product.create({name, price,description,imageUrl,stock,productCode})
        res.redirect("/sellerHomePage")
        } catch (error) {
            console.log(error);
            if(error.name === "SequelizeValidationError") {
               const message = error.errors.map((el) => el.message);
               res.redirect(`/home/addProduct?error=${message}`)
            } else {
               res.send(error);
            }
        }
     }

     static async showEditForm(req,res){
        const {error} = req.query;
         const {id} = req.params;
        try {
            const data = await Product.findByPk(id)
            res.render("editForm", {data, error})
        } catch (error) {
            res.send(error);
        }
     }

     static async postEditForm(req,res){
        const {id} = req.params;
        try {
            const {stock} = req.body;
            await Product.update({stock}, {where: {id: id}})
            res.redirect("/sellerHomePage")
        } catch (error) {
            if(error.name === "SequelizeValidationError") {
                const message = error.errors.map((el) => el.message);
                res.redirect(`/sellerHomePage/edit/${id}?error=${message}`)
            } else {
                res.send(error);
            }
        }
    }
    
     static async buyMedicine(req,res){
        try {
            let {id} = req.params;
            await Product.increment({stock: -1}, {where:{id}})
            res.redirect("/buyerHomePage")
        } catch (error) {
            res.send(error);
        }
     }
}

module.exports = Controller