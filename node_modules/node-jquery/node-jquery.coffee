(->
window = require("jsdom").jsdom().createWindow()
$ = require("jquery").create(window)

XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
$.support.cors = true
$.ajaxSettings.xhr = -> new XMLHttpRequest

global.window = window
global.jQuery = $
global.$ = $
)()
