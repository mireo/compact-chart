# Compact Chart

**Visualize your data under a minute, in any Javascript framework**

## Table of Contents

- [About](#about)
- [How to use it](#how-to-use-it)
- [Examples](#examples)
    - [Demo](#demo)
    - [Plain HTML Example with data fixture](#plain-HTML-Example-with-data-fixture)
    - [Integration with Vue.js](#integration-with-Vue.js)
    - [Other frameworks](#other-frameworks)
- [Configuration format structure](#configuration-format-structure)
    - [Dataset structure](#dataset-structure)
    - [Chart configuration options](#chart-configuration-options)
- [How it is made?](#how-it-is-made)
- [Browser compatibility](#browser-compatibility)
- [Building from source](#building-from-source)
- [Credits](#credits)
- [Licence](#licence)

## About

`compact-chart` is an easy-to-use charting library designed for extremely quick and easy visualization of your analytics. Developed as a [HTML Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements), it's fully encapsulated and works across all modern browsers, regardless of the chosen JavaScript framework.

On top of that, for convenience reasons, `compact-chart` accepts both fixture and Promise as a data source.
Combined with well-defined preset designs and features, `compact-chart` is an excellent solution for anyone in need of a quick, effortless, and cross-framework charting library.

## How to use it

The easiest option is to download the latest release and include it in your app. Alternatively, check out the [building from source](#building-from-source) section.

### Demo
You may find lot of step-by-step examples [here](https://mireo.github.io/compact-chart/).

### HTML
Download the latest release link directly from [unpkg](https://www.unpkg.com/compact-chart):

```
<script src="./compact-chart.umd.min.js"></script>
<link rel="stylesheet" href="./compact-chart.css">
```

This will register the `compact-chart` custom element. `compact-chart` is now ready to be used in your HTML and controlled with JavaScript, just like one would do with a built-in HTML tag such as `<button>`:
```
<compact-chart></compact-chart>
```
Finally, set configuration format with chart data to draw:
```
document.querySelector("compact-chart").format = { ... };
```
Refer to [Examples](#examples) section for integration source codes.

## Examples

### Plain HTML Example with data fixture
```
<!DOCTYPE html>
<html>
<head>
    <title>Compact Chart Plain HTML Example</title>

    <!-- Import compact-chart custom component and the corresponding CSS -->
    <script src="./compact-chart.umd.min.js"></script>
    <link rel="stylesheet" href="./compact-chart.css">

    <style type="text/css">
        compact-chart {
            display: block;
            width: 400px;
            height: 400px;
        }
    </style>
</head>

<body>
        <!-- Use Web Components in your HTML like regular built-in elements. -->
    <compact-chart></compact-chart>

    <script>
        <!-- Set configuration format dynamically -->
        document.querySelector("compact-chart").format = {
            type: "bar-chart",
            category_axis_column: 0,
            data: {
            "cols": [
                {"name": "x-val"},
                {"name": "y-val"}
            ],
            "data": [
                [1, 1.6],
                [2, 2.2],
                [3, 2.7],
                [4, 3.2],
                [5, 3.5]
            ]
            }
        };
    </script>
</body>
</html>
```
**Note**: Custom Elements are `display: inline` by default. Unless you prefer such behavior, make sure you set the appropriate `display` value.

### Integration with Vue.js

#### Vue.js - within a global component
```
<!DOCTYPE html>
<html>
<head>
    <title>Compact Chart VueJS Global Component Example</title>
    <script src="https://unpkg.com/vue"></script>

    <!-- Import compact-chart Web Component and CSS -->
    <script src="./compact-chart.umd.min.js"></script>
    <link rel="stylesheet" href="./compact-chart.css">

    <style type="text/css">
        compact-chart {
            display: block;
            width: 400px;
            height: 400px;
        }
    </style>
</head>

<body>

    <div id='app'>
        <!-- Use Web Components in like regular built-in elements or components -->
        <compact-chart ref="sample-chart"></compact-chart>
    </div>

    <script>
        var app = new Vue({
            el: '#app',
            data: {},
            mounted() {
                // set configuration format dynamically

                this.$refs["sample-chart"].format = {
                    type: "bar-chart",
                    category_axis_column: 0,
                    data: {
                        "cols": [
                            {"name": "x-val"}, {"name": "y-val"}
                        ],
                        "data": [
                            [1, 1.6],
                            [2, 2.2],
                            [3, 2.7],
                            [4, 3.2],
                            [5, 3.5]
                            ]
                        }
                };
            }
        });
    </script>
</body>
</html>
```
#### Vue.js - within a [single-file component](https://vuejs.org/v2/guide/single-file-components.html):
```
<template>
    <div>
        <!-- Use Web Components in like regular built-in elements or components -->
        <compact-chart ref="sample-chart"></compact-chart>
    </div>
</template>

<script>

// import compact-chart Web Component and CSS
import CompactChart from "./compact-chart.umd.min.js";
import "./compact-chart.css";

export default {
    mounted() {
        // set configuration format dynamically
        this.$refs["sample-chart"].format = {...}
    }
}
</script>
```

### Other frameworks
For other frameworks, please refer to official guidelines for including Custom Elements.

## Configuration format structure

```
{
    "data": fixture data or Promise object
    "type": one of the built-in chart types (string)
    "category_axis_column": dataset column name or index used to denote the category axis values

    // ...chart specific options
}
```
- **Note**: all listed options (`data`, `type` and `category_axis_column`) are **mandatory**.

- `type`: one of the supported chart types

    For supported chart types, refer to [Supported chart types](#supported-chart-types) section.

- `data`: fixture data object or a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object

    Data is provided as a matrix-like (multidimensional) array of elements, each matrix column representing one visualization dataset. Data structure is described in [Dataset Configuration](#dataset-configuration) chapter.


- `category_axis_column`: dataset column name or index of category value

     `compact-chart` enforces explicitly declaring which column should be used on a category axis - either by setting a dataset column index or a name.

    For Cartesian charts, the category axis column represents the values on the x-axis (abscissa). The only exception is a horizontal bar chart, in which the category axis column represents the values on the y-axis (ordinate).

    For pie, doughnut, and gauge charts, the category axis column represents the label values.

- for all other chart configuration options, refer to [Chart confgiguration structure](chart-confgiguration-structure) section

#### Minimal configuration sample:
```
{
    "type": "bar-chart",
    "category_axis_column": 0,
    "data": {
        "cols": [
            {"name": "x-val"}, {"name": "y-val"}
        ],
        "data":
            [[1, 10],
            [2, 20]]
        }
    };
}
```

### Dataset Structure

The expected `data` object should contain two properties - `cols` and `data`:
- `data` - A matrix-like (multidimensional) array of elements, each matrix column representing one dataset you wish to display
- `cols` - Array of objects representing names of corresponding matrix columns, structured as `{name: "dataset name"}`
```
 {
    "cols": [
        {"name": "x-val"},
        {"name": "y0-val"},
        {"name": "y1-val"}
    ],
    "data": [
        [1, 1, 6],
        [2, 2, 2],
        [3, 2, 7],
        [4, 3, 2],
        [5, 3, 5]
    ]
}
```

#### Pass data as a Promise
The `data` object can either be declared as a fixture or provided as a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object.


```
fetch('./resources/data.json').then(rv => rv.json())
```

```
document.querySelector("compact-chart").format = {
    type: "bar-chart",
    category_axis_column: 0,
    data: fetch('./resources/data.json').then(rv => rv.json())
};
```

**Note:** Depending on your data source, you might need to preprocess the data to conform to the expected data structure.
To do so, simply attach `then` handler to your Promise `data` object:
```
fetch('./resources/data.json').then(rv => rv.json()).then(rv => my_preprocess_fn(rv))
```


### Chart configuration options
`compact-chart` HTML custom element is built as a wrapper around [Chart.js](https://github.com/chartjs/Chart.js/tree/2.9) library.

For convenience and ease of use, it supports a subset of Chart.js available chart types and configuration options. Unlike the extensive set of Chart.js configuration options, the `compact-chart` configuration is maximally simplified.
`compact-chart` merges the options object passed to the chart with the global configuration. For global, as well as defaults for each chart type, refer to the source code.

We recommend you use (and adjust) Chart.js or any other charting library for all more complex visualizations and interactivity.

| Name  | Type  | Default   | Description   | Applicable to chart types     |
|-  |-  |-  |-  |-  |
| [type](#supported-chart-types)    | string    | **mandatory**     | chart type    | all   |
| [color_palette](#color-palette)   | string    | "default"     | chart color palette   | all   |
| [locale](#localization)   | string    | "en"  | Unicode BCP 47 locale identifier used for formatting numbers on axes,   labels and tooltips.  | all   |
| [number_symbols](#big-and-small-number-formatting)    | Array     | []    | Prefixes      | all   |
| [size](#font-sizing)  | string    | "medium"  | defines chart font sizing     | all   |
| [title.label](#title-configuration)   | string    | ""    | chart title   | all   |
| [title.placement](#title-configuration)   | string    | "top"     | placement of the chart title  | all   |
| [legend.show](#legend-configuration)  | bool  | true      | show or hide the chart legend     | all   |
| [legend.placement](#legend-configuration)     | string    | "top-end"     | placement of the chart legend     | all   |
| [labels.show](#labels)    | bool  | false     | show or hide the labels   | all   |
| [labels.label](#labels)   | string    | "value"   | which data values to show     | all   |
| [labels.placement](#labels)   | string    | varies for chart types    | placement of the labels   | all   |
| [axis.type](#cartesian-axes)  | string    | varies for chart types    | type of axis data     | bar, line     |
| [axis.label](#cartesian-axes)     | string    | ""    | axis title    | bar, line     |
| [axis.tick_orientation](#cartesian-axes)  | null, number  | null  | angle of the horizontal axis label    | bar, line     |
| [axis.range](#cartesian-axes)     | null, string, array   | null  | minimal and maximal rendered data values range    | bar, line     |
| [percentage_values](#show-values-as-percentages)  | bool  | false     | display specific values as percentages    | bar   |
| [stacked](#stacked-data)  | bool  | false     | stack bar or line charts  | bar, line     |
| [hole_size](#doughnut-pie-and-gauge-charts)   | number    | 0.5   | hole size ratio for doughnut and gauge charts     | doughnut, gauge   |
| [angle](#doughnut-pie-and-gauge-charts)   | number    | 180   | central angle of circular sector for gauge charts     | gauge     |

#### Supported chart types

`compact-chart` supports the following chart types:
* line and area
* horizontal and vertical bar
* doughnut and pie

Possible values for `type` option are:
- `"bar-chart"` - vertical bar chart
- `"horizontal-bar-chart"` - horizontal bar chart
- `"line-chart"` - line chart, plotting data points on a line
- `"area-chart"` - filled line chart
- `"pie-chart"` - pie chart
- `"doughnut-chart"` - doughnut chart
- `"gauge-chart"` - gauge chart

**Note** that the `type` is a mandatory option - there is no default value set.

#### Color palette
- `color_palette` defaults to `high-contrasting-1`.

`compact-chart` comes with several pre-made color palettes you can use for your charts.

Available palettes are:
- **grayscale**

    ![grayscale](img/grayscale.png "grayscale")
- **high-contrasting-1**

    ![high-contrasting-1](img/high-contrasting-1.png "high-contrasting-1")
- **high-contrasting-2**

    ![high-contrasting-2](img/high-contrasting-2.png "high-contrasting-2")

- **mid-contrasting**

    ![mid-contrasting](img/mid-contrasting.png "mid-contrasting")

- **pastele-1**

    ![pastele-1](img/pastele-1.png "pastele-1")

- **pastele-2**

    ![pastele-2](img/pastele-2.png "pastele-2")

**Alternatively**, you can define a custom one by setting the property to an array of colors. When supplying colors to chart options, you can use several formats. You can specify the color as a string in hexadecimal, RGB, or HSL notations.

```
color_palette: ["orange", "red", "pink", "green"]
```
or specifically:
```
{
    type: "pie-chart",
    color_palette: ["orange", "red", "pink", "green"],
    category_axis_column: 0,
    data: {
        "cols": [ {"name": "expr$0"}, {"name": "expr$1"} ],
        "data": [ ["A", 1], ["B", 2], ["C", 3], ["D", 3] ]
        }
}
```
#### Localization

`compact-chart` uses the [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) for language-sensitive formatting numbers on axes, labels, and tooltips.

The `locale` option is defined as a string that is [Unicode BCP 47 locale identifier](https://www.unicode.org/reports/tr35/tr35.html#BCP_47_Conformance).

- `locale` defaults to `"en"`

#### Big and small number formatting

Extremely big and small numbers are difficult to read and take up a lot of space on axes. Numbers in `compact-chart` are automatically prefixed according to [BIPM](https://www.bipm.org/en/publications/si-brochure/chapter3) specification - as multiples and submultiples of SI units, but ranging from 10<sup>-9</sup> - 10<sup>–3</sup> and 10<sup>3</sup> - 10<sup>24</sup>.
Inbetween range is not prefixed.
Omitted small and big number prefixes will be formatted as the largest denominator.

- `number_symbols` default value:

```
[
    {v: 1e-9, s: "n"},
    {v: 1e-6, s: "μ"},
    {v: 1e-3, s: "m"},
    {v: 0},
    {v: 1e3 , s: "k"},
    {v: 1e6 , s: "M"},
    {v: 1e9 , s: "G"},
    {v: 1e12, s: "T"},
    {v: 1e15, s: "P"},
    {v: 1e18, s: "E"},
    {v: 1e21, s: "Z"},
    {v: 1e24, s: "Y"}
]
```

**Modifying suffixes**

In case scientific suffixes don't fit the dataset, you can define a custom set:

- example: disable big and small number prefixes
```
"number_symbols": []
```

- example: custom monetary prefixes
```
"number_symbols": [
    { "number": 1e+3, "suffix": "K" },
    { "number": 1e+6, "suffix": "M" },
    { "number": 1e+9, "suffix": "B" }
]

```

#### Font sizing

`compact-chart` comes with three pre-made font sizings you can use for your charts.

Possible values are:

 - `"small"`
 - `"medium"`
 - `"large"`

- defaults to `"medium"`

#### Title configuration

`title` object is defined with the following options:
```
{
    "label": "",
    "placement": "top"
}
```
- `title.label`- sets title text to display; if ommited, or set to empty string, the title will not be drawn
    - defaults to `""`
- `title.placement`- defines the placement of the chart title
    - possible values are:
        - `"top"` - top center
        - `"left"` - left vertical
        - `"bottom"` - bottom center
        - `"right"` - right vertical
    - defaults to `"top"`

#### Legend configuration

`legend` object is defined with the following options:
```
{
    "show": true,
    "placement": "top-end"
}
```
- `legend.show` - option to show or hide the chart legend
    - defaults to `false`
- `legend.placement`- defines the placement of the chart legend as a combination of position and alignment values
    - possible values for `position` are:
        - `"top"`
        - `"left"`
        - `"bottom"`
        - `"right"`

    - possible values for `alignment` are:
        - `"center"`
        - `"start"`
        - `"end"`
    - defaults to: `"top-end"`

#### Labels

Since [Chart.js](http://www.chartjs.org/) doesn't come with the support for displaying labels, [chartjs-plugin-datalabels](https://chartjs-plugin-datalabels.netlify.app/) plugin is used.

**Note**: Chart labels are disabled by default.

`labels` object is defined with the following options:

```
{
    "show": false,
    "label": "value",
    "placement": "anchor-align"
}
```
- label font color is automatically set to black or white, depending on the chart color palette
- `labels.show` - option to show or hide the labels on the chart
    - defaults to `false`
- `labels.label` - which data values to show
    - possible values are
        - `"label"` - show category values
        - `"value"` - show metric values
        - `"percentage"` - show metric values as percentages
            - can be used only if the percent calculation option is enabled `percentage_values: true` [<>](#show-values-as-percentages)
        - `"value-percentage"` - show both absolute metric values and percentages
            - can be used only if the percent calculation option is enabled `percentage_values: true` [<>](#show-values-as-percentages)
    - defaults to: `"value"`
- `labels.placement` - defines the placement of the labels as a combination of **anchor** and **alignment values**:

    - An **anchor point** is defined by an orientation vector and a position on the data element. The orientation depends on the scale type (vertical, horizontal or radial). The position is calculated based on the anchor option and the orientation vector. In-depth explaination of these values is available [here](https://chartjs-plugin-datalabels.netlify.app/guide/positioning.html).

        Possible values for `anchor` are:
        - `"center"`
        - `"start"`
        - `"end"`

    - The **align** option defines the label's position relative to the anchor point position and orientation. In-depth explanation of these values is available [here](https://chartjs-plugin-datalabels.netlify.app/guide/positioning.html#alignment-and-offset).

        Possible values for `alignment` are:
        - `"center"`
        - `"start"`
        - `"end"`
        - `"right"`
        - `"bottom"`
        - `"left"`
        - `"top"`
    - defaults to:
        - vertical bar charts: `"end-bottom"`
        - horizontal bar charts: `"end-start"`
        - line and area charts: `"center-center"`
        - pie, doughnut and gauge charts: `"center-center"`


#### Cartesian axes
- applies to **bar** and **line** charts only
- only one value per axis is supported

`axis` object is defined with the following options:

```
{
    type: "category",
    label: "",
    tick_orientation: null,
    range: null
}
```

- `axis.type`:
    - Possible values are:
        - `"linear"`
        - `"category"`
        - `"logarithmic"`
    - defaults to:
        - `" category" ` for the x-axis of vertical bar charts and line charts, and y-axis of horizontal bar charts
        - `" linear" ` for the y-axis of vertical bar charts and line charts, and the x-axis of horizontal bar charts
- `axis.label`: defines the title for the axis
    - defaults to empty string `"" `
- `axis.tick_orientation`: defines the angle of the horizontal axis label
    - only applicable to horizontal scales
    - Possible values are:
        - `null`: (default) automatic mode, in which the chart decides on the optimal label angle, so the ticks don't overlap or be too crowded
        -  a number between 0 and 90 decimal degrees, representing the angle of the horizontal axis labels
    - defaults to automatic mode, in which the chart decides on the optimal label angle, so the ticks don't overlap or be too crowded
- `axis.range`: customizes the minimal and maximal rendered data values
    - defaults to automatic mode, in which the chart decides on the optimal rendered data values range for the dataset
    - Possible values are:
        - `null`: automatically determine optimal dataset values range
        - `" auto-0" `: defines a  half-opened range; the axis will include 0 value if it is not already included
        - `[min value, max value]`: values override the minimum and maximum values from a dataset


#### Show values as percentages

By default, absolute values will be used on axes. However, setting the `percentage_values` option to `true` enables displaying specific values as percentages.

Applicable to **bar charts only**.
- defaults to: `false`

#### Stacked data

Bar and line charts can be configured as stacked ones by setting the `stacked` option to `true`.

Applicable to **bar** and **line** charts only.
- defaults to: `false`

#### Doughnut Pie and Gauge charts

Doughnut and Gauge charts are effectively the pie chart with a hole in the center.

Gauge charts are basically circular sectors of doughnut charts, with a central angle less than 360°.

Available options for styling doughnut, pie, and gauge charts are:
- `hole_size`

    A number between 0 and 1, corresponding to the ratio of radii between the hole and the chart. Values equal to or greater than 1 will be ignored, and a value of 0 will completely shut your piehole.
    - defualts to
        - 0.5 for doughnut and gauge
        - 0 for pie charts

- `angle`

    A number between 0 and 360, corresponding to the central angle of the circular sector in decimal degrees.

    - defaults to:
        - 180 degrees for gauge
        - 360 degrees for doughnut and pie charts

## How it is made
`compact-chart` is an easy-to-use charting HTML Custom Element, built on top of [Chart.js](https://github.com/chartjs/Chart.js/tree/2.9).

Instead of an extensive set Chart.js configuration options, `compact-chart` supports only a maximally simplified subset of Chart.js types and configuration options.

It's built with:
* [Chart.js](https://github.com/chartjs/Chart.js/tree/2.9) - Simple yet flexible JavaScript charting for designers & developers
* [chartjs-plugin-datalabels](https://chartjs-plugin-datalabels.netlify.app/guide/) - Highly customizable Chart.js plugin for displaying labels on data for any type of charts
* [Vue custom element](https://github.com/karol-f/vue-custom-element) - A tiny wrapper around Vue components

## Browser compatibility
In general:

- Custom elements are supported by default in Firefox, Chrome, and Edge (76). Opera and Safari so far support only autonomous custom elements.
- Promise is supported in Firefox (starting from 29), Chrome (32), Opera (19) and Safari (9). For a full list, refer to [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Browser_compatibility).

## Building from source
A step by step series of examples that tell you how to get a development environment running:

```
# Clone existing repository
git clone https://github.com/mireo/compact-charts.git

# Install Node.js https://nodejs.org/en/download/

# install vue-cli-service globally
npm install -g @vue/cli-service@4.2.3

# install dependencies
npm install

# start dev server with hot reload at localhost:4200
npm run serve

# build for production
# produces a production-ready bundle in the dist/ directory, with minification for JS/CSS/HTML and auto vendor chunk splitting for better caching
npm run build

```
The library build will output:
- `dist/compact-chart.common.js` - a [CommonJS](https://en.wikipedia.org/wiki/CommonJS) bundle for consuming via bundlers
- `dist/compact-chart.umd.js`: a [UMD](https://github.com/umdjs/umd#umd-universal-module-definition) bundle for consuming directly in browsers or with AMD loaders
- `dist/compact-chart.umd.min.js`: minified version of the UMD build
- `dist/compact-chart.css`: extracted CSS file


**Note on Vue Dependancy**

The resulting bundle will also bundle Vue. If you wish to exclude Vue, exclude the `--inline-vue` flag from the build command.

## Credits
Maintained and sponsored by [Mireo d.d.](#http://mireo.hr/)

Founded in 2001, Mireo is a pioneer in developing award-winning GPS navigation and software solutions for vehicle tracking and fleet management. We have redefined the limits of speed and capabilities in analyzing spatiotemporal data. We've drawn the most detailed road map of Croatia. Enthusiasts always coming up with revolutionary ideas on how to implement cutting edge technologies – that's who we are.

[<img height="90" alt="Mireo" src="https://www.mireo.hr/img/assets/mireo-logo.svg">](https://www.mireo.hr/)


## Licence
