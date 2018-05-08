
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
var lgn=0 ;


//var fold;
///////////////////////////////////////////
function writter(){
  var nomText="";
  nomText =this.text.toLowerCase();
  nomInvite = trim(nomText);
  numNom = nomInvite.split(' ');
}
proj.numItems==0? proj.items.addFolder("J2M") : false;

#include "J2M/functionJ2M.jsx"
//--------------------------
//  VAR FOLDER /////////////////////
var j2mF = findFolder("J2M",this)
var CompF = findFolder("Comp",this, j2mF)
var FootageF = findFolder("Footage",this, j2mF)
var LetterF = findFolder("Letter",this, j2mF)
var ClonerF = findFolder("_cloner",this, LetterF)
//
// ////////////////////////////////
//
// /// VAR COMPO //////////////////////////
var COMP = findComp("COMP",this,true,"",CompF);
var LetterComp = findComp("Letter",this,true,"",ClonerF);
var ClonerComp = findComp("0cloner",this,true,"",ClonerF);

//alert(COMP);
/// ADD BG /////////////////////////////////
var psd = new ImportOptions(File("./J2M/img/BG.psd"));
var bgPic;
bgimport();

COMP.openInViewer();
// ADD ELEMENT ////////////////////
addElement(LetterComp);
addElement(ClonerComp);



///////////////////////////////////////////////

// / ADD LETTER FUNCTION /////////////////////////////
function addLetter(){

  if(nomInvite != undefined){

    var count;
    lgne()

    var h =0;
    var x=0;

  //  mrah oua nn marimarialoinaloin aloin marialoin
    while (h<lgn){
      var l=1;
      for (var y=0; y<numNom.length; y++){

        y<numNom.length-1 && y>0 ? count = 1 : count =0;
        if (numNom[y].length > nomLimit-(x-1)) {
          x=0;
          h++
        }
        for (var i= 0; i<numNom[y].length; i++){

          if (numNom.length>0 && x == numNom[y].length ){
            if (numNom[y+count].length > nomLimit-x && lgn>1) {
              h++;
            }
          }
          if (numNom[y].length == i && y<numNom.length){
              i=0;
              l++;
          }
             var posX = Pos+((letterWidth+lspaceW)*x);
             var posY = Pos+((letterHeight+lspaceH)*h);

             if(x == nomLimit && numNom[y].length< nomLimit-x && numNom.indexOf(numNom[y]>0) ){
                  x= 0;
                  h++;
              }else if(numNom.length>0 && numNom[y+count].length > nomLimit-x ){
                    if (i == numNom[y].length ) {
                      x=0;
                      h++;
                    }
                }
                letter =findComp(numNom[y][i],this, true, ClonerComp, LetterF);
                var letterX = COMP.layers.add(letter);
                var offTime = 0.12*l
                letterX.transform.opacity.expression = "linear(time,"+offTime+","+offTime+"+0.12,0,100);";
                letterX.startTime = offTime;
                letterX.transform.scale.setValue([sclPercent,sclPercent]);
                letterX.transform.position.setValue([posX,posY]);
                /// SPACE BETWEEN WORD ///////////////
                if (numNom[y].length-1 == i && y<numNom.length-1){
                  x++;
                };//--------------------------------
          //} // END ELSE
          x++;
          l++;
        }// END FOR
        if (x==nomInvite.length && nomInvite.length<= nomLimit){
          h++
        }
        l=l;
      }// END FOR
      if (x == numNom[numNom.length-1].length-1){
        break;
      }// break WHILE
    } // END WHILE
    //alert(h)
    nomInvite="";
  }else{

      var dlog = new Window("palette");
      dlog.size = [320,100];
      dlog.add("statictext", undefined , "We are closing in 2 seconds.");
      dlog.show();
    // Have a nap:
      $.sleep(3000);
    // Closing the dialog:
      dlog.close();
    //return false;
  }
  COMP.openInViewer();
} // END ADDLETTER FUNCTION

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

///  ADD WORD ///////////////////////////////
function addWord(){

lgne();
  var nullControl = elementComp(COMP,"null","Control");
  nullControl.transform.position.setValue([0,0]);

  var offsetWord = addControler(this, nullControl,"Décalage Mots", "Slider",20 );
  var offsetLetter = addControler(this, nullControl,"Décalage Lettres", "Slider",100 );
  var  offsetAnim = addControler(this, nullControl,"Décalage Animation", "Slider",50 );

  if (nomInvite.length <= nomLimit ) {
    lgn--;
  }

  var u;
  for (var i = 1; i <= words.length; i++) {
    lgn++

    for (var j = 0; j < words[i-1].length; j++) {

      for (var k = COMP.layers.length; k >= 1; k--) {

        u = (( (11/25)+(offsetWord/10) )*(i-1))+(0.04*(j*( j /5)));
        var posX = Pos+((letterWidth+lspaceW)*j);
        var posY = Pos+((letterHeight+lspaceH)*lgn);

        var codePosX =
        "var inc1="+i+";\
        var inc2 ="+j+";\
        "

        if (COMP.layer(k).name.length ==1 && COMP.layer(k).name == words[i-1][j]) {

          var layr = COMP.layer(k);
          layr.motionBlur = true;
          layr.property("Position").dimensionsSeparated = true;
          var initPosx = layr.transform.xPosition.value;
          var initPosy = layr.transform.yPosition.value;
          layr.transform.xPosition.expression = "ease(time,5+"+u+",6+"+u+","+initPosx+","+posX+");";
          layr.transform.yPosition.expression = "ease(time,5+"+u+",6+"+u+","+initPosy+","+posY+");";
          layr.name = layr.name+"-exp"
          layr.setParentWithJump(nullControl);
          break;
        }else{
          continue;
        }
      }
    }
    //h++
  }

}

//////////// UI FUNCTION ////////////////////////////////////////////////////////

function createUI(thisObj){

         var myPanel =  thisObj;
         res = "group{orientation:'column', alignment:['fill','fill'],alignChildren:['center','top'],\
                    picL: IconButton{type:'image',bounds:{x:10, y:10, width:360, height:72}},\
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
             maingroup.remove(this.parent);
             myPanel.layout.layout(true);
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
         myPanel.grp.myTab.myText.editName.onChanging = writter;
         myPanel.grp.myTab.myText.btnApply1.onClick = addLetter;

         myPanel.grp.myTab.wordFieldPanel.applyG.btnApply2.onClick = addWord;

         myPanel.grp.myTab.endBtn.hsquare.onClick = LinkToURL;
         myPanel.grp.myTab.endBtn.RenderBtn.onClick = openXport;

         myPanel.layout.layout(true);

         return myPanel;
   }

   createUI(this);
