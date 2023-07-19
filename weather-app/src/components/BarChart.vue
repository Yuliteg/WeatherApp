<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    wind: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartData() {
    const data = Object.values(this.wind);
    const labels = Object.keys(this.wind);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Wind Data',
          backgroundColor: '#34d71bc3',
          data: data
        }
      ]
      }
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>