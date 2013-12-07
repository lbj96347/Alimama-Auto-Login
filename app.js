var paramData, loginData , sendData , cookie = '' ; 
var $ = require('jquery');
var commandline = require('./command-line/main');
var urlcodejson = require('urlcode-json');
var request = require('superagent');
var md5 = require('MD5');
var Promise = require('node-promise').Promise;
var promise = new Promise();
var Fiber = require('fibers');
var USER = require('./config');

var example_url = 'http://item.taobao.com/item.html?id=17662161787';

var requestSetting = {
  "url" : "https://www.alimama.com/member/minilogin_act.htm" ,
  "header" : {
    'userAgent' : 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36' ,
    'Referer' : 'http://www.alimama.com/member/minilogin.htm' 
  } 
}

loginData = {
  'logname' :  USER.info.email ,
  'originallogpasswd' : USER.info.password,
  'logpasswd' : md5(USER.info.password) ,
  'proxy' : '' ,
  'redirect' : '' ,
  '_tb_token_' : '' , 
  'style' : '' 
}


var loginAlimama = function ( paramData ){
  var fiber = Fiber.current;
  var cookies = paramData.cookies;
  loginData['_tb_token_'] = paramData.token;
  sendData = loginData;
  //sendData ,cookies
  if (cookies) {
    _ref = cookies;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      rs = _ref[_i];
      cookie += rs.replace(/Path=\/;HttpOnly/g, '').replace(/Path=\//g,'');
    }
  }
  request
    .post('https://www.alimama.com/member/minilogin_act.htm')
    .set('User-Agent:',requestSetting.header.userAgent )
    .set('Referer:', requestSetting.header.referer )
    .set('Access-Control-Allow-Origin',true)
    .set('Access-Control-Allow-Credentials',true)
    .set('Cookie', cookie )
    .type('form')
    .send( sendData )
    .redirects(0)
    .end( function ( error , res ){
      if( error ){
        console.log('login alimama error :' , error );
      };
      console.log( 'login success' );
      fiber.run();
      return true;
    });
  Fiber.yield();
};

var requestToken = function (){
  var fiber = Fiber.current;
  request
    .get('http://www.alimama.com/member/minilogin.htm')
    .end( function ( error , res ){
      var cookies = res.header['set-cookie'];
      var token = $(res.text).find('input').toArray()[0].getAttribute('value'); 
      var data = {
        "token": token ,
        "cookies" : cookies ,
      };
      console.log('request token success : ' , data );
      paramData = data;
      fiber.run();
      return data;
    });
  Fiber.yield();
};



/*
 * GET TaobaoKe URL 
 * Example
 * Author : CashLee
 * Example URL is : 'http://item.taobao.com/item.htm?spm=a1z10.1.w4004-4691356287.3.zn8QiS&id=36105974323';
 *
 */

var getUrl = function (example_url){
  var fiber = Fiber.current;
  var urlData = urlcodejson.decode( example_url.split('?')[1] , false );
  var item_id = urlData.id;
  request
    .get('http://u.alimama.com/union/spread/common/allCode.htm?specialType=item&auction_id=' + item_id )
    .set('User-Agent:',requestSetting.header.userAgent )
    .set('Referer:', requestSetting.header.referer )
    .set('Access-Control-Allow-Origin',true)
    .set('Access-Control-Allow-Credentials',true)
    .set('Cookie', cookie )
    .end( function ( error , res ){
      //console.log( 'final page content with url is : ' , res.text );
      var pattern = 'var clickUrl = \'([^\']+)';
      var results = res.text.match( pattern );
      try {
        var taobaoke = results[1];
        exports.taobaokeurl = results[1];
        console.log( '获得的淘宝客链接是： ' , results[1] );
        fiber.run();
        return results[1];
      }catch(err){
        console.log('javascript error ' ,  err );
        return results;
      }
    });
  Fiber.yield();
};

exports.goodsurl = function (url_string){
  example_url = url_string; 
}

exports.userinfo = function ( username , password ){
  loginData['logname'] = username; 
  loginData['originallogpasswd'] = password;
  loginData['logpasswd'] = md5(password); 
}


/*
 *
 * Author : CashLee
 * api : requestToken 
 * @param : none
 * callback : data = {
 *  token : xxxx ,
 *  cookies : xxx
 * }
 *
 */

exports.request_token = function (){
  requestToken();
}

/*
 *
 * Author : CashLee
 * api : loginAlimama()
 * @param : paramData = {
 *  token : xxxx ,
 *  cookies : xxx
 * }
 * callback : true or false 
 *
 */

exports.login_alimama = function (paramData){
  loginAlimama(paramData)
}

/*
 *
 * Author : CashLee
 * api : getUrl 
 * @param : none
 * callback : https://.../
 * 
 */

exports.get_url = function (example_url){
  getUrl(example_url);
}


/*
 *
 * Author : CashLee
 * api : auto login example 
 * @param : none 
 * callback : https://.../
 *
 */

exports.auto_convert = function (){
  Fiber(function (){
    requestToken();
    loginAlimama( paramData );
    getUrl(example_url);
  }).run();
}

exports.auto_login = function (){
  var auto_fiber = Fiber.current;
  Fiber(function (){
    requestToken();
    loginAlimama( paramData );
    auto_fiber.run();
  }).run();
  Fiber.yield();
}

commandline.init();
