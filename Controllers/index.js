const { User, UserProfile, Product, Transaction } = require("../models");
const bcrypt = require("bcryptjs");
class LoginController {
    static async signUp(req, res) {
        const { error } = req.query;
        try {
            const userData = await User.findAll();
            res.render("signUp", { userData, error });
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async addUser(req, res) {
        try {
            const { email, password, role } = req.body
            await User.create({ email, password, role });
            res.redirect("/home")
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



    static async login(req,res){
        try {
            const{error} = req.query
            res.render("login",{error})
        } catch (error) {
            res.send(error)
        }
    }


    static async loginUser(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ where: { email } })
            if (user) {
                const isValidPassword = bcrypt.compareSync(password, user.password);
                if (isValidPassword) {
                    console.log(req.session);
                    req.session.userId = user.id;
                    if (user.role === `Seller`) {
                        res.redirect("/sellerHomePage")
                    } else if (user.role === `Buyer`) {
                        res.redirect("/buyerHomePage")
                    }
                } else {
                    const error = `Password salah.`;
                    res.redirect(`/home?error=${error}`);
                }
            } else {
                const error = `Username tidak ada.`;
                res.redirect(`/home?error=${error}`);
            }
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }



    static async deleteProduct(req, res) {
        try {
            const { productId } = req.params;
            let deleteProduct = await Product.findByPk(+productId)
            await Product.destroy({ where: { id: productId } });
            res.redirect(`/sellerHomePage?deleteProduct=${deleteProduct.name}`)
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
}

module.exports = LoginController;