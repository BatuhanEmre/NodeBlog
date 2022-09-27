const express = require('express')
const router = express.Router()
const path = require("path")
const Post = require('../models/Post')
const Category = require('../models/Category')
const User = require("../models/User")


router.get('/new',(req,res) => {
    if(!req.session.userId){
     res.redirect('users/login')
    }
    Category.find({}).lean().then(categories => { 
      res.render("site/addpost", {categories:categories})
    })
    
  })

  function excapeRegex(text){
    return text.replace();
  }

router.get('/search',(req,res) => {

  if(req.query.look){
    const regex = newRegexp (excapeRegex(req.query.look),'gi');
    Post.find({"title" :regex}).populate({path:'author',model:User}).sort({$natural:-1}).lean().then(posts => { 
    res.render("site/post", {post:post ,categories:categories, posts:posts}) 
    });
  }
  
})
  router.get("/:id", (req, res) => {
    Post.findById(req.params.id).populate({path:'author',model:User}).then((post) => {
      Category.find({}).lean().then(categories => {
        Post.find({}).populate({path:'author',model:User}).sort({$natural:-1}).lean().then(posts => {         
          res.render("site/post", {post:post ,categories:categories, posts:posts})
        })                                                     
  
      })

    });
  });

  router.post('/test',(req,res) => {

    let post_image = req.files.post_image

    post_image.mv(path.resolve(__dirname,"../public/img/postimages", post_image.name))

    Post.create({
      ...req.body,
     post_image:`/img/postimages/${post_image.name}`,
     author : req.session.userId
    },)
   
    res.redirect('/')
  })
  
  module.exports = router