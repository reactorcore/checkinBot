console.log("things are good")

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
    $("#listCohorts").append("<li>"+e.className+"</li>")
  })
});
});

$(document).on('click','li',function(){
  console.log(this.innerText)
  settings1.url = "https://all-server.herokuapp.com/getclass?class="+this.innerText
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

    //resets the chart to avoid scaling issues
    $('#chart-container').html('<canvas id="myChart"></canvas>')
    //draw chart after ajax
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: response.dates,
        datasets: [{
          label: 'Attendence',
          data: dataPoints,
          backgroundColor: "rgba(153,255,51,0.4)"
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false
      }
    });

  });
})
