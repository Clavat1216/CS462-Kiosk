var places;
var toggle;

function parseModel(data){
	places = data.Places;
	console.log(places);
	updateDisplay();
	toggle = false;
}

function PlaceClicked(event){
	for(var i in places)
	{
		var select = "#"+i+"Area";
		var sel = "#"+i+"List";
		if(!toggle)
		{
			$(select).hide(300);
			if(event.id == i)
			{
				$(select).show(300);
				var html = ""
				for(var j = 0; j < places[event.id].length; j++)
				{
					html += '<li class="' + event.id + '" id="' + j + '" onclick="spotClicked(this)">'+ places[event.id][j].name+'</li>';
				}
				$(sel).html(html);
				$(sel).toggle(300);
				RemoveMarkers();
				AddPlaceMarkers(places[event.id], event.id)
			}
			else
			{
				$(sel).hide(300);
			}
		}
		else
		{
			$(select).show(300);
			$(sel).hide(300);
			RemoveMarkers();
			clearRoutes();
			AddPlaceMarkers(places["GovB"], "GovB");
			AddPlaceMarkers(places["Restaurant"], "Restaurant");
			AddPlaceMarkers(places["Store"], "Store");
			AddPlaceMarkers(places["Location"], "Location");
		}
	}
	toggle = !toggle;
}

function spotClicked(event) {
	spotClicker(event.className, event.id);
}

function spotClicker(cName, placeID){
	//TODO
	var className = cName;
	var id = placeID;
	var place = places[className][id];
	drawRoute(place);
	$("#spotList").remove();
	var html = '<ul id="spotList">';
	for(var i in places[className][id])
	{
		if(i != "coordinates" && i != "name" && i != "inventory" && i != "govBDept" && i != "govBServices" && i != "yelpReview" && i != "price" && i != "menu" && i != "activities" && i != "_id" && i != "__v")
		{
			switch(i){
				case "logo":
					html += '<li class="spotType">'+'<img class="imageLogo" src="'+places[className][id][i]+'"></img>'+'</li>';
					break;
				case "website":
					if(places[className][id][i] != "None")
					{
						html += '<li class="spotType">'+places[className][id][i]+'</li>';
					}
					break;
				case "address":
					html += '<li class="spotType">'+places[className][id][i]+'</li>';
					break;
				case "type":
					html += '<li class="spotType">Category: '+places[className][id][i]+'</li>';
					break;
				default:
					html += '<li class="spotType">'+i+": "+places[className][id][i]+'</li>';
					break;
			};
		}
	}
	html += "</ul>";
	var select = "#"+id+"."+className;
	$(select).after(html);
}

function updateDisplay(){
	console.log("Updating menu");
	var input = "";
	for(var i in places)
	{
		input = '<div class="placeType" id="' + i + '" onclick="PlaceClicked(this)"><a>' + i + '</a></div><ul class="PlaceList" id="' + i + 'List"></ul>';
		$("#"+i+"Area").html(input);
	}

	if(typeof map != 'undefined')
	{
		AddPlaceMarkers(places["GovB"], "GovB");
		AddPlaceMarkers(places["Restaurant"], "Restaurant");
		AddPlaceMarkers(places["Store"], "Store");
		AddPlaceMarkers(places["Location"], "Location");
	}
}

function loadModel()
{
	 $.ajax({
	 	type: 'GET',
	 	url: '/model/'
	 })
	 .done(parseModel);
     // parseModel(testModel);
}
