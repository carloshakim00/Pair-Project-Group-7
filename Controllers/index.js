const {User, UserProfile, Product, Transaction} = require("../models");

class LoginController {
    static async login(req, res) {
        const {error} = req.query;
        try {
            const userData = await User.findAll();
            res.render("login", {userData , error});
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async addUser(req, res) {
        try {
            const {email, password, role} = req.body
            await User.create({email, password, role});
            if (role === `Seller`) {
                res.redirect("/sellerHomePage")
            } else if (role === `Buyer`) {
                res.redirect("/buyerHomePage")
            }
        } catch (error) {
            console.log(error);
            if (error.name == "SequelizeValidationError") {
                let errormsg = error.errors.map((el) => {
                  return el.message;
                });
                res.redirect(`/home?error=${errormsg}`);
              } else {
                res.send(error.message);
              }
        }
    }

    static async deleteProduct(req, res) {
        try {
            const {productId} = req.params;
            let deleteProduct = await Product.findByPk(+productId)
            await Product.destroy({where: {id: productId}});
            res.redirect(`/sellerHomePage?deleteProduct=${deleteProduct.name}`)
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
}

module.exports = LoginController;