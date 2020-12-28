var chartjs_config = {
	"global": {
		"defaultColor": "rgba(0,0,0,0.1)",
		"defaultFontColor": "#666",
		"defaultFontFamily": "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
		"defaultFontSize": 12,
		"defaultFontStyle": "normal",
		"defaultLineHeight": 1.2,
		"showLines": true,
		"animation": {
			"duration": 1000,
			"easing": "easeOutQuart"
		},
		"elements": {
			"arc": {
				"backgroundColor": "rgba(0,0,0,0.1)",
				"borderColor": "#fff",
				"borderWidth": 2,
				"borderAlign": "center"
			},
			"line": {
				"tension": 0.4,
				"backgroundColor": "rgba(0,0,0,0.1)",
				"borderWidth": 3,
				"borderColor": "rgba(0,0,0,0.1)",
				"borderCapStyle": "butt",
				"borderDash": [],
				"borderDashOffset": 0,
				"borderJoinStyle": "miter",
				"capBezierPoints": true,
				"fill": true
			},
			"point": {
				"radius": 3,
				"pointStyle": "circle",
				"backgroundColor": "rgba(0,0,0,0.1)",
				"borderColor": "rgba(0,0,0,0.1)",
				"borderWidth": 1,
				"hitRadius": 1,
				"hoverRadius": 4,
				"hoverBorderWidth": 1
			},
			"rectangle": {
				"backgroundColor": "rgba(0,0,0,0.1)",
				"borderColor": "rgba(0,0,0,0.1)",
				"borderSkipped": "bottom",
				"borderWidth": 0
			}
		},
		"datasets": {
			"bar": {
				"categoryPercentage": 0.8,
				"barPercentage": 0.9
			},
			"horizontalBar": {
				"categoryPercentage": 0.8,
				"barPercentage": 0.9
			},
			"scatter": {
				"showLine": false
			}
		},
		"layout": {
			"padding": {
				"top": 0,
				"right": 0,
				"bottom": 0,
				"left": 0
			}
		},
		"plugins": {
			"filler": {
				"propagate": true
			}
		},
		"tooltips": {
			"enabled": true,
			"custom": null,
			"mode": "nearest",
			"position": "average",
			"intersect": true,
			"backgroundColor": "rgba(0,0,0,0.8)",
			"titleFontStyle": "bold",
			"titleSpacing": 2,
			"titleMarginBottom": 6,
			"titleFontColor": "#fff",
			"titleAlign": "left",
			"bodySpacing": 2,
			"bodyFontColor": "#fff",
			"bodyAlign": "left",
			"footerFontStyle": "bold",
			"footerSpacing": 2,
			"footerMarginTop": 6,
			"footerFontColor": "#fff",
			"footerAlign": "left",
			"yPadding": 6,
			"xPadding": 6,
			"caretPadding": 2,
			"caretSize": 5,
			"cornerRadius": 6,
			"multiKeyBackground": "#fff",
			"displayColors": true,
			"borderColor": "rgba(0,0,0,0)",
			"borderWidth": 0,
			"callbacks": {}
		},
		"events": [
			"mousemove",
			"mouseout",
			"click",
			"touchstart",
			"touchmove"
		],
		"hover": {
			"onHover": null,
			"mode": "nearest",
			"intersect": true,
			"animationDuration": 400
		},
		"onClick": null,
		"maintainAspectRatio": false,
		"responsive": true,
		"responsiveAnimationDuration": 0,
		"legend": {
			"display": true,
			"position": "top",
			"align": "end",
			"fullWidth": true,
			"reverse": false,
			"weight": 1000,
			"onHover": null,
			"onLeave": null,
			"labels": {
				"boxWidth": 10,
				"padding": 10,
				"fontColor": "#333",
				"fontSize": 11
			}
		},
		"title": {
			"display": false,
			"fontStyle": "bold",
			"fontColor": "#333",
			"fontSize": 14,
			"fullWidth": true,
			"padding": 5,
			"position": "top",
			"text": "",
			"weight": 2000
		}
	},
	"bar": {
		"hover": {
			"mode": "label"
		},
		"scales": {
			"xAxes": [
				{
					"type": "category",
					"offset": true,
					"gridLines": {
						"offsetGridLines": true,
						"drawOnChartArea": false
					}
				}
			],
			"yAxes": [
				{
					"type": "linear"
				}
			]
		}
	},
	"bubble": {
		"hover": {
			"mode": "single"
		},
		"scales": {
			"xAxes": [
				{
					"type": "linear",
					"position": "bottom",
					"id": "x-axis-0"
				}
			],
			"yAxes": [
				{
					"type": "linear",
					"position": "left",
					"id": "y-axis-0"
				}
			]
		},
		"tooltips": {
			"callbacks": {}
		}
	},
	"doughnut": {
		"animation": {
			"animateRotate": true,
			"animateScale": false
		},
		"hover": {
			"mode": "single"
		},
		"legend": {
			"labels": {}
		},
		"cutoutPercentage": 50,
		"rotation": -1.5707963267948966,
		"circumference": 6.283185307179586,
		"tooltips": {
			"callbacks": {}
		}
	},
	"horizontalBar": {
		"hover": {
			"mode": "index",
			"axis": "y"
		},
		"scales": {
			"xAxes": [
				{
					"type": "linear",
					"position": "bottom"
				}
			],
			"yAxes": [
				{
					"type": "category",
					"position": "left",
					"offset": true,
					"gridLines": {
						"offsetGridLines": true,
						"drawOnChartArea": false
					}
				}
			]
		},
		"elements": {
			"rectangle": {
				"borderSkipped": "left"
			}
		},
		"tooltips": {
			"mode": "index",
			"axis": "y"
		}
	},
	"line": {
		"showLines": true,
		"spanGaps": false,
		"hover": {
			"mode": "label"
		},
		"scales": {
			"xAxes": [
				{
					"type": "category",
					"id": "x-axis-0",
					"gridLines": {
						"drawOnChartArea": false
					}
				}
			],
			"yAxes": [
				{
					"type": "linear",
					"id": "y-axis-0"
				}
			]
		}
	},
	"polarArea": {
		"scale": {
			"type": "radialLinear",
			"angleLines": {
				"display": false
			},
			"gridLines": {
				"circular": true
			},
			"pointLabels": {
				"display": false
			},
			"ticks": {
				"beginAtZero": true
			}
		},
		"animation": {
			"animateRotate": true,
			"animateScale": true
		},
		"startAngle": -1.5707963267948966,
		"legend": {
			"labels": {}
		},
		"tooltips": {
			"callbacks": {}
		}
	},
	"pie": {
		"animation": {
			"animateRotate": true,
			"animateScale": false
		},
		"hover": {
			"mode": "single"
		},
		"legend": {
			"labels": {}
		},
		"cutoutPercentage": 0,
		"rotation": -1.5707963267948966,
		"circumference": 6.283185307179586,
		"tooltips": {
			"callbacks": {}
		}
	},
	"radar": {
		"spanGaps": false,
		"scale": {
			"type": "radialLinear"
		},
		"elements": {
			"line": {
				"fill": "start",
				"tension": 0
			}
		}
	},
	"scatter": {
		"hover": {
			"mode": "single"
		},
		"scales": {
			"xAxes": [
				{
					"id": "x-axis-1",
					"type": "linear",
					"position": "bottom"
				}
			],
			"yAxes": [
				{
					"id": "y-axis-1",
					"type": "linear",
					"position": "left"
				}
			]
		},
		"tooltips": {
			"callbacks": {}
		}
	},
	"scale": {
		"display": true,
		"position": "left",
		"offset": false,
		"gridLines": {
			"display": true,
			"color": "rgba(0,0,0,0.1)",
			"lineWidth": 1,
			"drawBorder": true,
			"drawOnChartArea": true,
			"drawTicks": true,
			"tickMarkLength": 5,
			"zeroLineWidth": 1,
			"zeroLineColor": "rgba(0,0,0,0.25)",
			"zeroLineBorderDash": [],
			"zeroLineBorderDashOffset": 0,
			"offsetGridLines": false,
			"borderDash": [],
			"borderDashOffset": 0
		},
		"scaleLabel": {
			"fontColor": "#333",
			"fontSize": 11,
			"fontStyle": "bold",
			"display": true,
			"labelString": "",
			"padding": {
				"top": 4,
				"bottom": 4
			}
		},
		"ticks": {
			"fontColor": "#333",
			"fontSize": 11,
			"beginAtZero": false,
			"minRotation": 0,
			"maxRotation": 50,
			"mirror": false,
			"padding": 4,
			"reverse": false,
			"display": true,
			"autoSkip": true,
			"autoSkipPadding": 0,
			"labelOffset": 0,
			"minor": {},
			"major": {}
		}
	}
};

