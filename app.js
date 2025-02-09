const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.set("view engine","ejs");

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
    res.render('index');
})
app.get('/read',async function(req,res){
    let AllUsers =await userModel.find();
    res.render('read',{users:AllUsers});
})
app.get('/edit/:userid',async function(req,res){
    let user= await userModel.findOne({_id:req.params.userid})
    res.render('edit',{user});
})
app.post('/update/:userid',async function(req,res){
    let{image,name,email}= req.body;
    let user= await userModel.findOneAndUpdate({_id:req.params.userid}, {image,name,email},{new:true})
    res.redirect('/read');
})
app.post('/create',async function(req,res){
    let{name,email,image} = req.body;
  let createdUser = await userModel.create({
    name:name,
    email:email,
    image:image
   })
   res.redirect('/read');
})
app.get('/delete/:id',async function(req,res){
    let AllUsers =await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect('/read');
})
app.listen(3000);