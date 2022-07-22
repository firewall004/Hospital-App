<template>
  <client-only>
    <div id="chart">
      <vue-apex-charts height="450" width="1165" type="line" :options="chartOptions" :series="series">
      </vue-apex-charts>
    </div>
  </client-only>
</template>

<script>
export default {
  data: () => ({
    series: [
      {
        name: 'Creatinine',
        data: [
          { x: '04/13/2021', y: 4 },
          { x: '04/14/2021', y: 4 },
          { x: '04/15/2021', y: 4 },
          { x: '04/16/2021', y: 4 },
          { x: '04/17/2021', y: 4 },
          { x: '04/18/2021', y: 4 },
          { x: '04/19/2021', y: 3 },
          { x: '04/20/2021', y: 4 },
          { x: '04/21/2021', y: 3 },
          { x: '04/22/2021', y: 3 },
          { x: '04/23/2021', y: 3 },
          { x: '04/24/2021', y: 3 },
          { x: '04/25/2021', y: 4 },
          { x: '04/26/2021', y: 4 },
          { x: '04/27/2021', y: 4 },
          { x: '04/28/2021', y: 3 },
          { x: '04/29/2021', y: 3 },
          { x: '04/30/2021', y: 3 },
          { x: '04/31/2021', y: 3 },
          // 5,6,7
        ],
      },
      //   {
      //     name: "Post BP Stolic",
      //     data: dates,
      //   },
    ],
    chartOptions: {
      chart: {
        type: 'line',
        stacked: false,
        height: 350,
        width: '100%',
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true, // scales the y axis automatically based on the data
        },
        toolbar: {
          autoSelected: 'zoom',
        },
        animations: {
          enabled: true,
          easing: 'easein',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 100,
          },
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
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 3,
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

      title: {
        text: 'Creatinine Value',
        align: 'center',
        style: {
          fontSize: '20px',
        },
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
      yaxis: {
        title: {
          text: 'Creatinine',
          style: {
            fontSize: '13px',
          },
        },
        min: 2,
        max: 5,
        // forceNiceScale: true,
        // tooltip: {
        //   enabled: true,
        // },
      },
      xaxis: {
        title: {
          text: 'Date',
          style: {
            fontSize: '13px',
          },
        },
        type: 'datetime',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      colors: ['#F0A500'],
      fill: {
        type: 'solid',
        fillOpacity: 0.7,
      },
      annotations: {
        xaxis: [
          {
            x: new Date('23 Apr 2021').getTime(),
            strokeDashArray: 0,
            borderColor: '#E45826',
            label: {
              borderColor: '#E45826',
              style: {
                color: '#fff',
                background: '#E45826',
                fontSize: '12px',
                fontWeight: 'bold',
              },
              text: 'EPO 10K',
            },
          },
        ],
        points: [
          {
            x: new Date('19 Apr 2021').getTime(),
            y: 3,
            marker: {
              size: 8,
              fillColor: '#fff',
              strokeColor: '#FF7F3F',
              radius: 2,
              cssClass: 'apexcharts-custom-class',
            },
            label: {
              borderColor: '#FF7F3F',
              offsetY: 0,
              style: {
                color: '#fff',
                background: '#FF7F3F',
                fontSize: '12px',
                fontWeight: 'bold',
              },

              text: 'EPO 4K',
            },
          },
        ],
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy',
        },
      },
    },
  }),
}
</script>
