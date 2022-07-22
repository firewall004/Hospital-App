<template>
  <div id="wrapper">
    <client-only>
      <div id="chart-line2">
        <vue-apex-charts
          type="line"
          height="350"
          width="1200"
          :options="chartOptions"
          :series="series"
        ></vue-apex-charts>
      </div>
      <div id="chart-line">
        <vue-apex-charts
          type="area"
          height="130"
          width="1200"
          :options="chartOptionsLine"
          :series="seriesLine"
        ></vue-apex-charts>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  data: () => ({
    // Line Chart
    series: [
      {
        name: 'Pre-dialysis BP Stolic',
        data: [
          { x: '04/13/2021', y: 145 },
          { x: '04/14/2021', y: 135 },
          { x: '04/15/2021', y: 120 },
          { x: '04/16/2021', y: 127 },
          { x: '04/17/2021', y: 130 },
          { x: '04/18/2021', y: 140 },
          { x: '04/19/2021', y: 120 },
          { x: '04/20/2021', y: 132 },
          { x: '04/21/2021', y: 129 },
          { x: '04/22/2021', y: 119 },
          { x: '04/23/2021', y: 113 },
          { x: '04/24/2021', y: 115 },
          { x: '04/25/2021', y: 147 },
          { x: '04/26/2021', y: 139 },
          { x: '04/27/2021', y: 125 },
          { x: '04/28/2021', y: 110 },
          { x: '04/29/2021', y: 147 },
          { x: '04/30/2021', y: 150 },
          { x: '04/31/2021', y: 115 },
        ],
      },
      {
        name: 'Post-dialysis BP Stolic',
        data: [
          { x: '04/13/2021', y: 110 },
          { x: '04/14/2021', y: 120 },
          { x: '04/15/2021', y: 150 },
          { x: '04/16/2021', y: 123 },
          { x: '04/17/2021', y: 129 },
          { x: '04/18/2021', y: 135 },
          { x: '04/19/2021', y: 115 },
          { x: '04/20/2021', y: 139 },
          { x: '04/21/2021', y: 110 },
          { x: '04/22/2021', y: 148 },
          { x: '04/23/2021', y: 150 },
          { x: '04/24/2021', y: 126 },
          { x: '04/25/2021', y: 140 },
          { x: '04/26/2021', y: 130 },
          { x: '04/27/2021', y: 146 },
          { x: '04/28/2021', y: 126 },
          { x: '04/29/2021', y: 150 },
          { x: '04/30/2021', y: 115 },
          { x: '04/31/2021', y: 125 },
        ],
      },
    ],
    chartOptions: {
      chart: {
        id: 'chartLineStolic',
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
      colors: ['#533E85', '#4FD3C4'],
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
        text: 'BP Stolic',
        align: 'left',
        style: {
          fontSize: '20px',
        },
      },
      fill: {
        opacity: 0.6,
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
          text: 'BP ( Stolic ) of Patient',
        },
        forceNiceScale: true,
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
          { x: '04/13/2021', y: 110 },
          { x: '04/14/2021', y: 120 },
          { x: '04/15/2021', y: 150 },
          { x: '04/16/2021', y: 123 },
          { x: '04/17/2021', y: 129 },
          { x: '04/18/2021', y: 135 },
          { x: '04/19/2021', y: 115 },
          { x: '04/20/2021', y: 139 },
          { x: '04/21/2021', y: 110 },
          { x: '04/22/2021', y: 148 },
          { x: '04/23/2021', y: 113 },
          { x: '04/24/2021', y: 115 },
          { x: '04/25/2021', y: 147 },
          { x: '04/26/2021', y: 139 },
          { x: '04/27/2021', y: 125 },
          { x: '04/28/2021', y: 110 },
          { x: '04/29/2021', y: 147 },
          { x: '04/30/2021', y: 150 },
          { x: '04/31/2021', y: 115 },
        ],
      },
    ],
    chartOptionsLine: {
      chart: {
        id: 'chartAreaStolic',
        height: 130,
        type: 'area',
        brush: {
          target: 'chartLineStolic',
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
      colors: ['#C1F8CF'],
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
