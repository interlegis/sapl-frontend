// app - global
// é uma app fundamental para o layout do sapl tradicional.
// é importada pelo backend em seus templates

import '@fortawesome/fontawesome-free/css/all.css'

import 'bootstrap'

import 'webpack-jquery-ui/dialog'
import 'webpack-jquery-ui/sortable'
import 'webpack-jquery-ui/datepicker'
import 'jquery-ui/ui/i18n/datepicker-pt-BR'

import 'jquery-ui-themes/themes/cupertino/jquery-ui.min.css'

import 'tinymce/tinymce'
import './js/tinymce/lang/pt_BR.js'

import 'tinymce/themes/modern'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/code'

import 'jquery-mask-plugin'
import 'bootstrap-multiselect'

import './scss/app.scss'

import './js/image_cropping'
import './js/functions'

// eslint-disable-next-line
require('imports-loader?window.jQuery=jquery!./js/jquery.runner.js')

window.$ = $
window.jQuery = $

window.autorModal()
window.refreshMask()
window.refreshDatePicker()
window.initTextRichEditor('texto-rico')
