
  var eventsArr = [];
	var overlap = [];


function Event(event) {
    
    var id; 
	this.start = event.start;
	this.end = event.end;
	this.height = event.end - event.start;
	this.timesOverlap = 0;
	

};

function layOutDay(events) {  
    sortIntoArray(events);
    getOverlappingEvents(eventsArr);
    setWidth(eventsArr,overlap);
    drawEvents(eventsArr);


};

function getOverlappingEvents(eventArray) {
  var event1, event2
  
  // Get overlapping events
  for (var i=0; i<(eventArray.length - 1); i++) {
    event1 = eventArray[i];
    event2 = eventArray[i + 1];

    if ((event1.start <= event2.start && event1.end > event2.start) ||
        (event1.start < event2.end && event1.end >= event2.end) ) {
       overlap.push([event1.id, event2.id]);
    }
  }
  return overlap;
};

function setWidth(events, overlap){
	for(var i=0; i<events.length; i++){
		for(var j=0; j<overlap.length; j++){
		 var index = overlap[j].indexOf(events[i].id);
		 	if(index != -1 && overlap[j].length > events[i].timesOverlap){
                events[i].timesOverlap = overlap[j].length;
		 	}
	   }
    }
};

function sortIntoArray(events){
    events.sort(function(a,b) {
    return a.start-b.start;
    });
    for(var i=0; i<events.length; i++) {
        event = new Event(events[i]);
        event.id = i;
        eventsArr.push(event);
    }
};

function drawEvents(eventsArray) {
	var canvas=document.getElementById("calCanvas");
	canvas.width = "600";
	canvas.height = "700";
	var xaxis_overlap = 0;
	var width = parseFloat(canvas.width);
	var ctx=canvas.getContext("2d");
		for(var i=0; i < eventsArray.length; i++) {
		ctx.fillStyle="#ffffff";
		var event = eventsArray[i];
			if(event.overlap === 0) {
				if(xaxis_overlap >= parseFloat(canvas.width)){
					xaxis_overlap = 0;
				}
			var xaxis = 0;
			var recWidth = width; 

			}
			else{
				var recWidth = (width / event.overlap);
				xaxis = xaxis_overlap +recWidth;				
			}

		var yaxis = event.start;
		var be = 100 + event.timesOverlap;
		var recHeight = event.height;
		var recWidth = xaxis 
		ctx.fillRect(xaxis,yaxis,recWidth,recHeight);
		}
	
};



layOutDay([{start: 30, end: 150},
           {start: 540, end: 600},
           {start: 560, end: 620}, 
           {start:700, end: 720}, 
           {start: 610, end: 670}
          
 ]);
/*
Exception: overlap is not defined
getOverlappingEvents@Scratchpad/1:36
layOutDay@Scratchpad/1:19
@Scratchpad/1:98
*/