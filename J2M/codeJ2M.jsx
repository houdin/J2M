

///
function writeCode(data){
  var PosiCode;
  if( data == "PositionX"){
    PosiCode = "ease(time,5+u,6+u,initPosx,posX);";
  }else if(data == "PositionY"){
    PosiCode = "ease(time,5+u,6+u,initPosy,posY+thisComp.layer(\"Control\").effect(\"Séparateur\")(1));";
  }
  var codePos;
  if( data.indexOf("Position") != -1 || data.indexOf("color") != -1 ||
  data.indexOf("luminance") != -1 || data.indexOf("saturation") != -1 ){
  codePos =
  "var wd = "+i+"-1;\
  var ltt = "+j+";\
  var lgn = "+lgn+";\
  var initPosx = "+initPosx+";\
  var initPosy = "+initPosy+";\
  var FXword = thisComp.layer(\"Control\").effect(\"Décalage Mots\")(1);\
  var FXletter = thisComp.layer(\"Control\").effect(\"Décalage Lettres\")(1)/50;\
  var FXanimation = (100-thisComp.layer(\"Control\").effect(\"Décalage Animation\")(1))/10;\
  var bblack =11/25;\
  var Pos = 240;\
  var sclPercent = 87;\
  var letterWidth = (sclPercent/100)*120;\
  var letterHeight=(sclPercent/100)*113;\
  var guide = lgn < 2 ? 0: 1;\
  var lspaceW = 7, lspaceH=24+(thisComp.layer(\"Mots\").effect(\"Espacement Y\")(1)*guide);\
  var u = (( bblack +(FXword/10) ) *( wd) ) + ( 0.04*( (ltt*FXletter)* (ltt /FXanimation) ));\
  var posX = Pos+((letterWidth+lspaceW)*ltt);\
  var posY = Pos+((letterHeight+lspaceH)*lgn);\
  "+PosiCode+";";


  var codeTransi;
  //var codeLumi ;
  //var codeSatur;
  if (data =="color") {
    codeTransi = "comp(\"0cloner\").layer(\"Rec\").content(\"Fill 1\").color";
  }else if(data =="luminance"){
    codeTransi = "linear(time, t1, t1+transiColor, 0, -5)";
  }else if(data == "saturation"){
    codeTransi = "linear(time, t1, t1+transiColor, 0, -100)";
  }

  var codeColor =
  "var t1, t2;\
  var inc ="+i+";\
  var transiColor = thisComp.layer(\"Control\").effect(\"Transition couleur\")(1)/100;\
  inc ==1 ? t1 = 5-(11/25):t1= 5+(2*(inc-1) );\
  "+codeTransi+";";

}

// // LETTER CODE //////////////////////////

var codeLRecSize =
"var x = thisComp.width-content(\"Stroke 1\").strokeWidth;\
var y = thisComp.height-content(\"Stroke 1\").strokeWidth;\
[x,y]";
var codeLRecPos = "[thisComp.width/2,thisComp.height/2]";



  var code;
  switch (data) {
    case "PositionX":
      code = codePos;
      break;
    case "PositionY":
      code = codePos;
      break;
    case "color":
      code = codeTransi;
      break;
    case "luminance":
      code = codeColor;
      break;
    case "saturation":
      code = codeColor;
      break;
    //---------------------------
    case "Letter-Letter":
      code = codeLRecSize;
      break;
    case "Letter-Rec_size":
      code = codeLRecSize;
      break;
    case "Letter-Rec_pos":
      code = codeLRecPos;
      break;
    case "0cloner-Letter":
      code = codeColor;
      break;
    case "0cloner-Rec":
      code = codeColor;
      break;

    default:

  }


  return code;
}
