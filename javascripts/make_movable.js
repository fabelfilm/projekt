document.addEventListener( "DOMContentLoaded", create_movability, false );
var movables = [];
var selecteds = [];
var cli;
var help;
var keysDown = [];
var shortcuts = [];
var step=1;
var charkeys = {"h":72, "v":86, "0":48, "1":49, "2":50, "3":51, "4":52, "5":53, "6":54, "7":55, "8":56, "9":57, "j":74,"k":75}
function create_movability () {
    cli = document.createElement("INPUT");
    help = document.createElement("P");
    document.getElementsByTagName("BODY")[0].appendChild(cli);
    document.getElementsByTagName("BODY")[0].appendChild(help);
    cli.addEventListener( "keydown", regKey, false )
    cli.addEventListener( "keyup", unregKey, false )
    cli.setAttribute("style","border:none;position:fixed;top:0;left:0;bottom:0;background:black;color:yellow;width:100%;z-index:22;");
    help.setAttribute("style","position:fixed;top:0px;left:0;bottom:0;background:rgba(0,0,0,.7);color:yellow;width:100%;z-index:21;height:4em;min-height:0px;");
    /*var initialtext = document.createTextNode("flupsijs");
    help.appendChild(initialtext);*/
    help.innerHTML="";
    cli.focus();
    movables = document.getElementsByClassName('movable');
    var pages = document.getElementsByClassName('page');
    movables = [].slice.call(movables).concat( [].slice.call(pages));
        var i;
        for (i=0; i<movables.length; i++) {
          movable = movables[i];
          movable.addEventListener("click", selectItem, false);
    }
    resetShortcuts();
}
function resetShortcuts(){
    shortcuts = [];
    s("h", function() {
        s("j", moveLeft);
        s("k", moveRight);
    });
    s("v", function() {
        s("j", moveUp);
        s("k", moveDown);
    });
    s("s", function() {
        s("u", update);
    });
    s("1", to1);
    s("2", mul2);
    s("3", div2);
    s("5", mul5);
    s("6", mul10);
    step=1;
    //activate currently-pressed keys:
    for (var i=0; i<keysDown.length;i++)
        evaluateKey(keysDown[i]);
}
function to1(){step=1;}
function mul2(){step*=2;}
function div2(){step/=2;}
function mul5(){step*=5;}
function mul10(){step*=10;}

function s(key, fu) {
    addShortcut(charkeys[key],fu);
}
function moveUp(){
        for (var i=0; i<selecteds.length;i++){
            var s=selecteds[i];
            s.style.top=(parseInt(s.style.top.match(/\d+/)[0])-step)+"mm";
         }
    }
function moveDown(){
        for (var i=0; i<selecteds.length;i++){
            var s=selecteds[i];
            s.style.top=(parseFloat(s.style.top.match(/\d+/)[0])+step)+"mm"; //!!!Negateive Zahlen!
         }
    }
function moveRight(){
        for (var i=0; i<selecteds.length;i++){
            var s=selecteds[i];
            s.style.left=(parseInt(s.style.left.match(/\d+/)[0])+step)+"mm";
         }
    }
function moveLeft(){
        for (var i=0; i<selecteds.length;i++){
            var s=selecteds[i];
            s.style.left=(parseInt(s.style.left.match(/\d+/)[0])-step)+"mm";
         }
    }
function addShortcut(key, fu){
    if (!shortcuts[key]) shortcuts[key]=[fu]; else
    if (shortcuts[key].indexOf(fu) == -1) {
        shortcuts[key].push(fu);
        help.innerHTML+=""+key+"→"+"";
    }
}
function removeShortcut(key, fu){
    if (shortcuts[key].indexOf(fu) != -1) shortcuts[key].remove(fu);
}
function updateCLI(){
    cli.value=keysDown.join("·")+" ← ";
}
function regKey (e){
    var keyCode = ('which' in e) ? e.which : e.keyCode;
    if (keysDown.indexOf(keyCode) == -1) keysDown.push(keyCode); else return;
    updateCLI();
    //are there shortcuts?
    evaluateKey(keyCode);
}
function evaluateKey(keyCode){
    if(shortcuts[keyCode]&&shortcuts[keyCode].length>0)
        for (var i=0; i<shortcuts[keyCode].length; i++)
            shortcuts[keyCode][i].call();
}
function unregKey (e){
            var keyCode = ('which' in e) ? e.which : e.keyCode;
            keysDown.remove(keyCode);
            /**/
            updateCLI();
            //go to first position and do all shortcuts
            resetShortcuts();
}
function selectItem(e) {
    var t = e.target;
    for (var i=0; i<selecteds.length; i++) {
        selecteds[i].setAttribute("data-selected", false);
    }
    selecteds=[t];
    t.setAttribute("data-selected", true);
    cli.focus();
}