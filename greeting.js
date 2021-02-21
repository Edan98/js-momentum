const form=document.querySelector(".js-user__form"),
input=form.querySelector("input"),
greeting=document.querySelector(".js-user__greeting");

const USER_LS="currentUser"
const SHOWING="showing";

function saveName(text){
    localStorage.setItem(USER_LS,text);
}

function paintGreeting(text){
    form.classList.remove(SHOWING);
    greeting.classList.add(SHOWING);
    greeting.innerText=`Hello ${text}!`;
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue=input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING);
    form.addEventListener("submit",handleSubmit);
}


function loadName(){
    const currentUser=localStorage.getItem(USER_LS);
    if(currentUser===null){
        askForName();
    }
    else{
        paintGreeting(currentUser);
    }
}


function init(){
    loadName();
}

init();