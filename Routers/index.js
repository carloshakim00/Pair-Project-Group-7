const express = require("express");
const Controller = require("../Controllers/Controller");
const LoginController = require("../Controllers/index");
const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/home");
})

router.get("/signUp", LoginController.signUp);
router.post("/signUp", LoginController.addUser);


router.get("/home", LoginController.login)
router.post("/home", LoginController.loginUser)

router.use((req,res,next) => {
    if(!req.session.userId){
        const error = `Please Login First!`;
        res.redirect(`/home?error=${error}`)
    }else{
        next()
    }
})


router.get("/logout", Controller.getLogout);


router.get("/buyerHomePage", Controller.showBuyer);
router.get("/sellerHomePage", Controller.showSeller);

router.get("/sellerHomePage/sellerProfile", Controller.sellerProfile);
router.post("/sellerHomePage/sellerProfile", Controller.sellerProfileSave);

router.get("/buyerHomePage/buyerProfile", Controller.buyerProfile);
router.post("/buyerHomePage/buyerProfile", Controller.buyerProfileSave);

// router.get("/buyerHomePage/:id", Controller.buyMedicine);

router.get("/buyerHomePage/buyProduct/:id", Controller.buyMedicine);

router.get("/buyerHomePage/checkout/:id", Controller.checkoutProduct);

// router.get("/buyerHomePage/cart", Controller.productDetail);

router.get("/home/addProduct", Controller.showAddForm);
router.post("/home/addProduct", Controller.postAddForm);

router.get("/sellerHomePage/edit/:id", Controller.showEditForm);
router.post("/sellerHomePage/edit/:id", Controller.postEditForm);

router.get("/sellerHomePage/delete/:productId", LoginController.deleteProduct);

module.exports = router;