var label_config = {
	"global": {
		"align": "center",
		"anchor": "center",
		// "backgroundColor": null,
		// "borderColor": null,
		"borderRadius": 0,
		"borderWidth": 0,
		"clamp": false,
		"clip": false,
		"display": false,
		"color": "#333",
		"font": {
			"size": 11,
			"lineHeight": 1.2,
			"weight": null
		},
		"listeners": {},
		"offset": 4,
		"opacity": 1,
		"padding": {
			"top": 4,
			"right": 4,
			"bottom": 4,
			"left": 4
		},
		"rotation": 0,
		"textAlign": "center",
		"textStrokeWidth": 0,
		"textShadowBlur": 0
	},

	"bar": {
		"anchor": "end",
		"align": "bottom"
	},
	"horizontalBar": {
		"anchor": "end",
		"align": "start"
	},
	"line": {
		"clip": false,
		"anchor": "center",
		"align": "center",
		"borderRadius": 4,
		"padding": {
			"top": 4,
			"right": 12,
			"bottom": 4,
			"left": 12
		},
	},
	"doughnut": {
		"anchor": "center",
		"align": "center"
	},
	"pie": {
		"anchor": "center",
		"align": "center"
	}
};

var chartjs_sizing = {
	"small": {
		"title": {
			"fontSize": 12,
			"padding": 6
		},
		"legend": {
			"boxWidth": 8,
			"padding": 8,
			"fontSize": 9
		},
		"scale": {
			"scaleLabel": {
				"fontSize": 9,
				"padding": { "top": 2, "bottom": 2 }
			},
			"ticks": {
				"fontSize": 9,
				"padding": 4
			}
		},
		"labels": {
			"font": {"size": 9, "lineHeight": 1.5},
			"padding": {"top": 2, "right": 6, "bottom": 2, "left": 6}
		}
	},
	"medium": {
		"title": {
			"fontSize": 14,
			"padding": 10
		},
		"legend": {
			"boxWidth": 10,
			"padding": 10,
			"fontSize": 11
		},
		"scale": {
			"scaleLabel": {
				"fontSize": 11,
				"padding": {"top": 4, "bottom": 4}
			},
			"ticks": {
				"fontSize": 11,
				"padding": 6
			}
		},
		"labels": {
			"font": {"size": 11},
			"padding": {"top": 4, "right": 12, "bottom": 4, "left": 12}
		}
	},
	"large": {
		"title": {
			"fontSize": 16,
			"padding": 12
		},
		"legend": {
			"boxWidth": 12,
			"padding": 12,
			"fontSize": 14
		},
		"scale": {
			"scaleLabel": {
				"fontSize": 14,
				"padding": {"top": 6, "bottom": 6}
			},
			"ticks": {
				"fontSize": 14,
				"padding": 8
			}
		},
		"labels": {
			"font": {"size": 13},
			"padding": {"top": 6, "right": 14, "bottom": 6, "left": 6}
		}
	}
};

export {chartjs_config, label_config, chartjs_sizing};