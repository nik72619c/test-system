

function doAjax(fn,url){
  
var xml= new XMLHttpRequest();
xml.open("GET",url);

xml.onreadystatechange=function (){


if(xml.status==200 && xml.readyState==4){
fn(xml.responseText);
    
}

}

xml.send(null);


}



