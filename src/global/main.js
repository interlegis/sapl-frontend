import '@fortawesome/fontawesome-free/css/all.css'

import 'bootstrap'

import 'webpack-jquery-ui/dialog'
import 'webpack-jquery-ui/sortable'
import 'webpack-jquery-ui/datepicker'
import 'jquery-ui-themes/themes/cupertino/jquery-ui.min.css'

import 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/table'
import 'tinymce/plugins/code'
import 'tinymce/plugins/save'

// eslint-disable-next-line
require('imports-loader?window.jQuery=jquery!./js/jquery.runner.js')
import 'jquery-mask-plugin'

import './scss/app.scss'

import './js/image_cropping'
import './js/functions'

window.$ = $
window.jQuery = $

window.autorModal()
window.refreshMask()
window.refreshDatePicker()
window.initTextRichEditor('texto-rico')
