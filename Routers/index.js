const express = require("express");
const Controller = require("../Controllers/Controller");
const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/home");
})

router.get("/home", Controller.showProduct);

router.get("/home/addProduct", Controller.addProduct);
router.post("/home/addProduct", Controller.saveProduct);

router.get("/home/restockProduct/:productId", Controller.editProduct);
router.post("/home/restockProduct/:productId", Controller.updateProduct);

router.get("/home/deleteProduct/:productId", Controller.deleteProduct);

router.get("/home/buyProduct/:productId", Controller.buyProduct);

router.get("/home/showProduct/:productId", Controller.showBuyProduct);

module.exports = router;