console.log("things are good")
var comparable = [];
var currentChart = [];
var myChart;
var fillColors = [ 'rgba(0,144,218,0)',
  'rgba(0,179,152,0)',
  'rgba(222,124,0,0)',
  'rgba(220,68,5,0)',
  'rgba(134,31,65,0)' ];
var hrColors = [ 'rgba(0,144,218,1)',
  'rgba(0,179,152,1)',
  'rgba(222,124,0,1)',
  'rgba(220,68,5,1)',
  'rgba(134,31,65,1)' ];
hexToRGB = function(hex){
    var r = hex >> 16;
    var g = hex >> 8 & 0xFF;
    var b = hex & 0xFF;
    return [r,g,b];
}

var c = 0;

var settings0 = {
"async": true,
"crossDomain": true,
"url": "https://all-server.herokuapp.com/init",
"method": "GET",
}
var settings1 = {
"async": true,
"crossDomain": true,
"url": "https://all-server.herokuapp.com/classdata",
"method": "GET",
"headers": {
    "content-type": "application/json",
  }
}


$(document).ready(function() {
  console.log("document has loaded!");
  //get init data
$.ajax(settings0).done(function (response) {
  response.forEach(function(e){
    comparable.push(e.className)
    $("#listCohorts").append("<li>"+e.className+"</li>")
  })
});
});

$(document).on('click','#listCohorts li',function(){
  var clicked = this.innerText
  settings1.url = "https://all-server.herokuapp.com/getclass?class="+clicked
  $.ajax(settings1).done(function (response) {

    var dataPoints = [];
    //formats data
    response.dates.forEach(function(e){
      dataPoints.push(
        response.data.reduce(function(acc,el){
          if(el.dateCheckedIn === e){
            acc++
          }
          return acc
        },0)
      )
    })

    //resets the chart & links to avoid scaling issues
    currentChart = [clicked]
    c = 0;
    console.log(currentChart)
    $('#chart-container').html('<canvas id="myChart"></canvas>')
    $('#compareClasses').html('')
    //draw chart after ajax
    var ctx = document.getElementById('myChart');
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: response.dates,
        datasets: [{
          label: clicked,
          data: dataPoints,
          borderColor: hrColors[c],
          backgroundColor: [fillColors[c]]
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false
      }
    });
    console.log(myChart)
    comparable.forEach(function(element){
      if(element !== clicked){
        $('#compareClasses').append("<li>"+element+"</li>")
      }
    })

  });
})

$(document).on('click','#compareClasses li',function(){
  var coHort = this.innerText
  currentChart.push(coHort)
  settings1.url = "https://all-server.herokuapp.com/getclass?class="+coHort
  this.innerText = '';
  $.ajax(settings1).done(function (response) {
    var dataPoints = [];
    //formats data
    response.dates.forEach(function(e){
      dataPoints.push(
        response.data.reduce(function(acc,el){
          if(el.dateCheckedIn === e){
            acc++
          }
          return acc
        },0)
      )
    })

    if(myChart.data.labels.length < response.dates.length){
      myChart.data.labels = response.dates
    }
    c++
    myChart.data.datasets.push({
      label: coHort,
      data: dataPoints,
      borderColor: hrColors[c],
      backgroundColor: [fillColors[c]]
    })

    myChart.update()
  })
})
