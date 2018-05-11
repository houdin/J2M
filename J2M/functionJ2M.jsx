

// // TRIM FUNCTION-////////////////////////
function trim (str) {
  if(str != null){
    return str.replace(/^\s+/,'').replace(/\s+$/,'');
  }else{
    return false;
  }
}
//////////////////////////////////////////

/// FIND COMP FUNCTION ////////////////////////////
function findComp(compNom, compItm, creer, cloner, parent){

  for(var i=1; i<=proj.numItems; i++){
    if (proj.item(i).name == compNom && proj.item(i) instanceof CompItem){
      compItm = proj.item(i);
      compItm.motionBlur =true;
      if (parent != undefined) {
        compItm.parentFolder =parent
        break;
      }else {
        break;
      }

    }else if(i==proj.numItems && creer == true){
        if(compNom.length >1){
          switch (compNom) {
            case "Letter":
              compItm= proj.items.addComp(compNom, 120, 113, 1,60, 25);
              if (parent != undefined) {
              compItm.parentFolder =parent;
              break;
              }
              //compItm.motionBlur =true;
            case "0cloner":
              compItm= proj.items.addComp(compNom, 120, 113, 1,60, 25);
              if ( parent != undefined) {
              compItm.parentFolder =parent;
              break;
              }
              //compItm.motionBlur =true;
            case "COMP":
              compItm= proj.items.addComp(compNom, 1920, 1080, 1,60, 25);
              compItm.motionBlur =true;
              if (compItm && parent != undefined) {
              compItm.parentFolder =parent;
              break;
              }
            default: null;
          }
          if (compItm && parent != undefined) {
          compItm.parentFolder =parent;
          break;
          }else{
            break;
          }
        }else if (compNom.length==1 && cloner != undefined) {
          compItm= cloner.duplicate();
          compItm.name = compNom;
          if (compItm && parent != undefined) {
            compItm.parentFolder =parent;
            break;
        }
      }
    }else if(i==proj.numItems && creer == undefined){
    "La compositon "+compNom+" n'esiste pas !"
    }
  }

  return compItm;
};
////////////////////////////////////////////////////

//--- FIND FOLDER FUNCTION /////////////////////////
function findFolder(foldName, fold, parent){
  for (var i = 1; i <=proj.numItems; i++) {
    if (proj.item(i).name==foldName && proj.item(i) instanceof FolderItem) {
      fold = proj.item(i)
      break;
    } else if(i == proj.numItems){
      fold = proj.items.addFolder(foldName)
      if (parent != undefined ) {
        fold.parentFolder = parent;
        break;
      }else{
        break;
      }
    }
  }

  return fold;
}
///////////////////////////////////////////////

/// ADD FOOTAGE IN COMP //////////////////////////////////

function addLayr(compo, layeName,laye, move){
  if(compo){
    if (compo.layers.length> 0) {
      for (var i = 1; i <= compo.layers.length; i++) {
        if (compo.layer(i).name == layeName) {
          laye =compo.layer(i);
          if (move != undefined ) {
            move>1 ? move= move : move
            if (compo.layers.length==1 && compo.layer(i).name == layeName) {
              break;
            }else if(laye.index != compo.layers.length){
              laye.moveAfter(compo.layer(move));
            }
            break;
          }else {break;}
          break;
        }else if (i== compo.layers.length) {
          var laye =compo.layers.add(laye);
          laye.moveAfter(compo.layer(move+1));
        }
      }
    }else if(compo.layers.length==0 ){
      compo.layers.add(laye);
    }

  }else{
    alert("La compositon "+compo.name+" n'existe pas !!");
  }
}

/////////////////////////////////////////////////////////

///  ADD COMP ELEMENT FUNCTION ///////////////////////////
var codeClone ="eval(\"@JSXBIN@ES@2.0@MyBbyBn0ABJAnAdCzChdhdBXzGjMjFjOjHjUjICfXzEjOjBjNjFDfjzIjUjIjJjTiDjPjNjQEfnndBFdAFdjE0DzAFByB\")";
function elementComp(compo, laye, layeName,preset, text){
  var layeur;
  switch (laye.toLowerCase()) {
    case "shape":
      layeur= compo.layers.addShape();
      break;
    case "null":
      layeur= compo.layers.addNull();
      break;
    case "text":
      if(layeName == "clone"){
        layeur= compo.layers.addText();
        layeur.transform.scale.setValue([100,100]);
        layeur.transform.position.setValue([110,85]);
        layeur.transform.rotation.setValue(-90);
        layeur.transform.opacity.expression = codeClone;
        layeur.shy = true;
        var textProp = layeur.property("Source Text");
        var textDocument = textProp.value;
        textDocument.fontSize = 18;
        textDocument.fillColor = [1, 1, 1];
        textDocument.font = "AvantGardeMedium";
        textDocument.applyStroke = false;
        textDocument.applyFill = true;
        textProp.setValue(textDocument);
        layeur.name = layeName;
        compo.hideShyLayers =true;
        layeur.locked = true;
      }else{
      layeur= compo.layers.addText();
      layeur.transform.scale.setValue([93,93]);
      layeur.transform.position.setValue([60,95.5]);
      var textProp = layeur.property("Source Text");
      var textDocument = textProp.value;
      //myString = "Happy holidays!";
      //textDocument.resetCharStyle();
      textDocument.fontSize = 124;
      textDocument.fillColor = [1, 1, 1];
      textDocument.font = "AvantGardeMedium";
      textDocument.applyStroke = false;
      textDocument.applyFill = true;
      //textDocument.text = myString;
      textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
      //textDocument.tracking = 50;
      textProp.setValue(textDocument);
      }
      break;
    case "solid":
      layeur= compo.layers.addSolid([1,1,1],layeName, compo.width,compo.height,1)
      break;
    case "solidfx":
      layeur= compo.layers.addSolid([1,1,1],layeName, compo.width,compo.height,1)
      layeur.adjustmentLayer = true;
      break;
    default: null;

  }
  if(layeName != "clone"){
  layeur.name = layeName;
  }
  if (text != undefined) {
    layeur.text.sourceText.expression = text;
  }
  if (preset != undefined) {
    if(compo == LetterComp){
    layeur.applyPreset(File("./J2M/Bin/_lett_"+preset+".ffx"));
  }else if(compo == ClonerComp){
    layeur.applyPreset(File("./J2M/Bin/_cln_"+preset+".ffx"));
    }
  }
  return layeur;
}
///////////////////////////////////////////////////////////////


