<template>
  <div id="wrapper">
    <client-only>
      <div id="chart-line2">
        <vue-apex-chart type="line" height="350" width="1200" :options="chartOptions" :series="series"></vue-apex-chart>
      </div>
      <div id="chart-line">
        <vue-apex-chart
          type="area"
          height="130"
          width="1200"
          align-center="true"
          :options="chartOptionsLine"
          :series="seriesLine"
        ></vue-apex-chart>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'WeightChart',
  data: () => ({
    series: [
      {
        name: 'Pre-dialysis Weight',
        data: [
          { x: '04/13/2021', y: 70 },
          { x: '04/14/2021', y: 67 },
          { x: '04/15/2021', y: 71 },
          { x: '04/16/2021', y: 67 },
          { x: '04/17/2021', y: 69 },
          { x: '04/18/2021', y: 70 },
          { x: '04/19/2021', y: 72 },
          { x: '04/20/2021', y: 69 },
          { x: '04/21/2021', y: 71 },
          { x: '04/22/2021', y: 68 },
          { x: '04/23/2021', y: 69 },
          { x: '04/24/2021', y: 73 },
          { x: '04/25/2021', y: 70 },
          { x: '04/26/2021', y: 69 },
          { x: '04/27/2021', y: 67 },
          { x: '04/28/2021', y: 72 },
          { x: '04/29/2021', y: 70 },
          { x: '04/30/2021', y: 73 },
          { x: '04/31/2021', y: 72 },
        ],
      },
      {
        name: 'Post-dialysis Weight',
        data: [
          { x: '04/13/2021', y: 67 },
          { x: '04/14/2021', y: 65 },
          { x: '04/15/2021', y: 70 },
          { x: '04/16/2021', y: 65 },
          { x: '04/17/2021', y: 67 },
          { x: '04/18/2021', y: 69 },
          { x: '04/19/2021', y: 70 },
          { x: '04/20/2021', y: 69 },
          { x: '04/21/2021', y: 70 },
          { x: '04/22/2021', y: 67 },
          { x: '04/23/2021', y: 65 },
          { x: '04/24/2021', y: 70 },
          { x: '04/25/2021', y: 70 },
          { x: '04/26/2021', y: 67 },
          { x: '04/27/2021', y: 67 },
          { x: '04/28/2021', y: 70 },
          { x: '04/29/2021', y: 67 },
          { x: '04/30/2021', y: 70 },
          { x: '04/31/2021', y: 70 },
        ],
      },
    ],
    chartOptions: {
      chart: {
        id: 'chart2',
        type: 'line',
        height: 230,
        toolbar: {
          autoSelected: 'pan',
          show: false,
        },
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
      },
      colors: ['#FFB2A6', '#9ADCFF'],
      stroke: {
        width: 3,
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        position: 'top',
        horizontalAlign: 'center',
        onItemClick: {
          toggleDataSeries: true,
        },
        onItemHover: {
          highlightDataSeries: true,
        },
      },
      title: {
        text: 'Weight',
        align: 'left',
        style: {
          fontSize: '20px',
        },
      },
      fill: {
        opacity: 1,
      },
      markers: {
        size: 4,
        strokeColor: '#F8EDE3',
        strokeWidth: 3,
        strokeOpacity: 1,
        fillOpacity: 1,
        hover: {
          size: 6,
        },
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        title: {
          text: 'Weight (kg)',
        },
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy',
        },
      },
    },
    // Area Chart
    seriesLine: [
      {
        data: [
          { x: '04/13/2021', y: 70 },
          { x: '04/14/2021', y: 67 },
          { x: '04/15/2021', y: 71 },
          { x: '04/16/2021', y: 67 },
          { x: '04/17/2021', y: 69 },
          { x: '04/18/2021', y: 70 },
          { x: '04/19/2021', y: 72 },
          { x: '04/20/2021', y: 69 },
          { x: '04/21/2021', y: 71 },
          { x: '04/22/2021', y: 68 },
          { x: '04/23/2021', y: 69 },
          { x: '04/24/2021', y: 73 },
          { x: '04/25/2021', y: 70 },
          { x: '04/26/2021', y: 69 },
          { x: '04/27/2021', y: 67 },
          { x: '04/28/2021', y: 72 },
          { x: '04/29/2021', y: 70 },
          { x: '04/30/2021', y: 73 },
          { x: '04/31/2021', y: 72 },
        ],
      },
    ],
    chartOptionsLine: {
      chart: {
        id: 'chart1',
        height: 130,
        type: 'area',
        brush: {
          target: 'chart2',
          enabled: true,
        },
        selection: {
          enabled: true,
          xaxis: {
            min: new Date('15 Apr 2021').getTime(),
            max: new Date('20 Apr 2021').getTime(),
          },
        },
      },
      colors: ['#FF9F45'],
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.91,
          opacityTo: 0.5,
        },
      },
      xaxis: {
        type: 'datetime',
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        tickAmount: 2,
        // min: 55,
        // max: 90,
      },
    },
  }),
}
</script>
