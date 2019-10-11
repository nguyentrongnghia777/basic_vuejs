import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// import common component global
import BootstrapVue from "bootstrap-vue";

import Editor from "@tinymce/tinymce-vue";
import Select2 from "v-select2-component";
import moment from "vue-moment";
import VueSweetalert2 from "vue-sweetalert2";
import DateTimePicker from "vue-bootstrap-datetimepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";
Vue.use(BootstrapVue);
Vue.use(moment);
Vue.use(VueSweetalert2);
Vue.component("dateTimePicker", DateTimePicker);
Vue.component("select2", Select2);
Vue.component("editor", Editor);

Vue.config.productionTip = false;
new Vue({ router, render: h => h(App) }).$mount("#app");
