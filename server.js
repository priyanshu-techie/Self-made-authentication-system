const express=require('express');
const app=express();
const connectDb=require('./configDB');
const routes=require('./routes');
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}) );


connectDb();

app.use('/',routes);

app.listen(8000,()=>{console.log("server running at 8000")})

// find with object id and not user name
