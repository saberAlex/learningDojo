// the parser is only needed, if you want
// to instantiate the widget declaratively (in markup)
require([
    "dojo/_base/declare", "dojo/dom-construct", "dojo/ready", "dojo/_base/window",
    "dijit/_WidgetBase","dijit/_TemplatedMixin",
], function(declare, domConstruct, ready, win, _WidgetBase, _TemplatedMixin){

    declare("MyFirstWidget", [_WidgetBase], {
        buildRendering: function(){
            // create the DOM for this widget
            this.domNode = domConstruct.create("button", {innerHTML: "push me", class: "btn btn-info"});
        }
    });

    declare("BusinessCard", [_WidgetBase, _TemplatedMixin], {
    	templateString:
    		"<div class='businessCard'>"+
    			"<div> Name: <span data-dojo-attach-point='nameNode'></span></div>" +
    			"<div> Phone #: <span data-dojo-attach-point='phoneNode'></span></div>"+
    			"<div> Profile: <img span data-dojo-attach-point='imageNode'></div>"+
    		"</div>",
    		//specify the attribute:
    		//I see so this is thee default value... 
    		name : "unknown",
    		_setNameAttr: { node: "nameNode", type: "innerHTML"},

    		nameClass: "employeeName",
    		_setNameClassAttr: {node: "nameNode", type: "class"},

    		phone: "unknown",
    		_setPhoneAttr: {node: "phoneNode", type: "innerHTML"},

    		img: "./img/kupo.gif",
    		_setImgAttr: {node:"imageNode", type:"attribute", attribute:"src"}
    });

    //another example using setter and getter:
    declare("HidePane", [_WidgetBase], {
        // parameters
        open: true,

        _setOpenAttr: function(/*Boolean*/ open){
            this._set("open", open);
            domStyle.set(this.domNode, "display", open ? "block" : "none");
        }
    });

    declare("HidePane2", [_WidgetBase], {
            // parameters
            open: true,

            _setOpenAttr: function(/*Boolean*/ open){
                this._set("open", open);
                domStyle.set(this.domNode, "display", open ? "block" : "none");
            }
        });


    ready(function(){
        // Create the widget programmatically and place in DOM
        (new MyFirstWidget()).placeAt(win.body());
    });
 });
