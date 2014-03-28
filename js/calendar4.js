function Event(event) {    
  var id; 
  this.start = event.start;
  this.end = event.end;
  this.height = event.end - event.start;
  this.timesOverlap = 0;
  this.eventsToLeft = 0;
  this.eventsToRight = 0;
  this.eventsOnBothSides = 0;
  this.item = event.item;
  this.location = event.location;

};

function Container(totalTime) {
  this.eventsArr = [];
  this.timeSpots = [];
  this.totalTime = totalTime;
};

function Testobject(){
  this.addId = [];
};


function layOutDay(events) {
  // make a day calendar without any of the events overlapping
  test = new Testobject;
  container = new Container(720);
  var canvas=document.getElementById("calCanvas");
  canvas.width = "600";
  canvas.height = "700";
    
    sortEvents(events);
    addId(events);
    getOverlappingEvents(container.eventsArr,container.overlap);
    countOvelapsToLeft(container.eventsArr,container.overlap);
    alert(container.eventsArr.toSource());

    drawEvents(container.eventsArr,canvas);
};

function sortEvents(events){
    // sort events from earliest start 
    events.sort(function(a,b) {
    var result = a.start-b.start;
      if(result) {
      return result;  
      }
      return a.end - b.end;
    }); 
    return events;  
};

function addId(events){
   var testingArr = [];
    for(var i=0; i<events.length; i++) {
        event = new Event(events[i]);
        event.id = i;
        container.eventsArr.push(event);
        testingArr.push(event.id);
    }
    return testingArr[testingArr.length -1];
}

function





function drawEvents(eventsArray, canvas) {
  //draw out each event on the canvas
  var xaxis = 0;
  var xaxisSpace = 0;
  var previousEventWidth = 0;
  var width = parseInt(canvas.width);
  var ctx = canvas.getContext("2d");
    
    for(var i=0; i < eventsArray.length; i++) {
    var event = eventsArray[i];
      if(event.timesOverlap === 0) {
          var xaxis = 0; 
          var recWidth = width;
      }
      else{
        
          if (event.eventsToRight === 0){
            recWidth = width - (width / (event.timesOverlap + 1));
          }
          else{
             recWidth = (width / (event.timesOverlap + 1));
          }
        xaxis = previousEventWidth;
        xaxisSpace += recWidth;
        previousEventWidth += recWidth;
          if(xaxisSpace >= width){
              previousEventWidth = 0;
          }
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
           {start: 540, end: 600, item: "Sample Item", location: "Sample Location"},
           {start: 560, end: 620, item: "Sample Item", location: "Sample Location"},   
           {start: 610, end: 670, item: "Sample Item", location: "Sample Location"}
 ]);