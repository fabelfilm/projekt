var imgs = undefined;
var imgposs = [];
var imgzs = [];
var parallaxInterval;
var scrolly;
var scrolling = false;
var winh = window.innerHeight, winh2 = window.innerHeight/2;
window.onload = function(){
window.onscroll=function(){if (!scrolling) initParallax();};
}
function initParallax(){
    winh = window.innerHeight;
    winh2 = window.innerHeight/2;
    if (imgs==undefined) {imgs=document.querySelectorAll("img, p, li");
        for (var i =0; i<imgs.length; i++) imgposs.push(getY(imgs[i])+imgs[i].clientHeight/2);
        for (var i =0; i<imgs.length; i++) {
            if (imgs[i].tagName=="IMG")
                imgzs.push((0-(imgs[i].width*imgs[i].height)/200000*800/winh));
            else imgzs.push((0-1)/4/winh*800);
        }
        console.log("IMGZS: "+imgzs.join("———"))
        console.log("IMGPOSS: "+imgposs.join(" ——— "))
    }
    parallaxInterval= setInterval(doParallax, 50);
    scrolling=true;
}

function doParallax(){
    if (scrolly!=window.pageYOffset) scrolly=window.pageYOffset+winh2; else {clearInterval(parallaxInterval); scrolling = false;}
    for (var i =0; i<imgs.length; i++) {
        var ydiff = scrolly-imgposs[i];
        if (Math.abs(ydiff)*1.9<winh &&Math.abs(ydiff)>100) imgs[i].style.transform="translate(0px, "+(ydiff*ydiff*ydiff/200000*imgzs[i])+"px)";
        //else  imgs[i].style.transform="translate(0px, 0px)";
     }
}






function getY(element) {
    var yPosition = 0;
    while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return yPosition;
}