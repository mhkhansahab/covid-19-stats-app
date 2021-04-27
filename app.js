const provinceSelector = document.getElementById("my-select");
const spinner = document.getElementById("spinner");
const contentContainer = document.getElementById("content-container");
const pieChart = document.querySelector("#chart");

const url = "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=Pakistan";
const restData = {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "2afdc9fa8cmsheaa6d800875c59ap1ef7c6jsn8f0411164b7f",
		"x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com"
	}
};

const handleData = (data)=>{
    provinceSelector.addEventListener("change",(e)=>{
        if(e.target.value !== "none"){
            if(pieChart.childNodes[0] !== undefined){
              pieChart.removeChild(pieChart.childNodes[0]);
            }
            let index = Number(e.target.value);
            let province = data[index];
            renderChart(province);
        }
    })    
}
const renderChart = (province)=>{
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
    
    var chart = new ApexCharts(pieChart, options);
    chart.render();
}

const getData = async (url, restData) => {
    let response = await fetch(url, restData);
    let data = await response.json();
    spinner.style.display = "none";
    contentContainer.style.display = "flex";
    handleData(data.data.covid19Stats);
}

getData(url, restData);