define([
	"dojo/_base/declare",
	"dojo/_base/fx",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/_base/lang",
	"dojo/dom-style",
	"dojo/mouse",
	"dojo/on",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dojo/text!./templates/linkWidget.html"
	], function(declare, baseFx, dom, domConstruct, lang, domStyle, mouse, on, _WidgetBase, _TemplatedMixin, template){
		return declare("LinkWidget",[_WidgetBase, _TemplatedMixin], {
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
				var domNode : this.domNode;
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
				    if(dom.byId(this.id){
				    	domConstruct.empty("todoLinkContainer");
				    	domConstruct.destroy(this.id);
				    })
				  },
				  error: function(object, error) {
				  }
				});
			}

		})
	})