Alimama auto login 
==================

Login into Alimama automatically and get the taobaoke link

CommandLine USAGE
=====


    $ vi config.js
    
      email : test@test.com
      password : your password

    $ node app login 
    
    Begin auto login ...
    request token success ...
    login success
    获得的淘宝客链接是：...

    done.


USAGE
===

    var alimama = require('alimama-auto-login');

    alimama.example_url('http://item.taobao.com/item.htm?spm=a1z10.1.w4004-4691356287.3.zn8QiS&id=36105974323'); 

    alimama.userinfo( 'your_email' , 'your_password' );

    var convert_url = alimama.auto_convert(); 

    console.log( convert_url );
