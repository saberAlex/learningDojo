//all database object
var Categories = Parse.Object.extend("Categories");
var Notes = Parse.Object.extend("Notes");
var Todos = Parse.Object.extend("Todos");
var Links = Parse.Object.extend("Links");

var categoriesObject = new Categories();
var notesObject = new Notes();
var todosObject = new Todos();
var linksObject = new Links();

var categories = [];

//initialize
var categoryQuery = new Categories();
var categories;
var mainCategory = "unknown";
categoryQuery.fetch({
	success: function(myObject) {
	  categories = myObject._serverData.results;
	},
	error: function(myObject, error) {
	  alert(error);
	}
});
