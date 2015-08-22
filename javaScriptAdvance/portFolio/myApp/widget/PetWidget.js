//myApp/widget/HeroWidget.js
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
	"dijit/_TemplatedMixin"
	], function( declare, baseFx, dom, domConstruct, lang, domStyle, mouse, on, _WidgetBase, _TemplatedMixin){
		return declare([_WidgetBase, _TemplatedMixin], {
		id: "",
		name: "No Name",
		avatar: require.toUrl("img/jinlee.gif"),
		happy: 0,
		 
		// Our template - important!
		templateString: "<div  class='col-md-3'>" + 
			"<h3 data-dojo-attach-point='nameNode'>${name}</h3>" +
			"<img class='${baseClass}Avatar img-responsive' src='' data-dojo-attach-point='avatarNode'>"+
			"<p data-dojo-attach-point='happyNode'>${happy}</p>" +
			"<button data-dojo-attach-point='buttonNode'>Pet me</button>" +
		"</div>",

		baseClass: "petWidget",
	
		postCreate: function(){
			var domNode = this.domNode;
			this.inherited(arguments);
			this.own( on(this.buttonNode, "click",  lang.hitch(this, "_calculate"))	);
		},

		_calculate: function() {
			this.happy += 1;
			this.happyNode.innerHTML = this.happy;
		},

		_setAvatarAttr: function(imagePath) {
			if (imagePath != "") {
				this._set("avatar", imagePath);
				this.avatarNode.src = imagePath;
			}
		}
		});
	});
