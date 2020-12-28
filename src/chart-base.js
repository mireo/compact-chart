import _ from 'lodash';
import {chartjs_config, label_config, chartjs_sizing} from './chartjs-config';
import chart from 'chart.js';
import chart_data_labels from 'chartjs-plugin-datalabels';

export const color_palettes = {
	'grayscale': ['#768192', '#adb3be', '#cad2de', '#dfe4eb', '#f0f3fa'],
	'pastele-1': ['#fbb4ae','#b3cde3','#ccebc5','#decbe4','#fed9a6','#ffffcc'],
	'pastele-2': ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5','#ffed6f'],
	'mid-contrasting': ['#4e79a7','#f28e2c','#e15759','#76b7b2','#59a14f','#edc949','#af7aa1','#ff9da7','#9c755f','#bab0ab'],
	'high-contrasting-1': ['#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236', '#166a8f', '#00a950', '#58595b', '#8549ba', '#768192'],
	'high-contrasting-2': ['#f3c300', '#875692', '#f38400', '#a1caf1', '#be0032', '#c2b280', '#848482', '#008856', '#e68fac', '#0067a5', '#f99379', '#604e97', '#f6a600', '#b3446c', '#dcd300', '#882d17', '#8db600', '#654522', '#e25822', '#2b3d26', '#f2f3f4', '#222222']
};

const dflt_cpalette = 'high-contrasting-1';

const label_colors = {
	'grayscale': '#fff',
	'pastele-1': '#6D7E8F',
	'pastele-2': '#6D7E8F',
	'mid-contrasting': '#fff',
	'high-contrasting-1': '#fff',
	'high-contrasting-2': '#fff'
};

export var chart_colors = function(palette) {
	let colors = palette;
	if (typeof palette == 'string') colors = color_palettes[palette];
	return colors || color_palettes[dflt_cpalette];
};

export var color_at = function (idx, palette) {
	const colors = chart_colors(palette);
	return colors[idx % colors.length];
};

export var category_axis_column = function(format, resultset) {
	const category_axis_column = format.category_axis_column;
	if (category_axis_column == undefined) return null;

	const {cols} = resultset;
	let idx = category_axis_column;
	if (typeof category_axis_column == 'string') idx = cols.findIndex(c => c.name == category_axis_column);
	return idx;
};


const stchart_formats = {
	locale: 'en', //string that is a Unicode BCP 47 locale identifier (https://www.unicode.org/reports/tr35/tr35.html#BCP_47_Conformance)
	number_symbols: [
		{v: 1e-9, s: 'n'},
		{v: 1e-6, s: 'μ'},
		{v: 1e-3, s: 'm'},
		{v: 0},
		{v: 1e3 , s: 'k'},
		{v: 1e6 , s: 'M'},
		{v: 1e9 , s: 'G'},
		{v: 1e12, s: 'T'},
		{v: 1e15, s: 'P'},
		{v: 1e18, s: 'E'},
		{v: 1e21, s: 'Z'},
		{v: 1e24, s: 'Y'}
	],

	size: 'medium', // small, medium*, large

	color_palette: 'default',

	title: {
		label: '',
		// show: automatically calculated as !!label.trim()
		placement: 'top' // top* (as top center), left (as left vertical), bottom (as bottom center), right (as right vertical)
	},

	legend: {
		show: true,
		placement: 'top-end' // 'position-align'
		// position: top*, left, bottom, right
		// align: center*, start, end
		// * - default
	},

	labels: {
		show: false, // true, false*
		label: 'value', // value*, label, percentage (only if percentage_values: true and for), value-percentage
		placement: null,// anchor-align: center*, start, end & center, start, end, right, bottom, left, top
		// WISHLIST: font color: auto, custom
		// WISHLIST: allow labels to overlap: y/n
	},


	stacked: false,	// bar, line
	percentage_values: false, // bar, auto for pie

	axis: {
		type: null, // Chartjs default, 'linear', 'category', 'logarithmic'
		label: '',
		tick_orientation: null,  //auto, degrees 0 - 90, Only applicable to horizontal scales.
		range: null // auto, auto-0, []
		// TODO: ticks
	},

	// doughnut, gauge
	hole_size: 0.5, // ranges between 0-1
	//gauge
	angle: 180 // arc angle, value in decimal degrees
};

function get_sizing_format(format) {
	return chartjs_sizing[format.size || stchart_formats.size];
};

