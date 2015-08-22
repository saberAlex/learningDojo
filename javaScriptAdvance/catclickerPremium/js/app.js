var myModel;
var jobCounter = [];
require([
	"dojo/request", 
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/json",
	"dojo/on",
	"dojo/Stateful",
	"dojo/_base/declare",
	"dojo/domReady!"],
	function(request, dom, domConstruct, JSON, on, Stateful, declare){

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

		//CONTROLLER:
		myModel.watch("jobModel", function(name, oldValue, value){
			renderListView(value);
		});

		myModel.watch("currentJob", function(name, oldValue, value){
			var jobContainer = dom.byId("jobContainer");
			if( value && oldValue && value.name != oldValue.name) {
				renderCurrentJob(value);
			} else if (jobContainer.getElementsByTagName("p")[0]){
				//rerender the counter:
				var s = "";
				s += "Total count <span class='badge'>" + value.counter + "</span>"
				jobContainer.getElementsByTagName("p")[0].innerHTML = s;
			}
		});


		request("data/job.json", {
		      handleAs: "json"
		    }).then(function(data){
  				myModel.set("jobModel", data);
		});


		//view:
		function renderListView(jobModel) {
			var jobList = dom.byId("jobList");
			for(var i = 0; i < jobModel.length; i++) {
				 jobCounter.push(0);
				  //create the element:
				  domConstruct.create("a", {
				  	innerHTML: myModel.get("jobModel")[i].name,
				  	class: "list-group-item"
				  }, jobList);

				  //create clicker:
				  on(jobList.getElementsByTagName("a")[i], "click", function(index) {
				  	var current = myModel.get("jobModel")[index];
				  			current.counter = jobCounter[index];
				  			current.id = index;
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
				jobCounter[currentJob.id] = currentJob.counter;
				myModel.set("currentJob", currentJob);
			});

		}

	});
