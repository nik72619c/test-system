
window.addEventListener("load",()=>{

var login=document.querySelector("#loginbtn");
login.setAttribute("onclick","doAjax(authenticateUser,'http://localhost:3000/login.json')");
var java=document.querySelector("#java");

java.setAttribute("onclick","doAjax(selectJava,'http://localhost:3000/javaquestions.json')");
var links=document.getElementsByClassName("page-link");
for(let i=1;i<links.length-1;i++){

  links[i].addEventListener("click",showDiv);
}

var submitbtn=document.querySelector("#submit");
submitbtn.setAttribute("onclick","showResult(userOperations.userAns)");

});
var timer=60;
var anscounter=0;
function setTimer(){

  setInterval(function (){

    if(timer!=0){
    timer--;
  document.getElementById("counter").innerHTML="TIME:-" +timer +"s";

    }


   
  },1000);
  // showResult(userOperations.userAns);
}
function authenticateUser(json){
  
  var aa=JSON.parse(json);
  var userid= document.querySelector("#exampleInputEmail1").value; 
  var pwd= document.querySelector("#exampleInputPassword1").value; 
  userOperations.userList=aa.login;
  console.log(userOperations.userList);

  var gg=aa.login.filter(element=>element.userid==userid && element.password==pwd);

  if(gg.length!=0){
 alert("hi"+ " "+ gg[0].userid);
  var div1=document.getElementsByClassName("login-screen");
div1[0].setAttribute("id","hide");
 var div2= document.getElementsByClassName("choose-test-screen");
 div2[0].setAttribute("id","show");
 div1[0].className="fade";
  }

  else{
    document.querySelector("#welcome").innerHTML="Invalid entry !";

  }

}
var ques;
var division;
var coverdiv;

function selectJava(json){

  userOperations.userAns=[];

  ques=[];
  division=[];

  setTimer();
  var div2= document.getElementsByClassName("choose-test-screen");
  div2[0].setAttribute("id","hide");
  var div3= document.getElementsByClassName("test-screen");
  div3[0].setAttribute("id","show");


var quesList=JSON.parse(json);
ques=quesList.java;
console.log(ques);

coverdiv=document.getElementsByClassName("test-screen")[0];
for(let i=0;i<3;i++){

  division[i]=createQuestion(ques);
  division[i].className+= " showit";
  console.log("gg is",division[i]);
  var maindiv=document.createElement("div");
  maindiv.className="tab-pane";
  maindiv.className+=" hideit";
  maindiv.setAttribute("id","ques"+(i+1));
  maindiv.setAttribute("role","tabpanel");
maindiv.appendChild(division[i]);

coverdiv.appendChild(maindiv);

}

showQuestion(ques);

var listitems=document.getElementsByTagName("li");  //new change

for(let i=0;i<listitems.length;i++){
 
  if(listitems[i].className!="page-item"){
listitems[i].addEventListener("click",markOption);
console.log(listitems[i]);

  }
}

}

var i=1;
function createQuestion(ques){

  var div=document.createElement("div");
  // document.getElementsByClassName("heading"+i)[0].innerHTML=ques[i-1].question;
var heading=document.createElement("h2");
heading.id="heading"+i;
heading.innerHTML=ques[i-1].question;
div.appendChild(heading);
  var ul=document.createElement("ul");
  ul.setAttribute("list-id",ques[i-1].questionid);
k=0;
for(let j=0;j<4;j++){

  var li=document.createElement("li");
 
  li.setAttribute("list-item-id",i);
  li.innerHTML=ques[i-1].options[k];
  k++;
  ul.appendChild(li);
  
}
div.appendChild(ul);
  i++;

  return div;
}
var links=[];
function showQuestion(ques){

links=document.getElementsByClassName("page-link");
console.log("",links.length);

for(let i=1;i<links.length-1;i++){

  links[i].href="#ques"+ques[i-1].questionid;
  links[i].setAttribute("linkid","ques"+ques[i-1].questionid);
  console.log(ques[i-1].questionid);
  console.log(links[i]);
  var id="ques"+ques[i-1].questionid;
  console.log(id);

}

}

function showDiv(event){

var link=event.srcElement;

var id=link.getAttribute("linkid");
var div=document.getElementById(id);
for(let i=1;i<links.length-1;i++){

 var divid=links[i].getAttribute("linkid");
 if(divid==id){

   var toshowdiv=document.getElementById(divid);
   toshowdiv.setAttribute("class","tab-pane showit");

 }

 else{

  var toshowdiv=document.getElementById(divid);
  toshowdiv.setAttribute("class","tab-pane hideit");


 }

}
}
var k;
var m=0;

function markOption(event){
var arr=[];
var listitems=document.getElementsByTagName("li");
var option=event.srcElement;
var text=option.innerHTML;
text=text.split(" ");
console.log("innerhtml is",text[0]);
console.log("option is",option);
// userOperations.userAns.push(text[0]);
// console.log("userans is",userOperations.userAns);
var id=option.getAttribute("list-item-id");
console.log("optionid is",id);

var k=0;
for(let i=0;i<listitems.length;i++){

  if(id==listitems[i].getAttribute("list-item-id")){

    arr[k]=listitems[i];
    k++;

  }
}
console.log("arr length is",arr.length);
console.log("arr is",arr);
for(let i=0;i<arr.length;i++){
console.log("condition value is",arr[i].innerHTML.split(" ")[0]);
console.log("text is",text[0]);
if(text[0]==arr[i].innerHTML.split(" ")[0]){ 
arr[i].classList.toggle("red");
userOperations.userAns.push(text[0]);
console.log("userans is",userOperations.userAns);


}

else{

  arr[i].className="";
  userOperations.userAns.push("none");
    console.log("userans is",userOperations.userAns);

}

}

if(text[0]==ques[id-1].opid[4]){

  console.log("correct ans");
  userOperations.userAns.push(text[0]);
console.log("userans is",userOperations.userAns);
  
}

else{
  console.log("incorrect");

}

}

function showResult(userAnswers){

  console.log("inside showResult function..");
  var tbody=document.querySelector("#result-table");
  console.log(tbody);
  
  for(let i=1;i<ques.length-1;i++){

    // var tr=tbody.insertRow();
    // tr.insertCell(0).innerHtml=i-1;
    // tr.insertCell(1).innerHTML=ques[i-1].opid[4];
    // tr.insertCell(2).innerHTML=userAnswers[i-1];
    if(userAnswers[i-1]==ques[i-1].opid[4]){

      // tr.insertCell(3).innerHTML="+1";
      anscounter++;
    }

    else{
      // tr.insertCell(3).innerHTML="+0";
    }
    
  }

  document.querySelector("#result").innerHTML=anscounter+" "+ "correct answers...";



}

