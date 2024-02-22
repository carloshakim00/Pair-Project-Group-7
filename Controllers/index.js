const {User, UserProfile, Product, Transaction} = require("../models");

class LoginController {
    static async login(req, res) {
        const {error} = req.query;
        try {
            const userData = await User.findAll();
<<<<<<< HEAD
            res.render("login", {userData, error});
=======
            res.render("login", {userData , error});
>>>>>>> 4738e42432b1d9c105a3e1b1b7b77828eef918b8
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async addUser(req, res) {
        try {
            const {email, password, role} = req.body
<<<<<<< HEAD
            // await User.create({email, password, role});
=======
            await User.create({email, password, role});
>>>>>>> 4738e42432b1d9c105a3e1b1b7b77828eef918b8
            if (role === `Seller`) {
                res.redirect("sellerHomePage")
            } else if (role === `Buyer`) {
                res.redirect("buyerHomePage")
<<<<<<< HEAD
            }   
        } catch (error) {
            console.log(error);
            if(error.name === "SequelizeValidationError") {
                const message = error.errors.map((el) => el.message);
                res.redirect(`/home?error=${message}`);
            } else {
                res.send(error.message);
            }
=======
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
>>>>>>> 4738e42432b1d9c105a3e1b1b7b77828eef918b8
        }
    }
}

module.exports = LoginController;