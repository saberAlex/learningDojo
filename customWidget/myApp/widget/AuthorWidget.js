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
	"dijit/_TemplatedMixin",
	"dojo/text!./templates/authorWidget.html"
	], function( declare, baseFx, dom, domConstruct, lang, domStyle, mouse, on, _WidgetBase, _TemplatedMixin, template){
		return declare([_WidgetBase, _TemplatedMixin], {
		// Some default values for our author
		// These typically map to whatever you're passing to the constructor
		name: "No Name",
		avatar: require.toUrl("myApp/widget/images/agas.jpg"),
		bio: "",
		alias: "",
		counter: 0,
		 
		// Our template - important!
		templateString: "<div>" + 
			"<h3 data-dojo-attach-point='nameNode'>${name}</h3>" +
			"<img class='${baseClass}Avatar' src='' data-dojo-attach-point='avatarNode'>"+
			"<p data-dojo-attach-point='bioNode'>${!bio}</p>" +
			"<p data-dojo-attach-point='aliasNode'>${!alias}</p>" +
			"<p data-dojo-attach-point='counterNode'>${counter}</p>" +
			"<button data-dojo-attach-point='buttonNode'>Click me</button>" +
		"</div>",

		//via external template html
		//templateString : template,
		 
		// A class to be applied to the root node in our template
		baseClass: "authorWidget",
		 
		// A reference to our background animation
		mouseAnim: null,
		 
		// Colors for our background animation
		baseBackgroundColor: "#fff",
		mouseBackgroundColor: "#def",
		postCreate: function(){
		// Get a DOM node reference for the root of our widget
			var domNode = this.domNode;
			this.inherited(arguments);
			 
			// Set our DOM node's background color to white -
			// smoothes out the mouseenter/leave event animations
			domStyle.set(domNode, "backgroundColor", this.baseBackgroundColor);
			// Set up our mouseenter/leave events
			// Using dijit/Destroyable's "own" method ensures that event handlers are unregistered when the widget is destroyed
			// Using dojo/mouse normalizes the non-standard mouseenter/leave events across browsers
			// Passing a third parameter to lang.hitch allows us to specify not only the context,
			// but also the first parameter passed to _changeBackground
			this.own(
			on(domNode, mouse.enter, lang.hitch(this, "_changeBackground", this.mouseBackgroundColor)),
			on(domNode, mouse.leave, lang.hitch(this, "_changeBackground", this.baseBackgroundColor)),
			on(this.buttonNode, "click",  lang.hitch(this, "_calculate"))		

			);


		},

		_calculate: function() {
			this.counter += 1;
			this.counterNode.innerHTML = this.counter;
		},


		_changeBackground: function(newColor) {
		// If we have an animation, stop it
			if (this.mouseAnim) {
				this.mouseAnim.stop();
			}
		 
		// Set up the new animation
			this.mouseAnim = baseFx.animateProperty({
				node: this.domNode,
				properties: { backgroundColor: newColor },
				onEnd: lang.hitch(this, function() {
				// Clean up our mouseAnim property
					this.mouseAnim = null;
				})
				}).play();

		},

		_setAvatarAttr: function(imagePath) {
			if (imagePath != "") {
				// Save it on our widget instance - note that
				// we're using _set, to support anyone using
				// our widget's Watch functionality, to watch values change
				this._set("avatar", imagePath);
				 
				// Using our avatarNode attach point, set its src value
				this.avatarNode.src = imagePath;
			}
		}
		});
	});