function chartjs_axis_format(axis, axis_format, stacked, perc_vals, locale, number_symbols) {
	let af = _.merge({}, stchart_formats.axis, axis_format);

	if (af.type) axis.type = af.type;
	if (stacked) axis.stacked = stacked;
	if (af.label) axis.scaleLabel.labelString = af.label;
	if (af.tick_orientation != undefined) {
		axis.ticks.minRotation = af.tick_orientation;
		axis.ticks.maxRotation = af.tick_orientation;
	}

	const range = af.range;
	if (range instanceof Array) {
		axis.ticks.min = range[0];
		axis.ticks.max = range[1];
	}
	if (range == 'auto-0')
		axis.ticks.beginAtZero = true;

	let tf = perc_vals ? chartjs_tick_formatters.percentage : chartjs_tick_formatters[axis.type] || chartjs_tick_formatters.category;
	axis.ticks.callback = function(value, index, ticks) {
		return tf.call(this, value, index, ticks, locale, number_symbols);
	};
	return axis;
};

export var chartjs_scales_config = function(ctype, format) {
	const sizing = get_sizing_format(format).scale;
	let xaxis = _.merge({}, chartjs_config.scale, chartjs_config[ctype].scales.xAxes[0], sizing);
	let yaxis = _.merge({}, chartjs_config.scale, chartjs_config[ctype].scales.yAxes[0], sizing);

	const {locale, number_symbols} = format;
	if (ctype == 'line') return {
		xAxes: [chartjs_axis_format(xaxis, format.xaxis, false, false, locale, number_symbols)],
		yAxes: [chartjs_axis_format(yaxis, format.yaxis, format.stacked, false, locale, number_symbols)]
	};

	if (ctype == 'bar') return {
		xAxes: [chartjs_axis_format(xaxis, format.xaxis, format.stacked, false, false, locale, number_symbols)],
		yAxes: [chartjs_axis_format(yaxis, format.yaxis, format.stacked, format.percentage_values, locale, number_symbols)]
	};

	if (ctype == 'horizontalBar') return {
		xAxes: [chartjs_axis_format(xaxis, format.xaxis, format.stacked, format.percentage_values, locale, number_symbols)],
		yAxes: [chartjs_axis_format(yaxis, format.yaxis, format.stacked, false, false, locale, number_symbols)]
	};

	return null;
};

export var chartjs_title_format = function(format) {
	let title = _.merge({}, chartjs_config.global.title, get_sizing_format(format).title);
	let tf = _.merge({}, stchart_formats.title, format.title);

	title.display = !!tf.label.trim();
	title.text = tf.label;
	title.position = tf.placement;

	return title;
};

export var chartjs_legend_format = function(format) {
	let legend = _.merge({}, chartjs_config.global.legend, {labels: get_sizing_format(format).legend});
	let lf = _.merge({}, stchart_formats.legend, format.legend);

	legend.display = lf.show;

	let [pos, align] = lf.placement.toLowerCase().split('-');
	if (!~['top', 'left', 'bottom', 'right'].indexOf(pos)) pos = 'top';
	if (!~['center', 'start', 'end'].indexOf(align)) align = 'right';
	legend.position = pos;
	legend.align = align;

	return legend;
};

export var chartjs_doughnut_format = function(format) {
	const {hole_size=0.5} = format;
	return {
		cutoutPercentage: hole_size * 100
	};
};

export var chartjs_gauge_format = function(format) {
	const {hole_size=0.5, angle=180} = format;
	return {
		circumference: angle * Math.PI / 180,
		rotation: ((angle == 360) ? -90 : (-180 - angle)/2) * Math.PI / 180,
		cutoutPercentage: hole_size * 100
	};
};

export var chartjs_label_format = function(ctype, format) {
	const datalabels = _.merge({}, label_config.global, label_config[ctype], get_sizing_format(format).labels);
	const lf = _.merge({}, stchart_formats.labels, format.labels);

	if (!lf.display) return {datalabels};

	datalabels.display = true;
	if (lf.placement) {
		const [anchor, align] = lf.placement.split('-');
		datalabels.anchor = anchor;
		datalabels.align = align;
	}

	let color = lf.color;
	if (!color) color = label_colors[format.color_palette] || label_colors[dflt_cpalette];
	if (color) datalabels.color = color;

	const df = get_display_formatter(ctype, format);
	const templates = {
		'label': '<%= label %>',
		'value': '<%= formatter.value(value) %>',
		'percentage': '<%= formatter.percentage(perc) %>',
		'value-percentage': '<%= formatter.value(value) %> (<%= formatter.percentage(perc) %>)'
	};
	const template = _.template(templates[lf.label], {imports: {formatter: df} });
	datalabels.formatter = function(v, context) {
		const ds = context.dataset;
		const values = {
			label: ds.label,
			value: v,
			perc: v/_.sum(ds.data)
		}
		let rv = template(values);
		return rv;
	};

	if (ctype == 'line') {
		datalabels.formatter = function(v, context) {
			const ds = context.dataset;
			const values = {
				label: ds.label,
				value: v.y,
				perc: v.y
			}
			let rv = template(values);
			return rv;
		};

		datalabels.backgroundColor = function(context) {
			return context.dataset.borderColor;
		};
	}
	return {datalabels};
};

