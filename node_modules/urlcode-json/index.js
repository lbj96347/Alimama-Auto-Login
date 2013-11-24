exports.encode = function ( data , encodeornot ){
  if ( typeof( data ) == 'object' ) {
    var out = new Array();
    for (key in data) {
      out.push(key + '=' + encodeURIComponent( data[key] ) );
    }
    var finalStr = out.join('&');
    return ( finalStr )  
  } else {
    console.warn('error occur');
  }
};

exports.decode = function ( data , decodeornot ){
  if( typeof(data) == 'string' ){
    var objArr = data.split('&');
    var newobj = {};
    for( var i in objArr ){
      var key = objArr[i].split('=')[0];
      var value = ( decodeornot ? decodeURIComponent( objArr[i].split('=')[1] ) : objArr[i].split('=')[1] );
      newobj[key] = value;
    }
    return newobj;
  }else{
    console.warn('error occur');
  }
}
