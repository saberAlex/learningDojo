//creating name and button widget!!!

require([
	"dojo/_base/declare",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/on",
	"dojo/_base/array",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dojo/date",
	"dojo/domReady!"
	], function(declare, dom, domConstruct, on, arrayUtil, _WidgetBase, _TemplatedMixin, date){
		//model
		var textList = [];

		declare("simpleWidget", [_WidgetBase, _TemplatedMixin],{
			//default id
			id:"",
			createdDate: (new Date()),
			note:"untitled",
			templateString: "<div>" +
			"<p data-dojo-attach-point = 'noteNode'>${note}</p>" +
			"<p data-dojo-attach-point = 'dateNode'>${createdDate}</p>" +
			"<button data-dojo-attach-point='buttonNode'>destroySelf</button>" +
			"</div>",
			postCreate: function() {
				var domNode = this.domNode;
				this.inherited(arguments);
				this.own(
					on(this.buttonNode, "click", function() {
							 domConstruct.destroy(this.id);
					}.bind(this))
				);
			}
		});


		
		var container = dom.byId("simpleWidgetContainer");
		on(dom.byId("addNote"), "click", function() {
			var noteText = dom.byId("inputNote");
			var newNote = {
				note: noteText.value,
				id: "notes-" + textList.length
			}
			textList.push(newNote);
			(new simpleWidget(newNote).placeAt(container));
			 noteText.value = "";
		});


		               


	});