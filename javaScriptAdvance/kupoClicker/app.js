"use strict";
var model;
require([
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/on",
	"dojo/parser",
	"dojo/Stateful",
	"dojo/domReady!"
	],
	function(dom, domConstruct, on, parser, Stateful){
		//ADDING DATA BINDING:
		model = new Stateful({
			Kupo1: "Kupo1",
			Kupo2: "Kupo2",
			Kupo3: "Kupo3"
		});
		parser.parse();
		console.log(model);


		var div = dom.byId("div1");
		// //append to list
		domConstruct.create("p", {
			innerHTML: "I am appeded to the end of the list",
			className: "seven",
			style: {
				fontWeight: "bold",
				color: "firebrick"
			}
		}, div);
	var counter = [];
	for(var i = 0; i < 7; i++) {
		counter.push(i);
		domConstruct.create("img", {
			src: "./img/kupo.gif",
			id: "kupo"+i
		}, div);
		domConstruct.create("p", {
			innerHTML: 0,
			id: "kupop"+i
		}, div);
		//var kuponow = "kupop"+i;
		on(dom.byId("kupo"+i), "click", function(i) {
			console.log("Kupo, I got clicked Kupo!!");
			counter[i]++;
			console.log(counter);
			var kupop = "kupop"+ i;
			console.log("kupop");
			dom.byId(kupop).innerHTML = counter[i];
			console.log(model);
		}.bind(this, i));
	}

	});
