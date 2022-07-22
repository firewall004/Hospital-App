<template>
  <div id="chart">
    <client-only>
      <vue-apex-charts height="450" width="1165" type="scatter" :options="chartOptions" :series="series">
      </vue-apex-charts>
    </client-only>
  </div>
</template>

<script>
export default {
  data: () => ({
    series: [
      {
        name: '16g Needle',
        data: [
          { x: '03-08-2021', y: 1 },
          { x: '03-10-2021', y: 1 },
        ],
      },
      {
        name: '17g Needle',
        data: [],
      },
      {
        name: 'Bed Sheet',
        data: [
          { x: '03-05-2021', y: 3 },
          { x: '03-08-2021', y: 3 },
          { x: '03-10-2021', y: 3 },
          { x: '03-12-2021', y: 3 },
          { x: '03-19-2021', y: 3 },
          { x: '03-22-2021', y: 3 },
          { x: '03-24-2021', y: 3 },
        ],
      },
      {
        name: 'Tubing',
        data: [],
      },
      {
        name: 'Chemical M/C',
        data: [
          { x: '03-05-2021', y: 5 },
          { x: '03-08-2021', y: 5 },
          { x: '03-10-2021', y: 5 },
          { x: '03-12-2021', y: 5 },
          { x: '03-24-2021', y: 5 },
          { x: '03-19-2021', y: 5 },
          { x: '03-22-2021', y: 5 },
        ],
      },
      {
        name: 'Chemical D&T',
        data: [
          { x: '03-05-2021', y: 6 },
          { x: '03-08-2021', y: 6 },
          { x: '03-10-2021', y: 6 },
          { x: '03-12-2021', y: 6 },
          { x: '03-24-2021', y: 6 },
          { x: '03-19-2021', y: 6 },
          { x: '03-22-2021', y: 6 },
        ],
      },
      {
        name: 'Dialyzer',
        data: [],
      },
      {
        name: 'Heparin',
        data: [{ x: '03-08-2021', y: 8 }],
      },
      {
        name: 'IV Set',
        data: [
          { x: '03-05-2021', y: 9 },
          { x: '03-08-2021', y: 9 },
          { x: '03-10-2021', y: 9 },
          { x: '03-12-2021', y: 9 },
          { x: '03-24-2021', y: 9 },
          { x: '03-19-2021', y: 9 },
          { x: '03-22-2021', y: 9 },
        ],
      },
      {
        name: 'NS 1000ml',
        data: [
          { x: '03-05-2021', y: 10 },
          { x: '03-08-2021', y: 10 },
          { x: '03-10-2021', y: 10 },
          { x: '03-12-2021', y: 10 },
          { x: '03-24-2021', y: 10 },
          { x: '03-19-2021', y: 10 },
          { x: '03-22-2021', y: 10 },
        ],
      },
      {
        name: 'NS 500ml',
        data: [],
      },
      {
        name: 'Syringe 10ml',
        data: [],
      },
      {
        name: 'Syringe 5ml',
        data: [],
      },
      {
        name: 'A/B Part',
        data: [
          { x: '03-05-2021', y: 14 },
          { x: '03-08-2021', y: 14 },
          { x: '03-10-2021', y: 14 },
          { x: '03-12-2021', y: 14 },
          { x: '03-24-2021', y: 14 },
          { x: '03-19-2021', y: 14 },
          { x: '03-22-2021', y: 14 },
        ],
      },
      {
        name: 'Transducer',
        data: [],
      },
    ],
    chartOptions: {
      chart: {
        type: 'scatter',
        zoomtype: 'xy',
        toolbar: {
          show: true,
        },
      },
      grid: {
        padding: {
          left: 30,
          top: 10,
        },
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      colors: [
        '#C5D8A4',
        '#BB9981',
        '#FFD365',
        '#533E85',
        '#488FB1',
        '#F68989',
        '#874356',
        '#FF1818',
        '#F473B9',
        '#D9CE3F',
        '#E2DEA9',
        '#05595B',
        '#E2D784',
        '#D77FA1',
        '#FF8264',
      ],
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
        text: 'Pre-dialysis conditions (! apex charts issue )',
        align: 'left',
        style: {
          fontSize: '20px',
        },
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 10,
        tickPlacement: 'on',
        min: '03-05-2021',
        max: '03-24-2021',
      },
      yaxis: {
        title: {
          text: 'Consumables',
        },
        tickAmount: 15,
        // forceNiceScale: true,
        labels: {
          formatter: (val, index) => {
            if (index === 1) return '16g Needle'
            if (index === 2) return '17g Needle'
            if (index === 3) return 'Bed Sheet'
            if (index === 4) return 'Tubing'
            if (index === 5) return 'Chemical M/C'
            if (index === 6) return 'Chemical D&T'
            if (index === 7) return 'Dialyzer'
            if (index === 8) return 'Heparin'
            if (index === 9) return 'IV Set'
            if (index === 10) return 'NS 1000ml'
            if (index === 11) return 'NS 500ml'
            if (index === 12) return 'Syringe 10ml'
            if (index === 13) return 'Syringe 5ml'
            if (index === 14) return 'A/B Part'
            if (index === 15) return 'Transducer'
          },
        },
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
