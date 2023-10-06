import express from "express";
import {registerController, loginController,testController,forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from "../controller/authController.js"
import { requireSignIn , isAdmin} from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//login || method post
router.post("/login",loginController);

//forgot password || post
router.post("/forgot-password",forgotPasswordController)


//test route
router.get("/test",requireSignIn,isAdmin,testController)

//protected route
//user route
router.get('/user-auth',requireSignIn, (req,res)=>{
    res.status(200).send({
        ok:true
    })
})
//admin route
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({
        ok:true
    })
})


//update profile

router.put("/profile",requireSignIn,updateProfileController)

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);


export default router;