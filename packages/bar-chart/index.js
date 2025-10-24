import ElBarChart from './src/bar-chart';

/* istanbul ignore next */
ElBarChart.install = function(Vue) {
  Vue.component(ElBarChart.name, ElBarChart);
};

export default ElBarChart;

