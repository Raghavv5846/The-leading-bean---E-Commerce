const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer();
const homeController = require('../controllers/home_controller');
const cart_page_controller=require('../controllers/cart_page');


router.get('/menu',homeController.menu);

router.post('/menu/cartItems',homeController.cartItems);
router.get('/about',homeController.about);
router.get('/menu/cartPage',cart_page_controller.cartPage);
router.post('/menu/cartPage/remove',cart_page_controller.remove);
router.post('/reservationData',upload.none(),homeController.reservation)

module.exports = router;