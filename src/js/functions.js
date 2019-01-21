import skinTinymce from "tinymce-light-skin";
import $ from "jquery";

window.removeTinymce = function () {
  while (window.tinymce.editors.length > 0) {
    window.tinymce.remove(window.tinymce.editors[0])
  }
}

window.initTextRichEditor = function (elements, readonly = false) {
  window.removeTinymce()
  let configTinymce = {
    'force_br_newlines': false,
    'force_p_newlines': false,
    'forced_root_block': '',
    'content_style': skinTinymce.contentStyle,
    'skin': false,
    'plugins': ['table save code'],
    'menubar': "edit format table tools",
    toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
    'tools': 'inserttable'
  }

  if (readonly) {
    configTinymce.readonly = 1
    configTinymce.menubar = false
    configTinymce.toolbar = false
  }

  if (elements != null) {
    configTinymce['elements'] = elements
    configTinymce['mode'] = 'exact'
  } else {
    configTinymce['mode'] = 'textareas'
  }
  skinTinymce.use()
  window.tinymce.init(configTinymce)
}


window.refreshDatePicker = function() {
  $.datepicker.setDefaults($.datepicker.regional['pt-BR']);
  $('.dateinput').datepicker();
}
