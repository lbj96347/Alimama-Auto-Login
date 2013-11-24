/*
 * build alimama-auto-login command-line interface
 * author: Cash Lee
 * date: 2013/11/23
 */

var program = require('commander');
var md5 = require('MD5');

program
  .command('name <cmd>')
  .description('This is the name you type')
  .action(function (cmd){
    console.log( 'name string is ' ,  cmd );

    /*
    var loginData = {
      'logname' : '' ,
      'originallogpasswd' : '',
      'logpasswd' : '' ,
      'proxy' : '' ,
      'redirect' : '' ,
      'style' : '' 
    }
    */

    var loginData = {
      'name' : 'cashlee' ,
      'lang-1' : 'cantonese' ,  
      'lang-2' : '广东话'
    };

    var out = new Array();
    for(key in loginData) {
      out.push(key + '=' + loginData[key]);
    }
    console.log( 'this is out ' , encodeURIComponent( out.join('&') ) );
    console.log('This is the string what you type "%s"', cmd );
  });


program
  .version('0.1.0')
  .option('-f, --foo', 'enable some foo')
  .option('-b, --bar', 'enable some bar')
  .option('-B, --baz', 'enable some baz');

// must be before .parse() since
// node's emit() is immediate

program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ custom-help --help');
  console.log('    $ custom-help -h');
  console.log('');
});

exports.init = function (){

  program.parse(process.argv)

}

