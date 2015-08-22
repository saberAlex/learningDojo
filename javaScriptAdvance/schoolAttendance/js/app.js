var TOTALDAYS = 15;
var studentMap = {};

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

						studentList : null,
						_studentListGetter : function() {
								return this.studentList;
						},
						_studentListSetter : function(value) {
								this.studentList = value;
						}

				});

				myModel = new MyModel({
						studentList : []
				});


				request("data/student.json", {
							handleAs: "json"
						}).then(function(data){
								console.log(data.missed);
								for(var i = 0; i < data.length; i++) {
										data[i].missed = data[i].missed + TOTALDAYS;
										studentMap[data[i].name] = i;
								}
								myModel.set("studentList", data);
								initView(data);
				});

				//CONTROLLER:
				$allCheckboxes = $('tbody');
				$allCheckboxes.on('click','input', function() {
						var currentMissed = parseInt(this.parentNode.parentNode.children[TOTALDAYS+1].outerText);
						if(this.checked) {
								currentMissed -= 1;
						} else {
								currentMissed += 1;
						}
						this.parentNode.parentNode.children[TOTALDAYS+1].outerHTML ='<td class="missed-col">' +
																																currentMissed +'</td>';
						var name = this.parentNode.parentNode.children[0].outerText;
						//UPDATE the model:
						myModel.get("studentList")[studentMap[name]].missed = currentMissed;

				});

				//VIEW:
				function initView(studentList) {
							 //render the table head
							 var inner = "<tr><th class='name-col'>Student Name</th>";
							 for(var i = 0; i < TOTALDAYS; i++) {
								inner += "<th>" + (i+1) + "</th>";
							 }
								inner += "<th class='missed-col'>Days Missed-col</th></tr>";
								console.log(inner)
							 dom.byId("studentTable").getElementsByTagName("thead")[0].innerHTML = inner;
							 //Render the table MOdel 
								inner = "";
								for(var i = 0; i < studentList.length;i++) {
									 inner += "<tr class='student'><td class='name-col'>" + studentList[i].name + "</td>";
									 for(var j = 0; j < TOTALDAYS; j++) {
										inner += "<td class='attend-col'><input type='checkbox'></td>";
									 }
										inner += "<td class='missed-col'>" + parseInt(studentList[0].missed)  + "</th></tr>";
								}
								dom.byId("studentTable").getElementsByTagName("tbody")[0].innerHTML = inner;
				}



		});
