Events = [];

function Event(event) {
    
	this.start = event.start;
	this.end = event.end;
	this.height = event.end - event.start;
	this.overlap = 0;
	this.width = 100 / (this.overlap);
	var coverage;
	

};

function layOutDay(events) {
	for(var i=0; i<=events.length; i++)
	{
		event = new Event(events[i]);
		for(var j=0; j<=events.length; j++)
		{
			if(isThereOverlap(events[i],events[j]))
			{
				event.overlap++;
				if (events[i].start - events[j].start > 0)
					{
						event.coverage = event.height/(events[i].start - events[j].end);
					}
				else
					{
						event.coverage = event.height/(events[j].start - events[i].end);

					}
				
				
			}
		}
		Events.push(event);
	}
};
	
function isThereOverlap(event1,event2){
	if(((event2.start >= event1.start) && (event2.start < event1.end)) || 
		((event1.start >= event2.start) && (event1.start < event2.end))) {
			return true;
	}
	else{
		return false;
	}
};



layOutDay([{start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ]);
alert(Events);
