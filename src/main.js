import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

import "@fortawesome/fontawesome-free/css/all.min.css"

import 'jquery-ui-themes/themes/cupertino/jquery-ui.min.css'

import "./scss/app.scss";

import "bootstrap";

import 'webpack-jquery-ui/datepicker'
import 'jquery-ui/ui/i18n/datepicker-pt-BR'

import 'tinymce/tinymce'

import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/table'
import 'tinymce/plugins/code'
import 'tinymce/plugins/save'

import "./js/functions"

window.refreshDatePicker();
window.initTinymce("texto-rico");