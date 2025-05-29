import express from 'express';
import { read, write } from './db.ts'

const app = express();
app.use(express.json())
app.use(express.urlencoded())
app.use('/public', express.static('public'));
const PORT = 8000;

let posts = read();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // Here is to sort posts in descending order. by the id
    const sortedPosts = [ ...posts].sort((a,b) => b.id - a.id)
    // Here we slice the last ten posts 
    const lastTenPosts = sortedPosts.slice(0, 10)
    res.render('index', {posts: lastTenPosts})    // <- Here is sending to index.ejs file
})

app.get('/post', (req, res) => {
    res.render('post-create')       // <- Here is sending to post-create.ejs file
})

app.get('/404', (req,res)=> {

    res.render('404')
})

app.get('/post/:id', (req, res) => {
    const id = Number(req.params.id);
    console.log(req.params);
    // console.log(req.body);
    const post = posts.find(x => x.id === id)
    if(!post){
       return res.status(404).redirect('/404')
    }
    res.render('post', {post: post})              // <- Here is sending to post.ejs file
})

app.post('/api/post', (req,res) => { 
    console.log(req.body)
    const {title, author, content } = req.body;
    const newId = posts.length+1;

    if(!title || !author || !content){
        return res.redirect('/404')
    }
    const newPost = { id: newId, title, author, content}
    posts.push(newPost)
    write(posts)
    res.redirect(`/post/${newId}`)

    // res.render('post', {post:posts})
    // res.json({msg: 'post added successfully'})
})

app.delete('/post/:id',(req,res) => {
    const { id } = req.params;

    posts = posts.filter((post) => String(post.id) !== id );
    write(posts);
    res.status(200).json({ msg: 'Post deleted'})
})



app.listen(PORT, () => console.log('Server is running on PORT ', PORT))