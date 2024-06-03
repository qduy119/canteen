const express = require("express");
const ItemController = require("../controllers/item");
const CategoryController = require("../controllers/category");
const CartItemController = require("../controllers/cartItem");
const SeatReservationController = require("../controllers/seatReservation");
const PaymentController = require("../controllers/payment");
const OrderController = require("../controllers/order");
const OrderItemController = require("../controllers/orderItem");
const ReviewController = require("../controllers/review");
const UserController = require("../controllers/user");
const CouponController = require("../controllers/coupon");
const { protect, restrictTo } = require("../middlewares/auth");
const router = express.Router();

// item
router
    .route("/item")
    .get(ItemController.getAll)
    .post(protect, restrictTo("Admin"), ItemController.create);

router.route("/item/top5").get(ItemController.getTopSales);
router
    .route("/item/:id")
    .get(ItemController.getById)
    .put(protect, restrictTo("Admin"), ItemController.update)
    .delete(protect, restrictTo("Admin"), ItemController.delete);

// category
router
    .route("/category")
    .get(CategoryController.getAll)
    .post(protect, restrictTo("Admin"), CategoryController.create);
router
    .route("/category/:id")
    .get(CategoryController.getById)
    .put(protect, restrictTo("Admin"), CategoryController.update)
    .delete(protect, restrictTo("Admin"), CategoryController.delete);

// user

router.use(protect);

// cart item
router
    .route("/cart-item")
    .get(restrictTo("Customer"), CartItemController.getAll)
    .post(restrictTo("Customer"), CartItemController.create);
router
    .route("/cart-item/:id")
    .put(restrictTo("Customer"), CartItemController.update)
    .delete(restrictTo("Customer"), CartItemController.delete);

// seat-reservation
router
    .route("/seat-reservation")
    .get(restrictTo("Customer", "Admin"), SeatReservationController.getAll)
    .post(restrictTo("Customer", "Admin"), SeatReservationController.create)
    .delete(restrictTo("Customer", "Admin"), SeatReservationController.delete);

// payment
router
    .route("/payment")
    .get(restrictTo("Customer", "Admin"), PaymentController.getAll)
    .post(restrictTo("Customer"), PaymentController.create);
router
    .route("/payment/:id")
    .put(restrictTo("Customer"), PaymentController.update);

// order
router
    .route("/order")
    .get(restrictTo("Customer", "Admin"), OrderController.getAll)
    .post(restrictTo("Customer"), OrderController.create);
router
    .route("/order/:id")
    .get(restrictTo("Customer", "Admin"), OrderController.getById)
    .put(restrictTo("Customer"), OrderController.update);
router
    .route("/order/cancel/:id")
    .put(restrictTo("Customer", "Admin"), OrderController.cancelOrder);

// order item
router
    .route("/order-item")
    .post(restrictTo("Customer"), OrderItemController.create);
router
    .route("/order-item/check-rating/:id")
    .get(restrictTo("Customer"), OrderItemController.isRated);

// user
router
    .route("/user")
    .get(restrictTo("Customer", "Admin"), UserController.getAll);
router
    .route("/user/:id")
    .put(restrictTo("Customer", "Admin"), UserController.update)
    .delete(restrictTo("Customer", "Admin"), UserController.delete)
    .get(restrictTo("Customer", "Admin"), UserController.getById);

// review
router.route("/review").post(restrictTo("Customer"), ReviewController.create);

// coupon
router
    .route("/coupon")
    .get(restrictTo("Customer", "Admin"), CouponController.getAll)
    .post(restrictTo("Admin"), CouponController.create);

router
    .route("/coupon/:id")
    .get(restrictTo("Customer", "Admin"), CouponController.getById)
    .put(restrictTo("Admin"), CouponController.update)
    .delete(restrictTo("Admin"), CouponController.delete);

// for payment
router
    .route("/create-payment-url")
    .post(restrictTo("Customer"), PaymentController.createPaymentUrl);

module.exports = router;
