let dateInput = document.querySelector("#date");

// const URL = "https://api.frankfurter.dev/v1/latest?base=USD";
const URL = "https://api.frankfurter.dev/v2/rates?base=INR/rates?quotes=USD,EUR";
let chart;
const data = async(para_date)=>{

    let fromdate = para_date || chnge_time();
    let new_src = `https://api.frankfurter.dev/v2/rates?base=USD&from=${fromdate}&quotes=INR`;

    
    let result = await fetch(new_src);
    let dataset = await result.json();
    
    let rates = [];

    for (let data of dataset){
        let date = conv_tstamp(data.date);
        let rate = data.rate;
        rates.push([date,rate]);        
    }
   
    return rates;
}  

const chnge_time = ()=>{
    const date = new Date(); 
    date.setDate(date.getDate() - 20);
    let readable = date.toISOString().split('T')[0];
    return readable;
}

const conv_tstamp = (date)=>{
    let date_obj = new Date(date);
    timestamp = date_obj.getTime();
    return timestamp;
}

const getdate = () => {
date.addEventListener("change",(evt) => {
        let date = evt.target.value;
        return date;
    });
}    

const create_chart = async (select_date) => {
   
    res_data = await data(select_date);   

    if (chart) {
        chart.series[0].setData(res_data);
        return;
    }

    chart = Highcharts.chart('container', {
        chart: {
            zooming: {
                type: ['y','x']
            }
        },
        title: {
            text: 'USD to INR exchange rate over time'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' :
                'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Exchange rate'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                marker: {
                    fillColor: '#A63446',
                    lineColor: '#FCFCFF',
                    lineWidth: 1,
                    radius: 0.1
                    // radius: 1
                },
                lineWidth: 1,
                color: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        // [0, 'rgb(201, 92, 255)'],
                        // [0.7, 'rgb(76, 175, 254)']
                        [0, 'rgba(126,25,70)'],
                        [0.4, 'rgba(166,52,70)'],
                        [1, 'rgba(245,226,200)']
                    ]
                },
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'USD to INR  ',
            data: res_data
        }]
    });
}

create_chart();

dateInput.addEventListener("change",async(evt)=>{
    
    let select_date = evt.target.value;
    await create_chart(select_date);
});