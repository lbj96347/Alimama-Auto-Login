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

    alimama.userinfo( 'your_email' , 'your_password' );
    alimama.goodsurl('http://item.taobao.com/item.htm?spm=a1z10.1.w4004-4691356287.3.zn8QiS&id=36105974323'); 

    var convert_url = alimama.auto_convert(); 

    console.log( convert_url );


or you can do it like this 

    var alimama = require('alimama-auto-login');
    var Fiber = require('fibers');

    alimama.userinfo( 'your_email' , 'your_password' );
    //alimama.goodsurl('http://item.taobao.com/item.htm?spm=a1z10.1.w4004-4691356287.3.zn8QiS&id=36105974323'); 
    //var convert_url = alimama.auto_convert(); 
    //console.log( convert_url );

    var url1 = 'http://item.taobao.com/item.html?id=27562236207';
    var url2 = 'http://item.taobao.com/item.html?id=18691034267';
    var url3 = 'http://item.taobao.com/item.html?id=25085308362';

    Fiber(function (){
      alimama.auto_login();
      alimama.get_url(url1);
      alimama.get_url(url2);
      alimama.get_url(url3);
    }).run();

