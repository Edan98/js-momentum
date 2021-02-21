const body=document.querySelector("body");

function paintImage(num){
    const image=new Image();
    image.src=`src/${num+1}.jpg`;
    image.classList.add("bgImg");
    body.appendChild(image);
}

function genRanNum(){
    const number=Math.floor(Math.random()*3);
    return number;
}

function init(){
    const random=genRanNum();
    paintImage(random);
}

init();