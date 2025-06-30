import {gettingDate} from "./ConvertDate";
export const getChartData=(setChartData,prices1,prices2)=>{
  console.log('getChartData called with:', {
    prices1Length: prices1?.length,
    prices2Length: prices2?.length,
    prices1Sample: prices1?.slice(0, 3),
    prices2Sample: prices2?.slice(0, 3)
  });
  
  if (prices2) {
    const chartData = {
      labels: prices1?.map((data) => gettingDate(data[0])),
      datasets: [
        {
          label: "Crypto 1",
          data: prices1?.map((data) => data[1]),
          borderWidth: 1,
          fill: false,
          backgroundColor: "rgba(58, 128, 233,0.1)",
          tension: 0.25,
          borderColor: "#3a80e9",
          pointRadius: 0,
          yAxisID: "crypto1",
        },
        {
          label: "Crypto 2",
          data: prices2?.map((data) => data[1]),
          borderWidth: 1,
          fill: false,
          tension: 0.25,
          borderColor: "#61c96f",
          pointRadius: 0,
          yAxisID: "crypto2",
        },
      ],
    };
    
    console.log('Setting chart data:', {
      labelsLength: chartData.labels?.length,
      datasetsLength: chartData.datasets?.length,
      dataset1DataLength: chartData.datasets[0]?.data?.length,
      dataset2DataLength: chartData.datasets[1]?.data?.length
    });
    
    setChartData(chartData);
  } else {
    const chartData = {
      labels: prices1?.map((data) => gettingDate(data[0])),
      datasets: [
        {
          data: prices1?.map((data) => data[1]),
          borderWidth: 1,
          fill: true,
          backgroundColor: "rgba(58, 128, 233,0.1)",
          tension: 0.25,
          borderColor: "#3a80e9",
          pointRadius: 0,
          yAxisID: "crypto1",
        },
      ],
    };
    
    console.log('Setting single chart data:', {
      labelsLength: chartData.labels?.length,
      datasetsLength: chartData.datasets?.length,
      datasetDataLength: chartData.datasets[0]?.data?.length
    });
    
    setChartData(chartData);
  }
};