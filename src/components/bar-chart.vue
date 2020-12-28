<script>
import {Bar, HorizontalBar} from 'vue-chartjs';
import {chartjs_config} from '../chartjs-config';
import {chartjs_mixin, color_at, chartjs_title_format, chartjs_legend_format, chartjs_scales_config, category_axis_column, chartjs_label_format, chartjs_tooltp_format} from '../chart-base';
import _ from 'lodash';

function create_bar_options(format) {
	const title = chartjs_title_format(format);
	const legend = chartjs_legend_format(format);
	const scales = chartjs_scales_config('bar', format);
	const datalabels = chartjs_label_format('bar', format);
	const tooltips = chartjs_tooltp_format('bar', format);
	let opts = _.merge({}, chartjs_config.global, chartjs_config.bar, {title}, {legend}, {scales}, {plugins: datalabels}, {tooltips});
	return opts;
};

function create_hbar_options(format) {
	const title = chartjs_title_format(format);
	const legend = chartjs_legend_format(format);
	const scales = chartjs_scales_config('horizontalBar', format);
	const datalabels = chartjs_label_format('horizontalBar', format);
	const tooltips = chartjs_tooltp_format('horizontalBar', format);
	let opts = _.merge({}, chartjs_config.global, chartjs_config.horizontalBar, {title}, {legend}, {scales}, {plugins: datalabels}, {tooltips});
	return opts;
};

function create_bar_dataset(response = {cols: [], data: []}, format) {
	const {cols:rvcols, data:rvdata} = response;
	const cat_col_idx = category_axis_column(format, response);
	if (cat_col_idx == undefined) return {labels: [], datasets: []};

	let datasets = rvcols.reduce((rv, col, i) => {
		if (i == cat_col_idx) return rv;
		rv.push({
			label: col.name,
			backgroundColor: color_at(rv.length, format.color_palette),
			data: rvdata.map(x => x[i])
		});
		return rv;
	}, []);

	if (format.percentage_values) {
		datasets.forEach(ds => {
			let {data} = ds;
			const sum = _.sum(data);
			ds.data = data.map(y => y/sum);
		});
	}

	const ds = {
		labels: rvdata.map(x => x[cat_col_idx]),
		datasets: datasets
	};
	return ds;
};

var BarChart = {
	mixins: [chartjs_mixin, Bar],
	props: {
		format: {type: Object}
	},
	data: () => ({}),
	methods: {
		render(response) {
			const ds = create_bar_dataset(response, this.format);
			const opts = create_bar_options(this.format);
			this.renderChart(ds, opts);
		}
	}
};

var HorizontalBarChart = {
	mixins: [chartjs_mixin, HorizontalBar],
	props: {
		format: {type: Object}
	},
	data: () => ({}),
	methods: {
		render(response) {
			const ds = create_bar_dataset(response, this.format);
			const opts = create_hbar_options(this.format);
			this.renderChart(ds, opts);
		}
	}
};

export default {BarChart, HorizontalBarChart};
</script>