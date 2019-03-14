$(document).ready(function() {



    var chart = new CanvasJS.Chart("squadgraf", {    	
		data: [              
		{			
			type: "doughnut",
			dataPoints: [
				{ label: "apple",  y: 18  },
				{ label: "orange", y: 15  },
				{ label: "banana", y: 25  }
			]
		}
		]
	});
  
	chart.render();
  	
var logo = document.getElementById("logosquad");
logo.style.top = (chart.bounds.y2 - chart.bounds.y1)/2 + "px";
logo.style.left = (chart.bounds.x2 - chart.bounds.x1)/2 - 20 + "px";



})
