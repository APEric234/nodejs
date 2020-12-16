function setCookie(cname,value){
  var days=3*24*60*60*1000;
  var d = new Date();
  d.setTime(d.getTime()+days);
  var expires="expires="+d.toUTCString();
  document.cookie=cname+"="+value+"; "+expires;
  document.getElementById(cname).src="static/images/"+"hero"+value.trim()+".jpg";

}