var express = require('express');
var router = express.Router();

const controller = require("../controllers/order-controller");


router.route("/").post((req, res) => {
    controller.createOrder(req, res);
})
router.route("/").get((req, res) => {
    controller.getAllOrders(req, res);
})



module.exports = router;