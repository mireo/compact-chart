<script>
import _ from 'lodash';
import {Pie, Doughnut} from 'vue-chartjs';
import {chartjs_config} from '../chartjs-config';
import {chartjs_mixin, chart_colors, chartjs_title_format, chartjs_legend_format, chartjs_doughnut_format, chartjs_gauge_format, chartjs_label_format, category_axis_column, chartjs_tooltp_format} from '../chart-base';

function create_pie_options(format) {
	const title = chartjs_title_format(format);
	const legend = chartjs_legend_format(format);
	const datalabels = chartjs_label_format('pie', format);
	const tooltips = chartjs_tooltp_format('pie', format);
	let opts = _.merge({}, chartjs_config.global, chartjs_config.pie, {title}, {legend}, {plugins: datalabels}, {tooltips});
	return opts;
};

function create_doughnut_options(format) {
	const title = chartjs_title_format(format);
	const legend = chartjs_legend_format(format);
	const doughnut = chartjs_doughnut_format(format);
	const datalabels = chartjs_label_format('pie', format);
	const tooltips = chartjs_tooltp_format('pie', format);
	let opts = _.merge({}, chartjs_config.global, chartjs_config.doughnut, {title}, {legend}, doughnut, {plugins: datalabels}, {tooltips});
	return opts;
};

function create_gauge_options(format) {
	const title = chartjs_title_format(format);
	const legend = chartjs_legend_format(format);
	const gauge = chartjs_gauge_format(format);
	const datalabels = chartjs_label_format('pie', format);
	const tooltips = chartjs_tooltp_format('pie', format);
	let opts = _.merge({}, chartjs_config.global, chartjs_config.doughnut, {title}, {legend}, gauge, {plugins: datalabels}, {tooltips});
	return opts;
};

function create_pie_dataset(response = {cols: [], data: []}, format) {
	const {cols:rvcols, data:rvdata} = response;
	const cat_col_idx = category_axis_column(format, response);
	if (cat_col_idx == undefined) return {labels: [], datasets: []};

	const datasets = rvcols.reduce((rv, col, i) => {
		if (i == cat_col_idx) return rv;
		rv.push({
			label: col.name,
			data: rvdata.map(x => x[i]),
			backgroundColor: chart_colors(format.color_palette)
		});
		return rv;
	}, []);

	const ds = {
		labels: rvdata.map(x => x[cat_col_idx]),
		datasets: datasets
	};
	return ds;
};

var PieChart = {
	mixins: [chartjs_mixin, Pie],
	props: {
		format: {type: Object}
	},
	data: () => ({}),
	methods: {
		render(response) {
			const ds = create_pie_dataset(response, this.format);
			const opts = create_pie_options(this.format);
			this.renderChart(ds, opts);
		}
	}
};

var DoughnutChart = {
	mixins: [PieChart],
	methods: {
		render(response) {
			const ds = create_pie_dataset(response, this.format);
			const opts = create_doughnut_options(this.format);
			this.renderChart(ds, opts);
		}
	}
};

var GaugeChart = {
	mixins: [PieChart],
	methods: {
		render(response) {
			const ds = create_pie_dataset(response, this.format);
			const opts = create_gauge_options(this.format);
			this.renderChart(ds, opts);
		}
	}
};
export default {PieChart, DoughnutChart, GaugeChart};
</script>