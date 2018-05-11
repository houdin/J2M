
/// JEU DE MOTS -------------

/// VARIABLE //////////////////////////
var proj = app.project;
var letter;

var sclPercent = 87;
var letterWidth = (sclPercent/100)*120;
var letterHeight=(sclPercent/100)*113;
var lspaceW = 7, lspaceH=24;
var Pos = 240;
var nomLimit =13;

var nomInvite;
var numNom ;

var j2mF;
var CompF;
var FootageF ;
var LetterF ;
var ClonerF;
//
// ////////////////////////////////
//
// /// VAR COMPO //////////////////////////
var COMP ;
var LetterComp;
var ClonerComp ;

//var fold;
///////////////////////////////////////////
function writter(){
  var nomText="";
  nomText =this.text.toLowerCase();
  nomInvite = trim(nomText);
  numNom = nomInvite.split(' ');
}


#include "J2M/functionJ2M.jsx"
var psd = new ImportOptions(File("./J2M/img/BG.psd"));

function addElements(){


proj.numItems==0? proj.items.addFolder("J2M") : false;
//--------------------------
//  VAR FOLDER /////////////////////
j2mF = findFolder("J2M",this)
CompF = findFolder("Comp",this, j2mF)
FootageF = findFolder("Footage",this, j2mF)
LetterF = findFolder("Letter",this, j2mF)
ClonerF = findFolder("_cloner",this, LetterF)
//
// ////////////////////////////////
//
// /// VAR COMPO //////////////////////////
COMP = findComp("COMP",this,true,"",CompF);
LetterComp = findComp("Letter",this,true,"",ClonerF);
ClonerComp = findComp("0cloner",this,true,"",ClonerF);

//alert(COMP);
/// ADD BG /////////////////////////////////
// var psd = new ImportOptions(File("./J2M/img/BG.psd"));
var bgPic;
bgimport();
COMP.openInViewer();

// ADD ELEMENT ////////////////////
addElement(LetterComp);
addElement(ClonerComp);

}
///////////////////////////////////////////////

// / ADD LETTER FUNCTION /////////////////////////////
var h =0;
var lgn;
function addLetter(){
  layerDel(COMP);
  h=0;
  if(nomInvite != undefined){

    var count;
    var x=0;
    var z=0,c=0,r=0;

  //  mrah oua nn marimarialoinaloin aloin marialoin
  // hamed houdini maria miugifdfuiiuyfd houdini
    while(z< numNom.length){
      var l=1;
      var counter=0;
      for (var y=0; y<numNom.length; y++){

        y<numNom.length-1 && y>0 ? count = 1 : count =0;
        z++;

        for (var i= 0; i<numNom[y].length; i++){
          c++;
          var lim;
          numNom[y].length > 13 ? lim = numNom[y].length : lim =13;
          if (c > lim &&  numNom[y+count].length > (14-c)) {
            c=1;
            x =0;
            h++;
          }

          var posX = Pos+((letterWidth+lspaceW)*x);
          var posY = Pos+((letterHeight+lspaceH)*(h));

          letter =findComp(numNom[y][i],this, true, ClonerComp, LetterF);
          var letterX = COMP.layers.add(letter);
          var offTime = 0.12*l;
          letterX.transform.opacity.expression = "linear(time,"+offTime+","+offTime+"+0.12,0,100);";
          letterX.startTime = offTime;
          letterX.transform.scale.setValue([sclPercent,sclPercent]);
          letterX.transform.position.setValue([posX,posY]);

          if (numNom[y].length == (i+1) && y<numNom.length && COMP.layers.length != nomInvite.replace(" ","").length+1){
            x++;
            c++; i=-1; y++;
            //y++;
            y>=numNom.length ? count = 1 : count =0;
            if(numNom[y-count].length >= 14 || numNom[y-count].length> lim-c){counter++ }
            if (counter == 1) {
              c=0;
              x =-1;
              h++;
            }
          }
          x++;
          l++;

          counter=0;
          if( y ==numNom.length && i == -1){break};
        }
        x++;
        break;
      }
      break;
    }//hamed houdini maria miugifdfuiiuyfd houdini

    nomInvite="";
  }else{

    return false;
  }
  COMP.openInViewer();

  h=1
  for(var w=COMP.layers.length; w>0; w--){
    var layeur = COMP.layer(w);
    layeur.transform.position.dimensionsSeparated =  true;
    if (layeur.name.length==1 ) {
      var pos = layeur.transform.yPosition.value;
      var layeOld = COMP.layer(w+1);
      var posOld = layeOld.name.length ==1 ? layeOld.transform.yPosition.value: pos;
      if(pos == posOld){
        continue;
      }else if(pos != posOld){
        h++;
      }
    }
    if(w==1){break};
  }
} // END ADDLETTER FUNCTION
lgn =h;
/// TAKE WORD FUNCTION /////////////////////////
var wField =[];
var words =new Array;