var format_number = function(value, locale, number_symbols) {
	if (value == 0) return {
 		v: 0,
 		nv: 0,
 		s: '',
 		str: '0'
 	};

 	let nv = value;
 	let symbol = '';

 	const symbols = number_symbols || stchart_formats.number_symbols;
 	for (let i = 0; i < symbols.length; ++i) {
 		const ns = symbols[i];
 		if (value < ns.v) break;

 		nv = value / (ns.v || 1);
 		symbol = ns.s;
 	}

 	nv = new Intl.NumberFormat(locale || stchart_formats.locale, {maximumSignificantDigits: 0, maximumSignificantDigits: 2}).format(nv);
 	return {
 		v: value,
 		nv: nv,
 		s: symbol,
 		str: symbol ? `${nv} ${symbol}` : nv
 	};
};

var chartjs_tick_formatters = {
	category: function(value, index, ticks, locale) { return value; },
	linear: function(value, index, ticks, locale, number_symbols) {
		return format_number(value, locale, number_symbols).str;
	},
	logarithmic: function(value, index, ticks, locale, number_symbols) {
		if (value == 0) return '0';
		const fv = format_number(value, locale, number_symbols);
		const r = Math.floor( value / (Math.pow(10, Math.floor(Math.log10(value)))) );
		if (r == 0 || r == 1 || r == 2 || r == 5 || index == ticks.length - 1) return fv.str;
		return '';

	},
	percentage: function(value, index, ticks, locale, number_symbols) {
		return `${format_number(value * 100, locale, number_symbols).str} %`;
	}
};

var chartjs_display_formatters = {
	text: function(value) { return value; },
	number: function(value) { return format_number(value).str; },
	percentage: function(value) { return `${format_number(value * 100).str} %`; }
};

function get_display_formatter(ctype, format) {
	const df = chartjs_display_formatters;

	if (ctype == 'pie') {
		return {
			title: _.bind(df.text, null, _, format.locale, format.number_symbols),
			value: _.bind(df.number, null, _, format.locale, format.number_symbols),
			percentage: _.bind(df.percentage, null, _, format.locale, format.number_symbols)
		};
	}
	if (ctype == 'line') {
		const t =  _.get(format.xaxis, 'type', chartjs_config.line.scales.xAxes[0].type);
		return {
			title: _.bind(t == 'category' ? df.text : df.number, null, _, format.locale, format.number_symbols),
			value: _.bind(df.number, null, _, format.locale, format.number_symbols)
		};
	}

	return {
		title: _.bind(df.text, null, _, format.locale, format.number_symbols),
		value: _.bind(format.percentage_values ? df.percentage : df.number, null, _, format.locale, format.number_symbols),
		percentage: _.bind(df.percentage, null, _, format.locale, format.number_symbols)
	};
};

export var chartjs_tooltp_format = function(ctype, format) {
	const df = get_display_formatter(ctype, format);

	if (ctype == 'pie') {
		return {
			// https://github.com/chartjs/Chart.js/blob/df942bb579be72619beb42e13720e9f325161ce4/src/controllers/controller.doughnut.js#L98
			callbacks: {
				title: function() { return ''; },
				label: function(item, data) {
					let labels = data.labels[item.index];
					const label = (_.isArray(labels)) ? labels.slice() : labels;
					const value = data.datasets[item.datasetIndex].data[item.index];
					return `${label}: ${df.value(value)}`;
				}
			}
		};
	}

	return {
		// https://github.com/chartjs/Chart.js/blob/df942bb579be72619beb42e13720e9f325161ce4/src/core/core.tooltip.js#L40
		callbacks: {
			title: function(items, data) {
				if (!items.length) return '';

				const item = items[0];
				const label = ctype == 'horizontalBar' ? item.yLabel : item.xLabel;
				if (label != undefined) return df.title(label);

				const labels = data.labels;
				const lcnt = labels ? labels.length : 0;
				if (lcnt > 0 && item.index < lcnt) return df.title(labels[item.index]);
				return '';

			},
			label: function(item, data) {
				let label = data.datasets[item.datasetIndex].label || '';
				const value = ctype == 'horizontalBar' ? item.xLabel : item.yLabel;
				return item.yLabel ? `${label}: ${df.value(value)}` : label;
			}
		}
	};
};

export var chartjs_mixin = {
	props: {
		format: {type: Object}
	},
	async mounted() {
		this.render();
		this.$emit('update:status', 'Loading');

		const pr = new Promise((resolve) => resolve(this.format.data));
		try {
			const result = await pr;
			this.render(result);
		}
		catch(err) {}
		finally {
			this.$emit('update:status', '');
		}
	},
	methods: {
		render(response, format) {}
	}
};