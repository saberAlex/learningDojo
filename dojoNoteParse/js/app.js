
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
	"dojo/NodeList-dom",
	"dojo/domReady!"
	], function(declare, inline, dom, domConstruct, on, arrayUtil, _WidgetBase, _TemplatedMixin, date,$, TabContainer, ContentPane, dojoButton, domStyle){
	console.dir(categories);

	$("#noteSection").style("display", "none");	
	var showNote = dom.byId("showNotes");
	on(showNotes, "click", function() {
		if(domStyle.get("todoLink").display != "none") {
			$("#todoLink").style("display", "none");	
			$("#noteSection").style("display", "block");	
			showNotes.innerHTML = "return";
		} else {
			$("#todoLink").style("display", "block");
			$("#noteSection").style("display", "none");	
			showNotes.innerHTML = "display notes"
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
		}.bind(this, i));
	}

});


require(["dojo/parser", "dijit/Dialog", "dijit/form/Form", "dijit/form/Button", "dijit/form/ValidationTextBox"]);
require(["dojo/parser", "dijit/Editor"]);

