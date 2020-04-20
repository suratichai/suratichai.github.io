document.addEventListener('DOMContentLoaded',init);

var input = '';
var price = 0;
var water = 0;
var i = 0;
var accept = 0;
var mode = 0;

function init()
{
  var top = document.getElementById("header").offsetTop;
  window.scrollTo(top, 0);
  document.getElementById("MilkTea").disabled = false;
  document.getElementById("GreenTea").disabled = false;
  document.getElementById("cancel1").disabled = false;
  document.getElementById("baht").disabled = false;
  document.getElementById("next").disabled = false;
  document.getElementById("testingmode").disabled = false;
  
  //default in vending mode
  mode = 0;
  document.getElementById("inputtest").style.display = "none";
  document.getElementById("testingmode").style.backgroundColor = "white";
    document.getElementById("vendingmode").style.backgroundColor = "#97d4d7";

  showdata();
}

function gotoSugar(drink) {
  input += drink;
  if (drink === '0')
  {
    water = 1;
  }
  else if (drink === '1')
  {
    water = 2;
  }

  document.getElementById("MilkTea").disabled = true;
  document.getElementById("GreenTea").disabled = true;
  document.getElementById("cancel1").disabled = true;

  document.getElementById("100").disabled = false;
  document.getElementById("50").disabled = false;
  document.getElementById("cancel2").disabled = false;

  var top = document.getElementById('sugar').offsetTop;
  window.scrollTo(0, top);
  showdata();
}


function gotoBubble(sugar) {
  input += sugar;
  if (sugar === '0')
  {
      document.getElementById('Add').setAttribute("value", 'Water Spray Humidifier');
      document.getElementById('Image1').setAttribute("src", 'img/sp.jpg');
      document.getElementById('NotAdd').setAttribute("value", 'Engage Dehumidifier');
      document.getElementById('Image2').setAttribute("src", 'img/dhu.jpg');
  }
  else if (sugar === '1')
  {
      document.getElementById('Add').setAttribute("value", 'Hold Static Air');
      document.getElementById('Image1').setAttribute("src", 'img/hold.jpg');
      document.getElementById('NotAdd').setAttribute("value", 'Cycle Air');
      document.getElementById('Image2').setAttribute("src", 'img/vent.jpg');
  }
  document.getElementById("100").disabled = true;
  document.getElementById("50").disabled = true;
  document.getElementById("cancel2").disabled = true;
  
  document.getElementById("Add").disabled = false;
  document.getElementById("NotAdd").disabled = false;
  document.getElementById("cancel3").disabled = false;

  var top = document.getElementById('bubble').offsetTop;
  window.scrollTo(0, top);
  showdata();
}

function gotoPayment(bubble) {
    orderSuccess();
  input += bubble;
  
  document.getElementById("Add").disabled = true;
    document.getElementById("NotAdd").disabled = true;

  document.getElementById("cancel3").disabled = false;

  showdata();
}

function cancel() {
  input = '';
  order = '';
  price = 0;
  i = 0;
  accept = 0;
  water = 0;

    init();
}

function cancel2() {
  input = '';
  order = '';
  price = 0;
  i = 0;
  accept = 0;
  water = 0;

  showdata();
}


function pay(c)
{
  input += c;
  showdata();
  if (price > 0)
  {
    price -= 10;
    document.getElementById("currentPriceElement").innerHTML = price;
    if (price === 0)
    {
        orderSuccess();
    }
  }
}

function orderSuccess()
{
  showdata();
  document.getElementById('cancel3').setAttribute("value",'Restart');
    var top = document.getElementById('orderSuccess').offsetTop;
  window.scrollTo(0, top-250);
}

function neworder()
{
  document.getElementById('cancel3').setAttribute("value",'Cancel');
  cancel('r');
}

function compute()
{
  $(':input').prop('disabled',true);
  var next = document.getElementById("next");
  next.disabled = false;
  next.innerHTML = "NEXT";
  next.removeAttribute('onclick');
  initial();
}

function showdata()
{
  document.getElementById("tag5").innerHTML = input;
}

function showinput()
{
  var j = i-1;
  var front = ''
  for (let n=0; n<j; n++)
  {
    front += input.charAt(n);
    console.log(front);
  }
  var after = ''
  for (let n=j+1; n < input.length; n++)
  {
    after += input.charAt(n);
    console.log(after);
  }
  document.getElementById("tag5").innerHTML = front + '<span style= \'color: red\'>' + input.charAt(j) + '</span>' + after;
}

function end()
{
  document.getElementById("next").setAttribute("onclick",'end2()');
}

