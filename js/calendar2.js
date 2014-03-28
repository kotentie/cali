Events = [];

function Event(event) {
    
	this.start = event.start;
	this.end = event.end;
	this.height = event.end - event.start;
	this.coverage = 0;
	var width; 

};

function layOutDay(events) {
    
    events.sort(function(a,b) {
    return a.start-b.start;
    });
    addHowMuchCoverage(events);
    calculateWidth(Event);
    	
};

function isThereOverlap(event1,event2){
	if(((event2.start >= event1.start) && (event2.start < event1.end)) || 
		((event1.start >= event2.start) && (event1.start < event2.end))) 
    {
		return true;
	}
	else{
		return false;
	}
};

function addHowMuchCoverage(eventsArr) {
    for(var i=0; i<eventsArr.length; i++)
	{
		event = new Event(eventsArr[i]);
		for(var j=0; j<eventsArr.length; j++)
		{
			if(isThereOverlap(eventsArr[i],eventsArr[j]) && i != j)
			{
			 event.coverage += (eventsArr[j].start - eventsArr[i].end);				
			}
		}
		Events.push(event);
	}
};

function calculateWidth(eventsArr) {
	for(var i=0; i<eventsArr.length; i++)
	{
		eventsArr[i].width = ceil(eventsArr[i].coverage / eventsArr[i].height);
	}
};


layOutDay([{start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start:700, end: 720}, {start: 610, end: 670} ]);
alert(Events.toSource());
