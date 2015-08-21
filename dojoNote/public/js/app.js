var NotesContainer = [];
var LinksContainer = [];
var TodosContainer = [];

require([
	"dojo/_base/declare",
	"dijit/InlineEditBox",	
	"dojo/dom",
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
	"dojo/_base/lang",
	"dojo/NodeList-dom",
	"dojo/domReady!"
	], function(declare, inline, dom, domConstruct, on, arrayUtil, _WidgetBase, _TemplatedMixin, date,$, TabContainer, ContentPane, dojoButton, domStyle, lang){

		 declare("LinkWidget",[_WidgetBase, _TemplatedMixin], {
					id :"",
					name : "Untitled",
					info : "NA",
					category : "unknown",
					templateString : 
						" <div> <h2 data-dojo-attach-point='nameNode'>${name}</h2>" + 
						"<p data-dojo-attach-point='infoNode'>${!info}</p>" +
						"<p data-dojo-attach-point='categoryNode'>${category}</p>" +
						"<a class='button tiny' data-dojo-attach-point='buttonNode'>Delete</a> </div>",
					postCreate: function() {
						var domNode = this.domNode;
						this.inherited(arguments);

						this.own(
							on(this.buttonNode,"click", lang.hitch(this, "_deleteLink"))
						);
					},

					_deleteLink: function() {
						var Links = Parse.Object.extend("Links");
						var query = new Parse.Query(Links);

						query.get(this.id, {
						  success: function(object) {
						    // The object was retrieved successfully.
						    var linkObject = object;
						    linkObject.destroy();
						    //if(dom.byId(this.id)) {
						    	domConstruct.empty("todoLinkContainer");
						    	domConstruct.destroy(this.id);
						    //}
						  },
						  error: function(object, error) {
						  }
						});
					}

				});


	console.dir(categories);
	$("#noteSection").style("display", "none");	
	var showNote = dom.byId("showNotes");
	on(showNotes, "click", function() {
		if(categories) {
			if(domStyle.get("todoLink").display != "none") {
				$("#todoLink").style("display", "none");	
				$("#noteSection").style("display", "block");	
				showNotes.innerHTML = "return";
			} else {
				$("#todoLink").style("display", "block");
				$("#noteSection").style("display", "none");	
				showNotes.innerHTML = "display notes"
			}
		} else {
			alert("Please create a category")
		}
	});	

	for(var i = 0; i < categories.length; i++) {
		var inner = "<a id='category-" +categories[i].name +"'>"+ categories[i].name + "</a>"; 
		console.log(inner);
		domConstruct.create("li", {
				innerHTML: inner,
			}, categoryContainer);

		on(dom.byId("category-" + categories[i].name), "click", function(i) {
			mainCategory = categories[i].name
			alert(mainCategory);
			NotesContainer = [];
			LinksContainer = [];
			TodosContainer = [];
			var links = new Links();
			links.fetch({
				success: function(myObject) {
				  LinksContainer = myObject._serverData.results;
				  console.dir(LinksContainer);
				  for(var j = 0; j < LinksContainer.length;j++){
				  	LinksContainer[j].id = LinksContainer[j].objectId;
				  	(new LinkWidget(LinksContainer[j])).placeAt(dom.byId("todoLinkContainer"));
				  }

				},
				error: function(myObject, error) {
				  alert(error);
				}
			});

		}.bind(this, i));
	}

});


require(["dojo/parser", "dijit/Dialog", "dijit/form/Form", "dijit/form/Button", "dijit/form/ValidationTextBox"]);
require(["dojo/parser", "dijit/Editor"]);

