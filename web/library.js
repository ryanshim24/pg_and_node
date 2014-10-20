"use strict"

var DB = require('./mydb_lib.js');

var db = new DB("library_example_app", 5432, "localhost");

function Book(title, author, id) {
  this.title = title;
  this.author = author;
  this.id = id;
}

function Library() {
}
// TOGETHER!
Library.prototype.all = function(callback) {
	// start with an empty array 
	var allBooks = [];

	// ask the database to select all the books, if there is no error..
	db.query("SELECT * FROM books",[],function(err,result){
		if (err) console.log("SELECT FAILED",err);
		// return to me an array of all the rows 
		result.rows.forEach(function(book){
			var newBook = new Book(book.title, book.author, book.id);
			allBooks.push(newBook);
		});
		// return this array to the server
		callback(allBooks);
	});
};

Library.prototype.add = function(title, author, callback) {
	var newBook = new Book(title,author); //Made a new book from the input data we pushed from the app.post
	// TODO
	// db.query... INSERT
	//Statement, paramaters, callback
	db.query("INSERT INTO books (title,author) VALUES ($1, $2) RETURNING *",
		[newBook.title,newBook.author ], function(err, resultSet){
			if (err) console.log("INSERT FAILED", err);
			callback(newBook);
		});
	// call callback with the new book
};

Library.prototype.destroy = function(id, callback) {
	// Query 
	db.query("DELETE FROM books WHERE id = $1",[id],function(err, resultSet){
		if (err) console.log("Delete failed", err);
		console.log("This is result set:", resultSet);
		callback();
	});
	// call callback without params when done
};

Library.prototype.update = function(id, title, author, callback) {
	// TODO
	// db.query... UPDATE
	db.query("UPDATE books SET title =$2, author =$3 WHERE id =$1",
	[id, title, author], function(err, resultSet) {
		if(err) console.log("Update Failed", err);
		console.log("This is the result set:", resultSet);
		callback();
	});
	// call callback without params when done
};


Library.prototype.findById = function(id, callback) {
	
	// TODO
	// db.query... SELECT
	db.query("SELECT * FROM books WHERE id =$1",[id],function(err, resultSet) {
		if (err) console.log("Find failed", err);
		console.log("This is result set:", resultSet);
		console.log(resultSet.rows[0]);
		var resultBook = new Book(resultSet.rows[0].title,resultSet.rows[0].author,resultSet.rows[0].id);
		callback(resultBook);
	});
};

module.exports = Library;
