
require([
	"dojo/request", 
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/json",
	"dojo/on",
	"dojo/Stateful",
	"dojo/_base/declare",
	"dojo/dom-style",
	"dojo/dom-attr",
	"dojo/domReady!"],
	function(request, dom, domConstruct, JSON, on, Stateful, declare, domStyle, domAttr){

		var MyModel = declare([Stateful], {

			jobModel : null,
			_jobModelGetter : function() {
				return this.jobModel;
			},
			_jobModelSetter : function(value) {
				this.jobModel = value;
			},

			currentJob: null,
			_currentJobGetter : function() {
				return this.currentJob;
			},
			_currentJobSetter : function(value) {
				this.currentJob = value;
			}


		});

		myModel = new MyModel({
			jobModel : []
		});


		request("data/job.json", {
		      handleAs: "json"
		    }).then(function(data){
  				myModel.set("jobModel", data);
		});



		//CONTROLLER:
		myModel.watch("jobModel", function(name, oldValue, value){
			initView();
			renderListView(value);
		});

		myModel.watch("currentJob", function(name, oldValue, value){
			if( value && value.name != (oldValue.name || "")) {
				renderCurrentJob(value);
			} else{
				//rerender the counter:
				renderCounter(value);
			}
		});


		//admin controller:
		on(dom.byId("showAdminMenu"), "click", function() {
			showAdminMenu();
			if(myModel.get("currentJob")) {
				renderCurrentAdmin(myModel.get("currentJob"));
			}
		});	

		on(dom.byId("saveCurrent"), "click", function(event){
			event.preventDefault();
			var current = myModel.get("currentJob");
			current.name = domAttr.get("name", "value");
			current.url = domAttr.get("url", "value");
			current.counter = parseInt(domAttr.get("counter", "value"));
			myModel.get("jobModel")[current.id] = current;

			//rerender the view
			renderCurrentJob(current);
			renderListView(myModel.get("jobModel"));

		});

		on(dom.byId("closeAdmin"), "click", function(event){
			event.preventDefault();
			closeAdminMenu();
		});


		//view:

		function initView() {
			domStyle.set("adminForm", "display", "none");
		}

		function renderListView(jobModel) {
			var jobList = dom.byId("jobList");
			domConstruct.empty("jobList");
			for(var i = 0; i < jobModel.length; i++) {
				  //create the element:
				  domConstruct.create("a", {
				  	innerHTML: myModel.get("jobModel")[i].name,
				  	class: "list-group-item"
				  }, jobList);

				  //create clicker:
				  on(jobList.getElementsByTagName("a")[i], "click", function(index) {
				  	var current = myModel.get("jobModel")[index];
				  	myModel.set("currentJob", current);
				  }.bind(this, i));
			}
		}

		function renderCurrentJob(currentJob) {
			var jobContainer = dom.byId("jobContainer");
			var s = "";
			s += "<h1>" + currentJob.name + "</h1>";
			s += "<img src='" + currentJob.url + "'/>";
			s += "<p> Total count <span class='badge'>" + currentJob.counter + "</span> </p>"
			s += "<button type='button' class='btn btn-info'>click me please</button>";

			jobContainer.innerHTML = s;
			on(jobContainer.getElementsByTagName("button")[0], "click", function() {
				currentJob.counter += 1;
				myModel.get("jobModel")[currentJob.id].counter = currentJob.counter;
				myModel.set("currentJob", currentJob);
			});

		}

		function renderCounter(currentJob) {
			var jobContainer = dom.byId("jobContainer");
			var s = "";
			s += "Total count <span class='badge'>" + currentJob.counter + "</span>"
			jobContainer.getElementsByTagName("p")[0].innerHTML = s;
		}

		//ADMIN VIEW
		function showAdminMenu() {
			if(domStyle.get("adminForm").display != "none") {
				domStyle.set("adminForm", "display", "none");
			} else {
				domStyle.set("adminForm", "display", "block");
			}
		}

		function renderCurrentAdmin(currentJob) {
			domAttr.set("name", "value", currentJob.name);
			domAttr.set("url", "value", currentJob.url);
			domAttr.set("counter", "value", currentJob.counter);
		}

		function closeAdminMenu() {
			domStyle.set("adminForm", "display", "none");
		}

	});
