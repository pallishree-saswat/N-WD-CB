const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Review = require('../models/review');


// Display all the posts
router.get('/posts', async(req, res) => {
    
    try {
        const posts=await Post.find({});
        res.render('posts/index',{posts}); 
    } catch (e) {
        console.log("Something Went Wrong");
        req.flash('error', 'Cannot Find posts');
        res.render('error');
    }
})


// Get the form for new post
router.get('/posts/new', (req, res) => {
    res.render('posts/new');
})


// Create New post
router.post('/posts', async(req, res) => {

    try {
        await Post.create(req.body.post);
        req.flash('success', 'post Created Successfully');
        res.redirect('/posts');
    }
    catch (e) {
        console.log(e.message);
        req.flash('error', 'Cannot Create posts,Something is Wrong');
        res.render('error');
    } 
});


// Show particular post
router.get('/posts/:id', async(req, res) => {
    try {
        const post=await Post.findById(req.params.id).populate('reviews');
        res.render('posts/show', { post});
    }
    catch (e) {
        console.log(e.message);
        req.flash('error', 'Cannot find this post');
        res.redirect('/error');
    }
})

// Get the edit form
router.get('/posts/:id/edit', async(req, res) => {

    try {
        const post=await Post.findById(req.params.id);
        res.render('posts/edit',{post});
    }
    catch (e) {
        console.log(e.message);
        req.flash('error', 'Cannot Edit this post');
        res.redirect('/error');
    }
})

// Upadate the particular post
router.patch('/posts/:id', async(req, res) => {
    
    try {
        await Post.findByIdAndUpdate(req.params.id, req.body.post);
        req.flash('success', 'Updated Successfully!');
        res.redirect(`/posts/${req.params.id}`) 
    }
    catch (e) {
        console.log(e.message);
        req.flash('error', 'Cannot update this post');
        res.redirect('/error');
    }
})


// Delete a particular post
router.delete('/posts/:id', async (req, res) => {

    try {
        await Post.findByIdAndDelete(req.params.id);
        req.flash('success', 'Deleted the post successfully');
        res.redirect('/posts');
    }
    catch (e) {
        console.log(e.message);
        req.flash('error', 'Cannot delete this post');
        res.redirect('/error');
    }
})




// Creating a New Comment on a post

router.post('/posts/:id/review', async (req, res) => {
    
    try {
        const post = await Post.findById(req.params.id);
        const review = new Review(req.body);

        post.reviews.push(review);

        await review.save();
        await post.save();

        req.flash('success','Successfully added your review!')
        res.redirect(`/posts/${req.params.id}`);
    }
    catch (e) {
        console.log(e.message);
        req.flash('error', 'Cannot add review to this post');
        res.redirect('/error');
    }
    
})

//get latest posts
router.get('/posts',async (req, res) => {
    const topPosts = await Post.find({}).sort({ 'created_at' : -1 }).limit(3)
    res.render('posts/index',{topPosts});
    console.log(topPosts)
  }) 

router.get('/error', (req, res) => {
    res.status(404).render('error');
})


module.exports = router;