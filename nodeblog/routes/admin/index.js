const express = require("express");
const router = express.Router();
const Category = require("../../models/Category");
const Post = require("../../models/Post");

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/categories", (req, res) => {
  Category.find({})
    .lean()
    .then((categories) => {
      res.render("admin/categories", { categories: categories });
    });
});

router.post("/categories", (req, res) => {
  Category.create(req.body, (error, category) => {
    if (!error) {
      res.redirect("categories");
    }
  });
});

router.delete("/categories/:id", (req, res) => {
  Category.remove({ _id: req.params.id }).then(() => {
    res.redirect("/admin/categories");
  });
});
router.get("/posts", (req, res) => {
  Post.find({})
    .populate({ path: "category", model: Category })
    .sort({ $natural: -1 })
    .lean()
    .then((posts) => {
      res.render("admin/posts", { posts: posts });
    });
});

router.delete("/posts/:id", (req, res) => {
  Post.remove({ _id: req.params.id }).then(() => {
    res.redirect("/admin/posts");
  });
});

router.get('/posts/edit/:id',(req,res) =>{
    Post.findOne({_id:req.params.id}).then(post =>{
            res.render('admin/editpost', {post:post})
        })
    })

    router.get('post/edit/:id')
  
  

module.exports = router;