function Event(event) {    
  var id; 
  this.start = event.start;
  this.end = event.end;
  this.height = event.end - event.start;
  this.timesOverlap = 0;
  this.eventsToLeft = 0;
  this.item = event.item;
  this.location = event.location;

};

function Container() {
  this.eventsArr = [];
  this.overlap = []
};


function layOutDay(events) {
  // make a day calendar without any of the events overlapping
  container = new Container;
  var canvas=document.getElementById("calCanvas");
  canvas.width = "600";
  canvas.height = "700";
    
    sortIntoArray(events);
    getOverlappingEvents(container.eventsArr,container.overlap);
    setWidth(container.eventsArr,container.overlap);
    drawEvents(container.eventsArr,canvas);
};

function getOverlappingEvents(eventArray) {
  // creates an array of all event overlaps
 var event1, event2  

for (var i=0; i<(eventArray.length); i++) {
    event1 = eventArray[i];
    for (var j=0; j<eventArray.length; j++) {
      event2 = eventArray[j];
      if ( ((event1.start <= event2.end) && (event2.start <= event1.end) && (event1.id != event2.id)))
        {
          container.overlap.push([event1.id, event2.id]);    
      }
    }
}
  return container.overlap;
};

function setWidth(events, overlap){
  // find how many overlaps and event has and how many events it has to its left
  for(var i=0; i<events.length; i++){
    for(var j=0; j<overlap.length; j++){
     var index = overlap[j].indexOf(events[i].id);
      if(index != -1 && overlap[j][0] === events[i].id){
                events[i].timesOverlap++;
                if (overlap[j][1] < events[i].id)
                  {
                    events[i].eventsToLeft++;
                  } 
      }
     }
    }
};

function sortIntoArray(events){
    events.sort(function(a,b) {
    var result = a.start-b.start;
      if(result) {
      return result;  
      }
      return a.end - b.end;
    });
    for(var i=0; i<events.length; i++) {
        event = new Event(events[i]);
        event.id = i;
        container.eventsArr.push(event);
    }    
};

function drawEvents(eventsArray, canvas) {
  //draw out each event on the canvas
  var xaxis = 0;
  var width = parseInt(canvas.width);
  var ctx = canvas.getContext("2d");
    
    for(var i=0; i < eventsArray.length; i++) {
    var event = eventsArray[i];


      if(event.timesOverlap === 0) {
          var xaxis = 0; 
          var recWidth = width;
      }
      else{
        recWidth = (width / (event.timesOverlap + 1));
        xaxis = (event.eventsToLeft * recWidth);
        }
      drawEvent(ctx, event, xaxis, recWidth);
    }     
};

function drawEvent(ctx, event, xaxis, recWidth){
  //give the event some style
  ctx.fillStyle="#ffffff";
  var yaxis = event.start;
  var recHeight = event.height;
  ctx.fillRect(xaxis,yaxis,recWidth,recHeight);
  ctx.fillStyle ="#3c64a4";
  ctx.fillRect(xaxis,yaxis,4,recHeight);
  ctx.font = "bold 8pt tahoma";
  ctx.fillStyle = '#4c6898';
  ctx.fillText(event.item, xaxis + 8 , yaxis + 14);
  ctx.font = "bold 6pt tahoma";
  ctx.fillStyle = '#9f9f9f';
  ctx.fillText(event.location, xaxis + 8 , yaxis + 28);

};

layOutDay([{start: 30, end: 150, item: "Sample Item",location: "Sample Location"},
           {start: 560, end: 620, item: "Sample Item", location: "Sample Location"}, 
           {start: 560, end: 620, item: "Sample Item", location: "Sample Location"}, 
           {start: 600, end: 670, item: "Sample Item", location: "Sample Location"}
          
 ]);