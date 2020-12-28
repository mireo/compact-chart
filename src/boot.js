import Vue from 'vue';
import vueCustomElement from 'vue-custom-element';

// For cross-browser compatibility (IE9+) use Custom Elements polyfill.
// import 'document-register-element/build/document-register-element'

// Custom elements are NOT display: block by default https://github.com/w3c/webcomponents/issues/224

import chart from './compact-chart.vue';
Vue.use(vueCustomElement);
Vue.customElement('compact-chart', chart);
