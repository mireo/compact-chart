<template>
	<div class='pw-100'>
		<component :is='chart_opts.type' class='pw-100' v-show="!status"
			:format='chart_opts'
			:status.sync='status'
		/>
		<div v-if='invalid_ctype'>Unsupported visual</div>
		<spinner-item v-if='status == "Loading"'/>
		<div v-else-if='status'>{{status}}</div>
	</div>
</template>


<style lang='css'>
	compact-chart { display: block; }
	.pw-100 { width: 100%; height: 100%; }
</style>


<script>

import SpinnerItem from './components/spinner-item';
import bc from './components/bar-chart';  const {BarChart, HorizontalBarChart} = bc;
import ac from './components/line-chart'; const {LineChart, AreaChart} = ac;
import pc from './components/pie-chart';  const {PieChart, DoughnutChart, GaugeChart} = pc;

const chart_types = {
	'bar-chart': BarChart,
	'horizontal-bar-chart': HorizontalBarChart,
	'line-chart': LineChart,
	'area-chart': AreaChart,
	'pie-chart': PieChart,
	'doughnut-chart': DoughnutChart,
	'gauge-chart': GaugeChart
};

export default {
	name: 'App',
	props: ['format'],
	data: () => ({
		status: ''
	}),
	computed: {
		chart_opts: function() {

			let format = this.format;
			if (typeof format == 'string') {
				try { format = JSON.parse(format); }
				catch (err) {}
			}

			const opts = {
				msql: '',
				type: '',
				...format
			};
			return opts;
		},
		invalid_ctype: function() {
			return !chart_types[this.chart_opts.type];
		}
	},

	components: {SpinnerItem, ...chart_types},
	mounted() { }
}

</script>
