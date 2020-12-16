function setCookie(cname,value){
  var days=3*24*60*60*1000;
  var d = new Date();
  d.setTime(d.getTime()+days);
  var expires="expires="+d.toUTCString();
  document.cookie=cname+"="+value+"; "+expires;
  

}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var x = getCookie("hero");
if(x){
  document.getElementById(x).src="static/images/"+"hero"+x.trim()+".jpg";
}