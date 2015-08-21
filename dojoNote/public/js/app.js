var categories = [
{
	"name": "dojo",
	"info": "Let's learn dojo",
	"createddate": "2013-10-21T13:28:06.419Z",
	"links": [
				{
					"_id": "123456",
					"name": "Learning Dojo",
					"info": "Site for Learning DOJO"
				},
				{
					"_id": "123457",
					"name": "Learning Dojo 2",
					"info": "Site for Learning DOJO"
				}
	],
	"directory": "/test/test",
	"todos": [
				{
					"_id": 1234,
					"name": "Create a blog using dojo",
					"info": "<p><a href='lucareto.co.uk'> We need to do this right</a> Hel yeah</p>",
					"completed": true
				},
				{
					"_id": 1245,
					"name": "Create a blog using dojo",
					"info": "<p><a href='lucareto.co.uk'> We need to do this right</a> Hel yeah</p>",
					"completed": false
				}
	]
},
{
	"name": "dojo2",
	"info": "Let's learn dojo",
	"createddate": "2013-10-21T13:28:06.419Z",
	"links": [
				{
					"_id": "123456",
					"name": "Learning Dojo",
					"info": "Site for Learning DOJO"
				},
				{
					"_id": "123457",
					"name": "Learning Dojo 2",
					"info": "Site for Learning DOJO"
				}
	],
	"directory": "/test/test",
	"todos": [
				{
					"_id": 1234,
					"name": "Create a blog using dojo",
					"info": "<p><a href='lucareto.co.uk'> We need to do this right</a> Hel yeah</p>",
					"completed": true
				},
				{
					"_id": 1245,
					"name": "Create a blog using dojo",
					"info": "<p><a href='lucareto.co.uk'> We need to do this right</a> Hel yeah</p>",
					"completed": false
				}
	]
},
];

require([
	"dojo/_base/declare",
"dijit/InlineEditBox",	"dojo/dom",
	"dojo/dom-construct",
	"dojo/on",
	"dojo/_base/array",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dojo/date",
	"dojo/query",
	"dijit/layout/TabContainer",
	"dijit/layout/ContentPane",
	"dijit/form/Button",
	"dojo/dom-style",
	"dojo/NodeList-dom",
	"dojo/domReady!"
	], function(declare, inline, dom, domConstruct, on, arrayUtil, _WidgetBase, _TemplatedMixin, date,$, TabContainer, ContentPane, dojoButton, domStyle){
	console.dir(categories);

	var showNote = dom.byId("showNotes");
	on(showNotes, "click", function() {
		if(domStyle.get("todoLink").display != "none") {
			$("#todoLink").style("display", "none");	
			showNotes.innerHTML = "return";
		} else {
			$("#todoLink").style("display", "block");
			showNotes.innerHTML = "display notes"
		}
		


	});	


	//create something like this
	//<li><a href="#">Create Category &rarr;</a></li>
	for(var i = 0; i < categories.length; i++) {
		var inner = "<a id='category-" +categories[i].name +"'>"+ categories[i].name + "</a>"; 
		console.log(inner);
		domConstruct.create("li", {
				innerHTML: inner,
			}, categoryContainer);

		on(dom.byId("category-" + categories[i].name), "click", function() {
			alert("I am clicked");
		});	


	}

});

