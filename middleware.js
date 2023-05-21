const Users=require('./userSchema');

async function checkBeforeRegister(req,res,next){
    if(req.body.password===req.body.confirmPassword){
        // check if username already exists, 
        let user=await Users.find({userName:req.body.userId});
        if(user.length){
            return res.render('register.ejs',{err:true,msg:"User already exists, try another user name."})
        }
            next();
    }
    else{
        res.render('register.ejs',{err:true,msg:"Password and Confirm Password don't match"})
    }
}

async function checkBeforLogin(req,res,next){
    let user=await Users.find({userName:req.body.userId});
    if(user.length){
        if(user[0].password!==req.body.password){
            return res.render('login.ejs',{err:true,msg:"Password Incorrect."});
        }
        else next();
    }
    else{
        res.render('login.ejs',{err:true,msg:"User doesn't exist, Register."});
    }
}

module.exports={
    checkBeforLogin,
    checkBeforeRegister
}