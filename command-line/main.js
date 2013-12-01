/*
 * build alimama-auto-login command-line interface
 * author: Cash Lee
 * date: 2013/11/23
 */

var program = require('commander');
var md5 = require('MD5');
var usermsg = require('../config');
var app = require('../app');

program
  .version('0.1.0')

// must be before .parse() since
// node's emit() is immediate

program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ node app login');
  console.log('    >> before this you need to input your username and password in config.js');
  console.log('');
});

program.on('login',function (){
  console.log('Begin auto login ... ');
  if( usermsg.info.email == '' || usermsg.info.password == '' ){
    console.log('Please input your email or password!!');
    return false;
  }else{
    app.auto_convert();
  }
});


exports.init = function (){

  program.parse(process.argv)

}