function takeWord(){
 var num=this.parent.parent.children.length;
  for (var i = 0; i <num; i++) {
    if (this.parent.index == i) {
      wField[i]=this.parent.edit.text.toLowerCase();
    }
  }

  return words;
}
words =wField;
///////////////////////////////////

function removeElement(){
  j2mF.remove();
}



///  ADD WORD ///////////////////////////////
function addWord(){
  lgn =h;
  var nullControl;
  var motControl;
  var textMaster;
  for (var i = 1; i <= COMP.layers.length; i++) {
    if (COMP.layer(i).name.indexOf("Control") != -1) {
      nullControl= COMP.layer(i);
      motControl = COMP.layer("Mots")
      //alert(motControl);
      break;
    }else if(i==COMP.layers.length ){
      motControl = elementComp(COMP,"null","Mots");
      nullControl = elementComp(COMP,"null","Control");
      break;
    }
  }
  nullControl.transform.position.setValue([0,0]);

  var Oln = "Séparateur";
  var Ow = "Décalage Mots";
  var Ol = "Décalage Lettres";
  var Oa = "Décalage Animation";
  var Tc = "Transition couleur";

  var offsetWord = addControler(this, nullControl, Ow , "Slider", 20 );
  var offsetLetter = addControler(this, nullControl, Ol , "Slider", 50 );
  var offsetAnim = addControler(this, nullControl, Oa , "Slider", 50 );
  var colorTransi = addControler(this, nullControl, Tc , "Slider", 25 );
  var offsetline = addControler(this, nullControl, Oln , "Slider", 0 );

  var offsetMots= addControler(this, motControl, "Espacement Y" , "Slider", 0 );

  var u;
  for (var i = 1; i <= words.length; i++) {
    //lgn++

    for (var j = 0; j < words[i-1].length; j++) {

      for (var k = COMP.layers.length; k >= 1; k--) {

        var layr = COMP.layer(k);
        if (layr.name.length ==1 && layr.name == words[i-1][j] ) {

          layr.motionBlur = true;
          //layr.property("Position").dimensionsSeparated = true;
          var initPosx = layr.transform.xPosition.value;
          var initPosy = layr.transform.yPosition.value;

          var Ypos = Pos+((letterHeight+lspaceH)*lgn);
          var codeControlY =
          "var posiY = "+Ypos+";\
          var wd = "+i+"-1;\
          var FXword = effect(\"Décalage Mots\")(1);\
          var bblack =11/25;\
          var u = (( bblack +(FXword/10) ) *( wd) );\
          var controlY= [0,0]";


          // PASTE IN CONTROL LAYER => change to Control_3 /////////////
          /*var posiY = 851;
          var wd = 2-1;
          var FXword = effect("Décalage Mots")(1);
          var bblack =11/25;
          var u = (( bblack +(FXword/10) ) *( wd) );
          var controlY= [0,0];
          if (posiY > 850) {
            controlY = ease(time,5+u,6+u,[0,0],[0,-300]);
          };
         //
         var count= parseInt(name.split("_")[1]);
         var h=0;
         var i;
         for (i=0; i<count; i){
           if(time ==5+u){
             i++;
             break;
           }
         }
         if (i==1 && time>5+u) {
           controlY = ease(time,5+u,6+u,[0,0],[0,-300]);
         }else if(i==2 && time>5+u)
         u = (( bblack +(FXword/10) ) *( wd) );
         controlY;*/

         //////////////////////////////////////

          nullControl.name = "Control_"+lgn;
          nullControl.transform.position.expression= codeControlY;

          #include "J2M/codeJ2M.jsx"

          var codePosX = writeCode("PositionX");
          var codePosY = writeCode("PositionY");

          var codeColor= writeCode("color");

          var codeLumi = writeCode("luminance");
          var codeSatur = writeCode("saturation");

          layr.transform.xPosition.expression = codePosX;
          layr.transform.yPosition.expression = codePosY;
          layr.Effects.addProperty("ADBE Change Color").name = "Transition";
          layr.effect("Transition")(5).expression = codeColor;
          layr.effect("Transition")(6).setValue(25);
          layr.effect("Transition")(4).expression = codeSatur;
          layr.effect("Transition")(3).expression = codeLumi;
          layr.name = layr.name+"-exp"
          layr.setParentWithJump(nullControl);

          nullControl.moveToBeginning();
          break;
        }else{
          continue;
        }
      }
    }
    lgn++;
  }

}

