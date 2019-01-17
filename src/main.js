
import "@fortawesome/fontawesome-free/css/all.min.css"

import 'jquery-ui-themes/themes/cupertino/jquery-ui.min.css'

import "./scss/app.scss";

import "bootstrap";


import 'webpack-jquery-ui/datepicker'
import 'jquery-ui/ui/i18n/datepicker-pt-BR'

window.refreshDatePicker = function() {
  $.datepicker.setDefaults($.datepicker.regional['pt-BR']);
  $('.dateinput').datepicker();
}

window.refreshDatePicker();