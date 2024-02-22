const {User, UserProfile, Product, Transaction} = require("../models");

class LoginController {
    static async login(req, res) {
        const {error} = req.query;
        try {
            const userData = await User.findAll();
            res.render("login", {userData, error});
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async addUser(req, res) {
        try {
            const {email, password, role} = req.body
            // await User.create({email, password, role});
            if (role === `Seller`) {
                res.redirect("sellerHomePage")
            } else if (role === `Buyer`) {
                res.redirect("buyerHomePage")
            }   
        } catch (error) {
            console.log(error);
            if(error.name === "SequelizeValidationError") {
                const message = error.errors.map((el) => el.message);
                res.redirect(`/home?error=${message}`);
            } else {
                res.send(error.message);
            }
        }
    }
}

module.exports = LoginController;