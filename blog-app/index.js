const express=require("express");
const app=express();
const path = require('path')
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(methodOverride('_method'));


app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));



//data arrays

let data = [
    {
        id:uuid(),
        author:"palli",
        title:"blog one",
        body:"this is my first blog",
        img:"https://images.unsplash.com/photo-1436397543931-01c4a5162bdb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmFja2dyb3VuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id:uuid(),
        author:"palli",
        title:"blog one",
        body:"this is my first blog",
        img:"https://images.unsplash.com/photo-1508717272800-9fff97da7e8f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGJhY2tncm91bmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id:uuid(),
        author:"palli",
        title:"blog one",
        body:"this is my first blog",
        img:"https://images.unsplash.com/photo-1531265726475-52ad60219627?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGJhY2tncm91bmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id:uuid(),
        author:"palli",
        title:"blog one",
        body:"this is my first blog",
        img:"https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGJhY2tncm91bmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
]


//get all posts
app.get('/', (req,res) => {
    res.render('home', {data})
    console.log(data)
})


// Getting a form for adding new post
app.get('/post', (req, res) => {
    
    res.render('posts');
})


// Creates a new post
app.post('/post', (req, res) => {
    const {author, title, body, img} = req.body;
    data.push({author, body, title,img, id:uuid()})
    res.redirect('/');
})


// Show particular post
app.get('/post/:id', (req, res) => {
    const { id } = req.params;
    const singlePost = data.find(post => post.id === id);
    res.render('single',{post : singlePost});
})

// Get a form for editing post

app.get('/post/:id/edit', (req, res) => {
    const { id } = req.params;
    const post =data.find(post => post.id== id);
    
    res.render('edit', {post});
})


app.patch('/post/:id', (req, res) => {
    
    const { id } = req.params;
    const post = data.find(post => post.id === id);

    const updatedPost = req.body.body;
    const title = req.body.title;
    const img= req.body.img;
    const author = req.body.author;
    
    console.log(updatedPost );

    post.body = updatedPost ;
    post.author = author;
    post.title = title;
    post.img = img;

    res.redirect('/');
})

app.delete('/post/:id', (req, res) => {
    
    const { id } = req.params;

    const temp = data.filter(post => post.id !== id);

    data = temp ;

    res.redirect('/');
})





 


app.listen(8000, () => {
    console.log(`server is running on port - 8000`)
    
})