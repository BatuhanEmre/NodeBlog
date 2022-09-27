const mongoose = require('mongoose');
const Post = require("./models/Post")


mongoose.connect('mongodb://127.0.0.1/nodeblog_test_db',{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}, () => { 
    console.log("Connected to Database"); 
})

Post.findByIdAndDelete("62dbf34063ed5626ede913e1" , (error,post) => {
    console.log(error,post)
})