function end2()
{
  showdata();
  var next = document.getElementById("next");
  next.innerHTML = "RESET";
  if (mode === 0)
  {
    next.setAttribute('onclick',"delend(); cancel()");
  }
  else
  {
    next.setAttribute('onclick',"delend(); cancel2(); testingMode()");
  }
  next.style.backgroundColor = 'red';
  var result = document.getElementById("result");
  if (accept === 0)
  {
    result.innerHTML = "REJECTED"
  }
  else if (accept === 1)
  {
    result.innerHTML = "ACCEPTED"
  }
}

function delend()
{
  var next = document.getElementById("next");
  next.innerHTML = "COMPUTE";
  next.setAttribute('onclick',"compute()");
  next.style.backgroundColor = '#97d4d7';
  document.getElementById("result").innerHTML="";
  delinitial();
  delmilktea();
  delgreentea();
  delsugar50();
  delsugar100();
  deladd();
  delnotadd();
  deltenaddbubble();
  delfirstten();
  delsecondten();
}

function initial()
{
  document.querySelector("#circle1").style.borderColor = 'red';
  var next = document.getElementById("next");
  if (i > 0)
  {
    showinput();
  }
  if (i < input.length)
  {
    if (input.charAt(i)==='0')
    {
      next.setAttribute('onclick',"delinitial(); milktea()");
    }
    else if (input.charAt(i)==='1')
    {
      next.setAttribute('onclick',"delinitial(); greentea()");
    }
    else if (input.charAt(i) === 'c' || input.charAt(i)=== 'r')
    {
      next.setAttribute('onclick',"delinitial(); initial()");
    }
  }
  else
  {
    end();
  } 
  i++;
}

function delinitial()
{
  document.querySelector("#circle1").style.borderColor = 'gray';
}

function milktea()
{
  document.querySelector("#circle2").style.borderColor = 'red';
  var next = document.getElementById("next");
  showinput();
  if (i < input.length)
  {
    if (input.charAt(i)==='0')
    {
      next.setAttribute('onclick',"delmilktea(); sugar100()");
    }
    else if (input.charAt(i)==='1')
    {
      next.setAttribute('onclick',"delmilktea(); sugar50()");
    }
    else if (input.charAt(i) === 'c')
    {
      next.setAttribute('onclick',"delmilktea(); milktea()");
    }
    else if (input.charAt(i) === 'r')
    {
      next.setAttribute('onclick',"delmilktea(); initial()");
    }
  }
  else
  {
    end();
  } 
  i++;
}

function delmilktea()
{
  document.querySelector("#circle2").style.borderColor = 'gray';
}

function greentea()
{
  document.querySelector("#circle6").style.borderColor = 'red';
  var next = document.getElementById("next");
  showinput();
  if (i < input.length)
  {
    if (input.charAt(i)==='0')
    {
      next.setAttribute('onclick',"delgreentea(); sugar100()");
    }
    else if (input.charAt(i)==='1')
    {
      next.setAttribute('onclick',"delgreentea(); sugar50()");
    }
    else if (input.charAt(i) === 'c')
    {
      next.setAttribute('onclick',"delgreentea(); greentea()");
    }
    else if (input.charAt(i) === 'r')
    {
      next.setAttribute('onclick',"delgreentea(); initial()");
    }
  }
  else
  {
    end();
  } 
  i++;
}

function delgreentea()
{
  document.querySelector("#circle6").style.borderColor = 'gray';
}

function sugar100()
{
  document.querySelector("#circle3").style.borderColor = 'red';
  var next = document.getElementById("next");
  showinput();
  if (i < input.length)
  {
    if (input.charAt(i)==='0')
    {
      next.setAttribute('onclick',"delsugar100(); add()");
    }
    else if (input.charAt(i)==='1')
    {
      next.setAttribute('onclick',"delsugar100(); notadd()");
    }
    else if (input.charAt(i) === 'c')
    {
      next.setAttribute('onclick',"delsugar100(); sugar100()");
    }
    else if (input.charAt(i) === 'r')
    {
      next.setAttribute('onclick',"delsugar100(); initial()");
    }
  }
  else
  {
    end();
  } 
  i++;
}

function delsugar100()
{
  document.querySelector("#circle3").style.borderColor = 'gray';
}

function sugar50()
{
  document.querySelector("#circle7").style.borderColor = 'red';
  var next = document.getElementById("next");
  showinput();
  if (i < input.length)
  {
    if (input.charAt(i)==='0')
    {
      next.setAttribute('onclick',"delsugar50(); add()");
    }
    else if (input.charAt(i)==='1')
    {
      next.setAttribute('onclick',"delsugar50(); notadd()");
    }
    else if (input.charAt(i) === 'c')
    {
      next.setAttribute('onclick',"delsugar50(); sugar50()");
    }
    else if (input.charAt(i) === 'r')
    {
      next.setAttribute('onclick',"delsugar50(); initial()");
    }
  }
  else
  {
    end();
  } 
  i++;
}

