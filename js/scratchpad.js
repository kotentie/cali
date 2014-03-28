
var overlap = [];

function Event(event) {
    
    var id; 
	this.start = event.start;
	this.end = event.end;
	this.height = event.end - event.start;
	this.timesOverlap = 0;
	

};

function layOutDay(events) {
    eventsArr = []
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
	var canvas=document.getElementById("myCanvas");
	for(var i=0; i<eventsArray.length; i++){
		var ctx=canvas.getContext("2d");
		ctx.fillStyle="#ffffff";
		ctx.fillRect(eventsArray[i].start,eventsArray[i].end,600/eventsArray[i].overlap,eventsArray[i].height);
	}
};



layOutDay([{start: 30, end: 150},
           {start: 540, end: 600},
           {start: 560, end: 620}, 
           {start:700, end: 720}, 
           {start: 610, end: 670}
          
 ]);

/*
Exception: c is null
drawEvents@Scratchpad/1:65
layOutDay@Scratchpad/1:20
@Scratchpad/1:73
*/