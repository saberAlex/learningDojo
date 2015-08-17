"use strict";

require(["dojo/dom", "dojo/dom-construct","dojo/on", "dojo/domReady!"],
	function(dom, domConstruct, on){
		var list = dom.byId("list"),
		three = dom.byId("three");

		// //append to list
		domConstruct.create("li", {
			innerHTML: "I am appeded to the end of the list",
			className: "seven",
			style: {
				fontWeight: "bold",
				color: "firebrick"
			}
		}, list);

		//appended to the place after three
		domConstruct.create("li", {
			innerHTML: "Three and a half"
		}, three, "after");

		function moveLast(node) {
			var list = dom.byId("list");
			var node = dom.byId(node);

			domConstruct.place(node, list, "after");
		}

		on(dom.byId("imageKupo"), "click", function() {
			 moveLast("imageKupo");
			 destroyFirst();
			 destroyAllAndCreateNew();
		});

		//destroying is part of the dom construct.. so lets do it dudee...
		function destroyFirst(){
			var list = dom.byId("list");
			var items = list.getElementsByTagName("li");

			if(items.length){
				domConstruct.destroy(items[0]);
			}
		}

		function destroyAllAndCreateNew(){
			domConstruct.empty("listDestroyed");
			var list = dom.byId("listDestroyed");
			domConstruct.create("li", {
				innerHTML: "I am appeded to the end of the list at " + Date.now(),
				style: {
					fontWeight: "bold",
					color: "firebrick"
				}
			},  list);

		}


});

//    <script type="text/javascript" src="./js/moment.js"></script>