function delsugar50()
{
  document.querySelector("#circle7").style.borderColor = 'gray';
}

function add()
{
  document.querySelector("#circle4").style.borderColor = 'red';
  var next = document.getElementById("next");
  showinput();
  if (i < input.length)
  {
    if (input.charAt(i)==='0')
    {
      next.setAttribute('onclick',"deladd(); add()");
    }
    else if (input.charAt(i)==='1')
    {
      next.setAttribute('onclick',"deladd(); add()");
    }
    else if (input.charAt(i) === 'c')
    {
      next.setAttribute('onclick',"deladd(); tenaddbubble()");
    }
    else if (input.charAt(i) === 'r')
    {
      next.setAttribute('onclick',"deladd(); initial()");
    }
  }
  else
  {
    end();
  } 
  i++;
}

function deladd()
{
  document.querySelector("#circle4").style.borderColor = 'gray';
}

function notadd()
{
  document.querySelector("#circle8").style.borderColor = 'red';
  var next = document.getElementById("next");
  showinput();
  if (i < input.length)
  {
    if (input.charAt(i)==='0')
    {
      next.setAttribute('onclick',"delnotadd(); notadd()");
    }
    else if (input.charAt(i)==='1')
    {
      next.setAttribute('onclick',"delnotadd(); notadd()");
    }
    else if (input.charAt(i) === 'c')
    {
      next.setAttribute('onclick',"delnotadd(); firstten()");
    }
    else if (input.charAt(i) === 'r')
    {
      next.setAttribute('onclick',"delnotadd(); initial()");
    }
  }
  else
  {
    end();
  } 
  i++;
}

function delnotadd()
{
  document.querySelector("#circle8").style.borderColor = 'gray';
}

function tenaddbubble()
{
  document.querySelector("#circle5").style.borderColor = 'red';
  var next = document.getElementById("next");
  showinput();
  if (i < input.length)
  {
    if (input.charAt(i) === '0' || input.charAt(i)=== '1')
    {
      next.setAttribute('onclick',"deltenaddbubble(); tenaddbubble()");
    }
    else if (input.charAt(i) === 'c')
    {
      next.setAttribute('onclick',"deltenaddbubble(); firstten()");
    }
    else if (input.charAt(i) === 'r')
    {
      next.setAttribute('onclick',"deltenaddbubble(); initial()");
    }
  }
  else
  {
    end();
  } 
  i++;
}

function deltenaddbubble()
{
  document.querySelector("#circle5").style.borderColor = 'gray';
}

function firstten()
{
  document.querySelector("#circle9").style.borderColor = 'red';
  var next = document.getElementById("next");
  showinput();
  if (i < input.length)
  {
    if (input.charAt(i)==='0' || input.charAt(i)=== '1')
    {
      next.setAttribute('onclick',"delfirstten(); firstten()");
    }
    else if (input.charAt(i) === 'c')
    {
      next.setAttribute('onclick',"delfirstten(); secondten()");
    }
    else if (input.charAt(i) === 'r')
    {
      next.setAttribute('onclick',"delfirstten(); initial()");
    }
  }
  else
  {
    end();
  } 
  i++;
}

function delfirstten()
{
  document.querySelector("#circle9").style.borderColor = 'gray';
}

function secondten()
{
  accept = 1;
  document.querySelector("#final").style.border = '17px red double';
  var next = document.getElementById("next");
  showinput();
  if (i < input.length)
  {
    if (input.charAt(i)==='0' || input.charAt(i)=== '1' || input.charAt(i)=== 'c')
    {
      next.setAttribute('onclick',"delsecondten(); secondten()");
    }
    else if (input.charAt(i) === 'r')
    {
      accept = 0;
      next.setAttribute('onclick',"delsecondten(); initial()");
    }
  }
  else
  {
    end();
  } 
  i++;
}

function delsecondten(){
  document.querySelector("#final").style.border = '17px gray double';
}

function testingMode() {
  mode = 1;
  $(':input').prop('disabled',true);
  var x = document.getElementById("inputtest");
  document.getElementById("vendingmode").style.backgroundColor = "white";
  document.getElementById("testingmode").style.backgroundColor = "#97d4d7";
  x.style.display = "grid";
  document.getElementById("vendingmode").disabled = false;
  document.getElementById("btn1").disabled = false;
  document.getElementById("btn0").disabled = false;
  document.getElementById("btnc").disabled = false;
  document.getElementById("btnr").disabled = false;
  document.getElementById("next").disabled = false;
}

function input1()
{
  input += '1';
  showdata();
}

function input0()
{
  input += '0';
  showdata();
}

function inputc()
{
  input += 'c';
  showdata();
}

function inputr()
{
  input += 'r';
  showdata();
}