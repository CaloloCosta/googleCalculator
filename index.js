let rad = true;
let deg = false;
let button = document.getElementsByTagName("button");
let key = document.getElementById("key");
let dis = document.getElementById("display");
let values = [];
let equals = false;
let ANS = 0;

function calculator(){
  eventHandler();
}
function eventHandler(){
  key.addEventListener('click',display);
}
function display(data){
  let target = event.target;
  if(target.className == 'digit' || target.className == 'operator' || target.className == 'function'){
    printOnTheScrean(target,dis);
    checkEquals(target,dis);
  }
  
}
function checkEquals(data,dis){
  if(data.textContent == "="){
    equals = true;
    values = dis.textContent.split(" ");
    operationByPriority(values);
  }
}
function printOnTheScrean(data,dis){
  if(data.textContent == "Rad"){
    rad = true;
    deg = false;
  }
  else if(data.textContent == "Deg"){
    deg = true;
    rad = false;
  }
  else if(data.textContent == "Ans"){
    if(equals){
      dis.textContent = ANS;
    }
    else{
      insertOrAdd(ANS,data.className);
    }

  }

  else if(data.textContent == "AC"){
      if(dis.textContent[dis.textContent.length-1]==" ")
        dis.textContent = dis.textContent.substring(0,dis.textContent.length-3);
      else if(equals)
        dis.textContent = "0";
      else {
        dis.textContent = dis.textContent.substring(0,dis.textContent.length-1);
      }
  }
  else if(data.className == "function"){
    equals = false;
    insertOrAdd(data.textContent+'( ',data.className);
  }
  else if(data.className == "operator"){
    equals = false;
    if(data.textContent == "x!"){
      dis.textContent += "!";
    }
    else if(data.textContent == "e"){
      insertOrAdd(Math.E,data.className);
    }
    else if (data.textContent == "π"){
      insertOrAdd(Math.PI,data.className);
    }
    else if(data.textContent == "("){
      insertOrAdd(data.textContent+' ',data.className);
    }
    else if(data.textContent == ")"){
      dis.textContent += ' '+data.textContent;
    }
    else {
        dis.textContent += ' '+data.textContent+' ';
    }
  }
  else {
    insertOrAdd(data.textContent,data.className);
  }
  return dis;
}
function operationByPriority(values){
  let op = ['!','%','÷','×','-','+'];
  let functions = ['sin(','cos(','tan(','log(','ln(','√('];
  let i = 0;
  let f = 0;
  let index = 0;
  equals = true;
    while(i < op.length){
      for(let c = 0; c < values.length; c++){
        if(/\d+!/.test(values[c])){
          values[c] = factorial(parseFloat(values[c]));
          index++;
        }
      }
      // check functions
      while(f < functions.length){
        if(values.indexOf(functions[f]) > -1){
          let t = values.indexOf(functions[f]);
          values[t] = fOpearation(functions[f],values[t+1]);
          values[t+1] = null;
          values[t+2] = null;
          values = values.filter(function(v){
            return v != null;
          });
        }else {
          f++;
        }
      }
      // check Brackets
      if(values.indexOf("(") > -1){
        let bracket = [];
        index = values.indexOf("(");
        let lastIndex = values.indexOf(")");
        let x = index+1;
        for(let i = 0, a = x; a < lastIndex; a++, i++){
          bracket[i] = values[a];
          values[index] = null;
          index++;
        }
        values[lastIndex] = null;
        values[index] = operationByPriority(bracket);
        values = values.filter(function(v){
          return v != null;
        });
      }
      else if(values.indexOf(op[i]) > -1){
        index = values.indexOf(op[i]);
        values[index-1] = operation(parseFloat(values[index-1]),parseFloat(values[index+1]),values[index]);
        values[index] = null;
        values[index+1] = null;
        values = values.filter(function(v){
          return v != null;
        });
      }
      else if(values.indexOf(op[i]) == -1)
        i++;
    }
    dis.textContent = values[0];
    ANS = values[0];
    return values;
}
function fOpearation(fName, n){
  let result;
  switch(fName){
    case 'cos(':
      result = (rad)?Math.cos(n):Math.cos(n*Math.PI/180);
      break;
    case 'sin(':
      result = (rad)?Math.sin(n):Math.sin(n*Math.PI/180);
      break;
    case 'tan(':
      result = (rad)?Math.tan(n):tan(n*Math.PI/180);
      break;
    case 'log(':
      result = Math.log10(n);
      break;
    case 'ln(':
      result = Math.log(n);
      break;
    case '√(':
      result = Math.sqrt(n);

  }
  return result;
}
function operation(n1,n2,op){
  let result;
  switch(op){
    case "+":
      result = addition(n1,n2);
      break;
    case "-":
      result = subtruction(n1,n2);
      break;
    case "÷":
      result = division(n1,n2);
      break;
    case "×":
      result = multiplication(n1,n2);
      break;
    case "%":
      result = percentage(n1,n2);
  }
  return result;

}
calculator();
function insertOrAdd(info,className){
  if(className == 'digit'){
    if(dis.textContent == '0' || equals){
        dis.textContent = info;
        equals = false;
    }
    else {
      dis.textContent += info;
    }
  }
  else if(className != "digit"){
    if(dis.textContent == '0')
      dis.textContent = info;
    else if(/\d/.test(dis.textContent[dis.textContent.length-1]) || dis.textContent[dis.textContent.length-1] == '(' || dis.textContent[dis.textContent.length-1] == ')'){
      dis.textContent += ' × '+info;
    }
    else {
      dis.textContent += info;
    }
  }
}
function addition(n1,n2){
  return n1+n2;
}
function multiplication(n1,n2){
  return n1*n2;
}
function subtruction(n1,n2){
  return n1-n2;
}
function division(n1,n2){
  return n1/n2;
}
function percentage(n1,n2){
  return n1*(n2/100);
}

function factorial(num){
  if(num == 0)
    return 1;
  else if(num > 0)
    return num * factorial(num-1);
}
