const {User, UserProfile, Product, Transaction} = require("../models");

class LoginController {
    static async login(req, res) {
        try {
            const userData = await User.findAll();
            res.render("login", {userData});
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async adduser(req, res) {
        console.log(req.body)
        try {
            const {email, password, role} = req.body
            await User.create({email, password, role});
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
}

module.exports = LoginController;