//////////// UI FUNCTION ////////////////////////////////////////////////////////

function createUI(thisObj){

         var myPanel =  thisObj;
         res = "group{orientation:'column', alignment:['fill','fill'],alignChildren:['center','top'],\
                    picL: IconButton{type:'image',bounds:{x:10, y:10, width:360, height:72}},\
                    btnElement: Button{text :'Créer éléments', alignment:'center',bounds:{x:0, y:0, width:160, height:30}},\
                        myTab: Group{ orientation: 'column', alignment:'left',\
                            myText: Panel{orientation:'row',\
                                staticName: StaticText { text:'Nom:' },\
                                editName: EditText {text:'Entrer nom', characters: 20, bounds:{x:0, y:0,width:200, height:30} },\
                                btnApply1: Button{text :'Appliquer', alignment:'left',bounds:{x:0, y:0, width:90, height:25}},\
                            },\
                            wordFieldPanel: Panel{text:'CHAMP DES MOTS',orientation: 'column',alignment:['fill','fill'],\
                                wordField: Group{orientation: 'column',alignment:['left','fill'],margins:[0,0,0,20],\
                                },\
                                applyG: Group{orientation: 'row', alignment:['left','top'],margins:[0,5,0,0],\
                                    btnApply2: Button{text :'Appliquer', alignment:'center',bounds:{x:0, y:0, width:150, height:25}},\
                                  },\
                            },\
                            endBtn: Group{orientation: 'row',alignment:['fill','fill'],\
                                hsquare: Button{text:'www.hsquare.net',alignment:'left',bounds:{x:100, y:0, width:99, height:18}},\
                                RenderBtn: Button{text:'Rendu',alignment:'right',margins:[0,0,0,0],bounds:{x:100, y:0, width:120, height:30}},\
                            },\
                      },\
                }";
         var myPic = new File('./J2M/Bin/_ssl.ffx');
         var myBin;
         myPic.encoding="BINARY";
         myPic.open("r","","");

         myBin = myPic.read().replace("(new String(", "").replace(/\)\)$/, "");
         if(myBin.length ==0){
           alert("le Fichier \"_ssl.xff\" est manquant !!")
           return false
         }

         myPanel.margins=2;

         myPanel.grp = myPanel.add(res);
         myPanel.grp.picL.image = myBin;
         myPanel.grp.maximunSize = myPanel.grp.size;

         var GRP =myPanel.grp.myTab;

         ////////////////////////////////
         var maingroup = myPanel.grp.myTab.wordFieldPanel.wordField;
         add_row(maingroup);

         function add_row(maingroup) {
             var group = maingroup.add("group");
             group.plus =group.add("button", ["","", 33, 23],"+");
             group.plus.onClick =add_btn;
             group.static =group.add("statictext", undefined, "#"+maingroup.children.length);
             group.edit =group.add("edittext", ["","", 230, 23], "Entrer mot");
             group.edit.onChanging = takeWord;
             group.minus =group.add("button", ["","", 23, 23],"-");
             group.minus.onClick = minus_btn;
             group.index =maingroup.children.length -1;
             myPanel.layout.layout(true);
         }

         function add_btn() {
             add_row(maingroup);
         }

         function minus_btn() {
           if (this.parent.parent.children.length >1) {
             this.parent.edit.text="";
             maingroup.remove(this.parent);
             myPanel.layout.layout(true);
           }else{
             this.parent.edit.text ="";
             return false;
           }
         }
         //----------------------------------------------------

         /// - COLOR//////////////////

        myPanel.grp.margins = [0,10,5,10];
        myPanel.grp.myTab.wordFieldPanel.margins = [10,20,0,5];
        myPanel.grp.myTab.endBtn.margins = [17,0,0,0];
        myPanel.grp.myTab.endBtn.spacing = 130;
        myPanel.grp.myTab.endBtn.hsquare.graphics.font = ScriptUI.newFont("Helvetica","Italic",30);

         //Defaults
        // #include "J2M/functionJ2M.jsx"
         myPanel.grp.btnElement.onClick = addElements;
         myPanel.grp.myTab.myText.editName.onChanging = writter;
         myPanel.grp.myTab.myText.btnApply1.onClick = addLetter;

         myPanel.grp.myTab.wordFieldPanel.applyG.btnApply2.onClick = addWord;

         myPanel.grp.myTab.endBtn.hsquare.onClick = LinkToURL;
         myPanel.grp.myTab.endBtn.RenderBtn.onClick = openXport;

         myPanel.layout.layout(true);

         return myPanel;
   }

   createUI(this);
