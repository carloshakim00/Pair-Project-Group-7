const {Product, User, UserProfile} = require("../models")
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
         const{id} = req.params;
        try {
            const {stock} = req.body;
            await Product.update({stock}, {where: {id: id}})
            res.redirect("/sellerHomePage")
        } catch (error) {
            if(error.name === "SequelizeValidationError") {
                const message = error.errors.map((el) => el.message);
                res.redirect(`/home/editProduct?error=${message}`)
             } else {
                res.send(error);
             }
        }
     }

     static async buyMedicine(req,res){
        try {
            let {id} = req.params;
            const data = await Product.findByPk(id)
            await Product.increment({stock: -1}, {where:{id}})
            res.render("checkoutproduct", {data, formatter})
        } catch (error) {
            res.send(error);
        }
     }

     static async checkoutProduct(req,res){
      try {
          let {id} = req.params;
          const data = await Product.findByPk(id)
          await Product.increment({stock: -1}, {where:{id}})
          res.render("checkoutproduct", {data, formatter})
      } catch (error) {
          res.send(error);
      }
   }

     static async sellerProfile(req,res){
      try {
          const {error} = req.query;
          let data = await User.findAll();
          res.render("sellerprofileform", {data, error})
      } catch (error) {
          console.log(error);
          res.send(error);
      }
   }

   static async sellerProfileSave(req,res){
      try {
      let {name, address, phone, email} = req.body
      const user = await User.findOne({where: {email}})
      await UserProfile.create({name, address, phone, UserId: user.id})
      res.redirect("/sellerHomePage")
      } catch (error) {
          console.log(error);
          if(error.name === "SequelizeValidationError") {
             const message = error.errors.map((el) => el.message);
             res.redirect(`/sellerHomePage/sellerProfile?error=${message}`)
          } else {
             res.send(error);
          }
      }
   }

   static async buyerProfile(req,res){
      try {
          const {error} = req.query;
          let data = await User.findAll();
          res.render("buyerprofileform", {data, error})
      } catch (error) {
          console.log(error);
          res.send(error);
      }
   }

   static async buyerProfileSave(req,res){
      try {
      let {name, address, phone, email} = req.body
      const user = await User.findOne({where: {email}})
      await UserProfile.create({name, address, phone, UserId: user.id})
      res.redirect("/buyerHomePage")
      } catch (error) {
          console.log(error);
          if(error.name === "SequelizeValidationError") {
             const message = error.errors.map((el) => el.message);
             res.redirect(`/buyerHomePage/buyerProfile?error=${message}`)
          } else {
             res.send(error);
          }
      }
   }
}

module.exports = Controller