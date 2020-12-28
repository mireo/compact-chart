<script>
import {Line} from 'vue-chartjs';
import {chartjs_config} from '../chartjs-config';
import {chartjs_mixin, color_at, chartjs_title_format, chartjs_legend_format, chartjs_scales_config, category_axis_column, chartjs_label_format, chartjs_tooltp_format} from '../chart-base';
import _ from 'lodash';
import color from 'color';

function create_line_options(format) {
	const title = chartjs_title_format(format);
	const legend = chartjs_legend_format(format);
	const scales = chartjs_scales_config('line', format);
	const datalabels = chartjs_label_format('line', format);
	const tooltips = chartjs_tooltp_format('line', format);
	let opts = _.merge({}, chartjs_config.global, chartjs_config.line, {title}, {legend}, {scales}, {plugins: datalabels}, {tooltips});
	return opts;
};

function create_line_dataset(response = {cols: [], data: []}, format) {
	const {cols:rvcols, data:rvdata} = response;
	const cat_col_idx = category_axis_column(format, response);
	if (cat_col_idx == undefined) return {labels: [], datasets: []};

	const datasets = rvcols.reduce((rv, col, i) => {
		if (i == cat_col_idx) return rv;
		rv.push({
			label: col.name,
			borderColor: color_at(rv.length, format.color_palette),
			borderWidth: 2,
			fill: false,
			data: rvdata.map(x => ({x: x[cat_col_idx], y: x[i]}))  //linear type
		});
		return rv;
	}, []);

	const ds = {
		labels: rvdata.map(x => x[cat_col_idx]),
		datasets: datasets
	};
	return ds;
};

function create_area_dataset(response = {cols: [], data: []}, format) {
	const {cols:rvcols, data:rvdata} = response;
	const cat_col_idx = category_axis_column(format, response);
	if (cat_col_idx == undefined) return {labels: [], datasets: []};

	const datasets = rvcols.reduce((rv, col, i) => {
		if (i == cat_col_idx) return rv;
		const bc = color_at(rv.length, format.color_palette);
		const fc = color(bc).fade(0.25).string();
		rv.push({
			label: col.name,
			borderColor: bc,
			backgroundColor: fc,
			borderWidth: 2,
			fill: true,
			data: rvdata.map(x => ({x: x[cat_col_idx], y: x[i]}))  //linear type
		});
		return rv;
	}, []);

	const ds = {
		labels: rvdata.map(x => x[cat_col_idx]),
		datasets: datasets
	};
	return ds;
};

var LineChart = {
	mixins: [chartjs_mixin, Line],
	props: {
		format: {type: Object}
	},
	data: () => ({}),
	methods: {
		render(response) {
			const ds = create_line_dataset(response, this.format);
			const opts = create_line_options(this.format);
			this.renderChart(ds, opts);
		}
	}
};

var AreaChart = {
	mixins: [LineChart],
	methods: {
		render(response) {
			const ds = create_area_dataset(response, this.format);
			const opts = create_line_options(this.format);
			this.renderChart(ds, opts);
		}
	}
};
export default {LineChart, AreaChart};
</script>