const express=require('express');
const router=express.Router();
const Users=require('./userSchema');
const {checkBeforLogin,checkBeforeRegister} =require('./middleware');
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.get('/',(req,res)=>{
    res.render('index.ejs');
})
router.get('/register',(req,res)=>res.render('register.ejs',{err:false}));
router.get('/home',(req,res)=>{res.render('home.ejs')});
router.get('/login',(req,res)=>res.render('login.ejs',{err:false}));
router.get('*',(req,res)=>res.status(404).end())



router.post('/register',checkBeforeRegister,async (req,res)=>{
    try{
        const hash= await bcrypt.hash(req.body.password, saltRounds);
        await Users.create({
                    userName:req.body.userId,
                    password:hash
                });
        console.log('user Registerd');
        res.redirect('/home')
    }
    catch(e){
        console.log(e);
        res.render('register.ejs',{err:true,msg:'Some error occoured!! Try again.'});
    }    
})


router.post('/login',checkBeforLogin,async(req,res)=>{
    // we know user exists, checked by the middleware 
    const user=await Users.find({userName:req.body.userId});
    // checking if password matches.
    try{
        const result=await bcrypt.compare(req.body.password,user[0].password);
        if(result){
            res.redirect('/home');
        }
        else{
            res.render('login.ejs',{err:true,msg:"Password Incorrect."});
        }
    }
    catch(e){
        console.log(e);
        res.render('login.ejs',{err:true,msg:'Some error occoured!! Try again.'})
    }
});



module.exports=router;