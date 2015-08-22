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

      person : null,
      _personGetter : function() {
        return this.person;
      },
      _personSetter : function(value) {
        this.person = value;
      }

    });

    var myModel = new MyModel();
    var petWidgets = [];



    //CONTROLLER:
    //getting all the model data:
    request("data/person.json", {
        handleAs: "json"
      }).then(function(data){
        myModel.set("person", data);
    });

    myModel.watch("person", function(name, oldValue, value){
      if(oldValue === null) {
        initMap(value.places);
        initProfile(value);
        initPet(value.pet, petWidgets);    
      }
    });


  });



//VIEW:
function initProfile(person){
  require(["dojo/dom",  "dojo/dom-attr"], function(dom, domAttr){
    var mainProfile = dom.byId("mainProfile");
    mainProfile.getElementsByTagName("h2")[0].innerHTML = person.name;
    mainProfile.getElementsByTagName("p")[0].innerHTML = person.email;
    mainProfile.getElementsByTagName("a")[0].innerHTML = person.blog;
    domAttr.set("mainProfileBlog","href", person.blog);
    mainProfile.getElementsByTagName("p")[1].innerHTML = person.bio;
  });
}

function initMap (places) {
  var centerInit = {lat: 50.477154, lng: 78.935183};
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: centerInit
  });

  require(["dojo/request"], function(request){

  for(var i = 0; i < places.length; i++){
    request.get("https://maps.googleapis.com/maps/api/geocode/json?", {
      query: {
        address: places[i],
        key:"AIzaSyDPz9XzG2PjtTfhIC7-t9TSsThOh2wj05I"
      }, 
      handleAs: "json",
      headers: { "X-Requested-With": null }
      }).then(function(data){
        //Put marker:
        var marker = new google.maps.Marker({
          position: data.results[0].geometry.location,
          map: map,
          title: places[i]
        });
      });
  }
  });
}

function initPet(pets, petWidgets) {
  require(["dojo/request", "dojo/dom", "dojo/dom-construct", "dojo/on", "dijit/registry", "dojo/_base/array", "myApp/widget/PetWidget", "dojo/domReady!"],
    function(request, dom, domConstruct, on, registry, arrayUtil, PetWidget){

        var petContainer = dom.byId("petContainer");

        counter = 0;
        arrayUtil.forEach(pets, function(pet){
          petWidgets.push(new PetWidget(pet)); 
          petWidgets[counter].placeAt(petContainer);
          counter++;
        });

      });
}