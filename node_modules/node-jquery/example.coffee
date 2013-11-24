###
Example: retrieving all links of yahoo.com
  $ npm up
  $ node_modules/.bin/coffee example.coffee
###
require "./node-jquery"
$.ajax
  url: 'http://www.yahoo.com'
  success: (res)->
    for e in $(res).find("a")
      e = $(e)
      console.log "[#{e.text()}](#{e.attr("href")})"
