import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readPost, writePost, readUser, writeUser } from './db.ts'
import session from 'express-session';




const app = express();
app.use(express.json())
app.use(express.urlencoded())
app.use('/public', express.static('public'));
const PORT = 8000;

let users = readUser();
let posts = readPost();

app.set('view engine', 'ejs');

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

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

app.get('/user', (req, res) => {
    res.render('user-create')       // <- Here is sending to user-create.ejs file
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
    console.log(post)
    res.render('post', {post: post})              // <- Here is sending to post.ejs file
})

app.post('/api/post', (req,res) => { 
    try {
    console.log(posts)
    console.log(req.body)
    const {title, author, content } = req.body;
    const newId = posts.length+1;

    if(!title || !author || !content){
        return res.redirect('/404')
    }
    const newPost = { id: newId, title, author, content}
    posts.push(newPost)
    writePost(posts)
    res.redirect(`/post/${newId}`)
    }catch (err) {
        console.error(err);
        res.status(500).send('Internet server error')
    }
    // res.render('post', {post:posts})
    // res.json({msg: 'post added successfully'})
})

app.get('/user/:id', (req,res) =>{
    const id = req.params.id;
    const user = users.find(x => String(x.id) === id) 
    if(!user){
        return res.status(404).redirect('/404')
    }
    console.log(user)
    res.render('user', {user: user})
})


app.post('/api/user', (req,res) => {
    const { name, email, password } = req.body;
    const newId = uuidv4();

        if(!name || !email || !password){
        return res.redirect('/404')
    }
    const newUser = { id: newId, name, email, password}
    users.push(newUser)
    writeUser(users);
     console.log(newUser)
     console.log(users)
    res.redirect(`/user/${newId}`)
})

app.delete('/post/:id',(req,res) => {
    const { id } = req.params;

    posts = posts.filter((post) => String(post.id) !== id );
    writePost(posts);
    res.status(200).json({ msg: 'Post deleted'})
})

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    req.session.userId = user.id;
    res.redirect('/'); // or user profile
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.listen(PORT, () => console.log('Server is running on PORT ', PORT))