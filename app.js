let provinceSelector = document.getElementById("my-select");
let spinner = document.getElementById("spinner");
let contentContainer = document.getElementById("content-container");

let url = "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=Pakistan";
let restData = {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "2afdc9fa8cmsheaa6d800875c59ap1ef7c6jsn8f0411164b7f",
		"x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com"
	}
};

let handleData = (data)=>{
    provinceSelector.addEventListener("change",(e)=>{
        if(e.target.value !== "none"){
            let index = Number(e.target.value);
            let province = data[index];
            renderChart(province);
        }
    })    
}
let renderChart = (province)=>{
    var options = {
        series: [province.confirmed, province.recovered, province.deaths],
        chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Confirmed', 'Recovered', 'Death'],
      responsive: [{
        breakpoint: 512,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
      };
    
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

let getData = async (a, b) => {
    let response = await fetch(a, b);
    let data = await response.json();
    handleData(data.data.covid19Stats);
    spinner.style.display = "none";
    contentContainer.style.display = "flex";
}




getData(url, restData);