///   ADD ELEMENT COMP ////////////////////////////////////

function addElement(compo){
  var tex;
  if(compo == LetterComp){
  tex= "'REGLAGE'";
}else if(compo == ClonerComp){
  tex="'CLONE'";
  }
  if (compo.layers.length >0) {
    for (var i = 1; i <= compo.layers.length; i++) {
      if (compo.layer(i).name=="Letter") {
        break;
      }else if (i== compo.layers.length){
        elementComp(compo,"shape","Rec", "rec");
        elementComp(compo,"solidFX","FX", "fx");
        elementComp(compo,"text","Letter", "tx");
        elementComp(compo,"text","clone", undefined,tex);
        break;
      }
    }
  }else {
    elementComp(compo,"shape","Rec", "rec");
    elementComp(compo,"solidFX","FX", "fx");
    elementComp(compo,"text","Letter", "tx");
    elementComp(compo,"text","clone", undefined,tex);

  }
}
//////////////////////////////////////////////////////////////

/// ADD CONTROLER FUNCTION ///////////////////////////////
function addControler(effet, layeur,nom, controler, valeur){
  if(!layeur.effect(nom)){
  layeur.Effects.addProperty("ADBE "+controler+" Control").name = nom;
  layeur.effect(nom)(1).setValue(valeur);
  }
  effet = layeur.effect(nom)(1);
  return effet;
}

//////////////////////////////////////////////////////////

///  DELETE LAYER FUNCTION ////////////////////////////////
function layerDel(compo){
  for( var i=compo.layers.length; i>= 1; i--){
    var layr = compo.layer(i);
    if (layr.name.length ==1 || layr.name.indexOf('-exp')!=-1 || layr.name.indexOf('Control')!=-1 ){
      layr.remove();
    }else if(i<= 1){ break; }
  }
}
//////////////////////////////////////////////////////



// -- URL //////////////////////////
var winBrowserCmd = "C:/Program Files/Internet Explorer/iexplore.exe";
var macBrowserCmdStart = "osascript -e 'open location \"";
var macBrowserCmdEnd = "\"'";

function LinkToURL(){
    var URL = "http://www.hsquare.net/"; // your web page

    if ($.os.indexOf("Windows") != -1){
        system.callSystem(winBrowserCmd + " " + URL);
    }else{
        system.callSystem(macBrowserCmdStart + URL + macBrowserCmdEnd);
    }
  }
  ///////////////////////////////////////

/// -- RENDER FUNCTION //////////////////////////
function openXport(){
    var renderSet = "J2M_export";

    var projPathData = proj.file.fsName.split(proj.file.name)[0];
    var projPath;
    if (projPathData.indexOf(":")>=0){
      var lowD = projPathData.split(":")[0].toLowerCase();
      var RestPath = projPathData.split(":")[1];
      projPath ="/"+lowD+"/"+RestPath.replace(/\\/g,"/").replace("////g","");
    }else{
      projPath ="/"+projPathData.replace(/\\/g,"/").replace("////g","");
    };

    var folderRender = new Folder(projPath+"Rendu_J2M") ;
    if (!folderRender.exists) {
      folderRender.create()
      };

      if(COMP!=null && COMP.layers.length>0){
          var rq_item = proj.renderQueue.items.add(COMP);
          var myRSTemplates = rq_item.outputModule(1).templates;
          var foundTemplate = false;

          for (var i=0; i<= myRSTemplates.length; i++){
            if (myRSTemplates[i] == renderSet){
              foundTemplate =true;
              break;
            }
          }
          if(foundTemplate){
            rq_item.outputModule(1).applyTemplate(renderSet);
            rq_item.outputModule(1).file = File(folderRender.absoluteURI+"/"+nomInvite.split(' ')[0]+"_AvantAprès.mov");
            rq_item.render = true;
            proj.renderQueue.render();

          }else{
            alert('Le module d\'exportation \"J2M_export" est absent !');
          }

      }else{
        alert("Aucun calque dans la compositon \"AVANT-APRES\" !");
      };

  }

/// BACKGROUND FUNCTION //////////////////////////
  function bgimport(){
  for (var i = 1; i <= proj.numItems; i++) {
    if (proj.item(i).name == "BG.psd" && proj.item(i) instanceof FootageItem) {
      bgPic = proj.item(i)
      bgPic.parentFolder = FootageF;
      addLayr(COMP,"BG.psd", bgPic, COMP.layers.length)
      break;
    }else if(i== proj.numItems){
      bgPic = proj.importFile(psd);
      bgPic.parentFolder = FootageF;
      addLayr(COMP,"BG.psd", bgPic, COMP.layers.length)
      break;
    }
  }
  }
  //---/// ADD WORD -//////////////////////////////
