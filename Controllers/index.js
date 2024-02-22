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

    static async addUser(req, res) {
        try {
            const {email, password, role} = req.body
            await User.create({email, password, role});
            res.render("HomePage")
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
}

module.exports = LoginController;