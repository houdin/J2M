

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
  #include "codeJ2M.jsx";
  var layeur;
  var composi;
  if(compo == "Letter"){
    composi = LetterComp;
  }else if(compo == "0cloner"){
    composi = ClonerComp;
  }
  switch (laye.toLowerCase()) {
    case "shape":
      layeur= composi.layers.addShape();
      var contents = layeur.property("ADBE Root Vectors Group"); // Accessing the contents of the shape layer
      var shapeRect = contents.addProperty("ADBE Vector Shape - Rect"); // Adding a rectangle to the shape layer
      var shapeStroke = contents.addProperty("ADBE Vector Graphic - Stroke");
      var shapeFill = contents.addProperty("ADBE Vector Graphic - Fill");
      //shapeRect = contents.property("ADBE Vector Shape - Rect"); // adding fill invalidates shapeRect
      //shapeRect = contents.property("ADBE Vector Shape - Rect"); // adding fill invalidates shapeRect
      //-------------------------------------
      if (layeName == "Rec") {
        if(compo== "Letter"){

          layeur.content("Rectangle Path 1").size.expression =writeCode("Letter-Rec_size");
          layeur.content("Rectangle Path 1").position.setValue([0, 0]);
          layeur.content("Fill 1").color.setValue([0.117,0.39,0.53]);
          layeur.content("Stroke 1").strokeWidth.setValue(3);
          layeur.content("Stroke 1").color.setValue([0.99,0.91,0.11]);
          layeur.transform.position.expression = writeCode("Letter-Rec_pos");

        }else if (compo== "0cloner") {
          var lt = "comp(\"Letter\").layer(\"Rec\")";
          layeur.content("Rectangle Path 1").size.expression =lt+".content(\"Rectangle Path 1\").size";
          layeur.transform.scale.expression =lt+".transform.scale";
          layeur.content("Rectangle Path 1").position.expression = lt+".content(\"Rectangle Path 1\").position";
          layeur.content("Fill 1").color.expression =lt+".content(\"Fill 1\").color";
          layeur.content("Stroke 1").strokeWidth.expression =lt+".content(\"Stroke 1\").strokeWidth";
          layeur.content("Stroke 1").color.expression =lt+".content(\"Stroke 1\").color";
          layeur.transform.position.expression = lt+".transform.position";
        }
      }else if (layeName == "Dark"){
        layeur.content("Rectangle Path 1").size.expression = "[164.5,180]";
        layeur.content("Rectangle Path 1").position.setValue([0, 0]);
        layeur.content("Fill 1").color.setValue([0,0,0]);
        layeur.content("Stroke 1").strokeWidth.setValue(0);
        layeur.content("Stroke 1").color.setValue([0,0,0]);
        layeur.transform.position.expression = "[0,thisComp.height]";
        layeur.transform.rotation.expression = "-46.8";
        layeur.transform.opacity.expression = "7";
        layeur.blendingMode = BlendingMode.CLASSIC_COLOR_BURN;
      }
      break;
    case "null":
      layeur= compo.layers.addNull();
      break;
    case "text":
      layeur= composi.layers.addText();
      var textProp = layeur.property("Source Text");
      var textDocument = textProp.value;
      textDocument.fillColor = [1, 1, 1];
      textDocument.font = "AvantGardeMedium";
      textDocument.applyStroke = false;
      textDocument.applyFill = true;
      textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
      if (layeName == "Letter") {
        textDocument.fontSize = 115;
        textProp.setValue(textDocument);
        if(compo == "Letter"){
          layeur.text.sourceText.expression = "\"X\"";
          var codeLetterPos =
          "var x = thisComp.width/2;\
          var y = transform.position[1];\
          [x ,y]";
          layeur.transform.position.setValue([0,95.5]);
          layeur.transform.position.expression = codeLetterPos;
        }else if(compo == "0cloner"){
          layeur.text.sourceText.expression = "thisComp.name == \"0cloner\" ? \"?\" : thisComp.name;";
          layeur.transform.position.expression = "comp(\"Letter\").layer(\"Letter\").transform.position;";
          layeur.transform.scale.expression = "comp(\"Letter\").layer(\"Letter\").transform.scale;";
        }

      }else if(layeName == "clone"){
        layeur.transform.scale.setValue([100,100]);
        layeur.transform.position.setValue([110,85]);
        layeur.transform.position.dimensionsSeparated = true;
        layeur.transform.yPosition.expression = "thisComp.height/2"
        layeur.transform.rotation.setValue(-90);
        layeur.transform.opacity.expression = codeClone;

        textDocument.fontSize = 18;
        textProp.setValue(textDocument);
        layeur.name = layeName;
        var tex;
        if(compo == "Letter"){
          tex= "'REGLAGE'";
        }else if(compo == "0cloner"){
          tex="'CLONE'";
        }
        layeur.text.sourceText.expression = tex;
        layeur.shy = true;
        composi.hideShyLayers =true;
        layeur.locked = true;
      }
      break;
    case "solid":
      layeur= composi.layers.addSolid([1,1,1],layeName, composi.width,composi.height,1)
      break;
    case "solidfx":
      layeur= composi.layers.addSolid([1,1,1],layeName, composi.width,composi.height,1)
      layeur.adjustmentLayer = true;
      break;
    default: null;

  }
  if(layeName != "clone"){
    layeur.name = layeName;
    layeName == "Dark" ? layeur.locked = true : false;
  }

  return layeur;
}
///////////////////////////////////////////////////////////////


///   ADD ELEMENT COMP ////////////////////////////////////

function addElement(compo){
  var compi =findComp(compo, this)

  if (compi.layers.length >0) {
    for (var i = 1; i <= compi.layers.length; i++) {
      if (compi.layer(i).name=="Letter") {
        break;
      }else if (i== compi.layers.length){
        elementComp(compo,"shape","Rec");
        elementComp(compo,"shape","Dark");
        elementComp(compo,"text","Letter");
        elementComp(compo,"text","clone");
        break;
      }
    }
  }else {
    elementComp(compo,"shape","Rec");
    elementComp(compo,"shape","Dark");
    elementComp(compo,"text","Letter");
    elementComp(compo,"text","clone");

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
