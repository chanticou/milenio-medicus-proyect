const router = require("express").Router();

const controller_users = require("../controller/users.controller");

router.get("/getAllProducts", controller_users.getAllProducts);
router.post("/createProduct", controller_users.createProduct);
router.get("/getProductById/:id", controller_users.getProductById);
router.delete("/deleteProduct/:id", controller_users.deleteProduct);
router.put("/updateProduct/:id", controller_users.updateProduct);
router.get("/countProducts", controller_users.countProducts);

module.exports = router;
