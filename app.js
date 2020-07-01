//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash');
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let blogPosts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render('home', {
    homeStartingContent,
    blogPosts
  });
});

app.get('/about', (req, res) => {
  res.render('about', { aboutContent: aboutContent });
});

app.get('/contact', (req, res) => {
  res.render('contact', { contactContent: contactContent });
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.get('/posts/:postTitle', (req, res) => {
  const kebabPostTitle = _.kebabCase(req.params.postTitle);
  for (var i = 0; i < blogPosts.length; i++) {
    const storedKebab = _.kebabCase(blogPosts[i].title);
    if (storedKebab === kebabPostTitle) {
      return res.render('post', { title: blogPosts[i].title, content: blogPosts[i].content });
    }
  }
  res.redirect('/');
});

app.post('/compose', (req, res) => {
  const newPost = {
    title: req.body.newPostTitle,
    link: `/posts/${req.body.newPostTitle}`,
    content: req.body.newPostContent
  }
  if (newPost.content.length > 100) {
    newPost.truncated = newPost.content.slice(0, 100) + '...';
  }
  blogPosts.push(newPost);

  res.redirect('/');
});












app.listen(3000, function () {
  console.log("Server started on port 3000");
});
