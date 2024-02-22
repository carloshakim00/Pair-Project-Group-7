const express = require("express");
const Controller = require("../Controllers/Controller");
const LoginController = require("../Controllers/index");
const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/home");
})

router.get("/home", LoginController.login);
router.post("/home", LoginController.addUser);

router.get("/buyerHomePage", Controller.showBuyer);
router.get("/sellerHomePage", Controller.showSeller);


// router.get("/home/product/addProduct", Controller.addProduct);
// router.post("/home/product/addProduct", Controller.saveProduct);

// router.get("/home/product/restockProduct/:productId", Controller.editProduct);
// router.post("/home/product/restockProduct/:productId", Controller.updateProduct);

// router.get("/home/product/deleteProduct/:productId", Controller.deleteProduct);

// router.get("/home/product/buyProduct/:productId", Controller.buyProduct);

// router.get("/home/product/showProduct/:productId", Controller.showBuyProduct);

module.exports = router;