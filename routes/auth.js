const express = require('express');

const authController = require('../controller/auth');

const router = express.Router();
const {check}=require('express-validator');

router.get('/login', authController.getLogin);
router.post('/login',authController.postLogin);

router.get('/signup', authController.getSignUp);
router.post('/signup', [check('email').isEmail()
                        .withMessage("Enter a valid Email"),
                       check('password').isLength({min:6,max:13})
                       .withMessage("Please validate the password")
                       .isAlphanumeric()
                       .withMessage("Please add alphanumeric characters") 
                       .custom((value)=>{
                            if(value!==req.body.cPassword)
                             throw new Error('Password did not match');   
                             return true;
                       })

                       
                    ]
            ,authController.postSignUp);

router.post('/logout',authController.postLogout);

router.get('/reset/:token', authController.resetPassword);
router.get('/reset', authController.getResetPassword);
router.post('/reset', authController.postResetPassword);

 router.post('/changePassword',authController.changePassword);

module.exports = router;