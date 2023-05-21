const express=require('express');
const router=express.Router();
const Users=require('./userSchema');
const {checkBeforLogin,checkBeforeRegister} =require('./middleware');


router.get('/',(req,res)=>{
    res.render('index.ejs');
})
router.get('/register',(req,res)=>res.render('register.ejs',{err:false}));
router.get('/home',(req,res)=>{res.render('home.ejs')});
router.get('/login',(req,res)=>res.render('login.ejs',{err:false}));
router.get('*',(req,res)=>res.status(404).end())



router.post('/register',checkBeforeRegister,async(req,res)=>{
    await Users.create({userName:req.body.userId,password:req.body.password});
    console.log('user Registerd');
    res.redirect('/home')
})
router.post('/login',checkBeforLogin,(req,res)=>{
    res.redirect('/home');
});



module.exports=router;