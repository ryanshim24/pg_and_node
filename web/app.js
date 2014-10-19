"use strict"
//Get node modules :)
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),//Lets us use DELETE AND PUT
    Library = require('./library.js'); //Lets us get our methods

app.set('view engine', 'ejs');
app.use(express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({extended: true})); //Middle Wear :)
app.use(methodOverride('_method'));

var library = new Library(); 

//Home
app.get('/', function(req, res){ //Routing to route route
  res.render('home');
});

//Index
app.get('/books', function(req, res){ //Route to books route
  //DONE!
    library.all(function(leBooks){
    res.render('library/index', {allBooks: leBooks});
  });
});

//New
app.get('/books/new', function(req, res){
  //DONE
	res.render("library/new");
});

//Create
app.post('/books', function(req, res) {
	//TODO
  var title = req.body.book.title;
  var author = req.body.book.author;
  // console.log("/books -> Implement me.");
  library.add(title,author,function(){
    res.redirect('/books'); 
  });
});

//Show
app.get('/books/:id', function(req, res) {
  var id = req.params.id;
  library.findById(id, function(foundBook){
    res.render('library/show', {book: foundBook});
  });
});

//Edit
app.get('/books/:id/edit', function(req, res) {
	var id = req.params.id;
  library.findById(id, function(foundBook){
    res.render('library/edit', {book: foundBook});
  });
});

//Update
app.put('/books/:id', function(req, res) {
	var id = req.params.id;
  var title = req.body.book.title;
  var author = req.body.book.author;
  //TODO
  // library.update ...
  library.update(id,title,author, function(){
    res.redirect('/books');
  });
});

//Delete
app.delete('/books/:id', function(req, res) {
	var id = req.params.id;
  //TODO
  library.destroy(id,function(){
    res.redirect('/books');
  });
});

app.get('/about', function(req,res) { //My about page
  res.render('library/about');
});

app.get('/contact', function(req, res) { // My contact page
  res.render('library/contact');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});