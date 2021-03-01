const { Router } = require('express');
const authController = require('../controllers/authControllers');
const authV1= require('../middlewares/auth')


const router = Router();



router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);

router.get('/protected', authV1 , function(req,res){
            res.json({message:req.user});
})


module.exports = router; 