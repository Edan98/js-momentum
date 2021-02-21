const toDoForm=document.querySelector(".js-toDo__form"),
toDoInput=toDoForm.querySelector("input"),
toDoList=document.querySelector(".js-toDo__list");

const TODOS_LS="toDos";
let toDos=[];

function saveToDo(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function deleteToDo(event){
    const btn=event.target;
    const btn2=btn.parentNode;
    const li=btn2.parentNode;
    toDoList.removeChild(li);
    const cleanToDos=toDos.filter(function(toDo){
        return toDo.id!==parseInt(li.id);
    });
    toDos=cleanToDos;
    saveToDo();
}

function paintToDo(text){
    const li=document.createElement("li");
    const delBtn=document.createElement("button");
    const span=document.createElement("span");
    const newId=toDos.length+1;
    delBtn.addEventListener("click",deleteToDo);
    delBtn.innerHTML="<i class='fas fa-minus-circle fa-3x'></i>";
    span.innerText=text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id=newId;
    toDoList.appendChild(li);
    const toDoObj={
        text:text,
        id:newId
    }
    toDos.push(toDoObj);
    saveToDo();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue=toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value=""
}

function loadToDo(){
    const loadedToDo=localStorage.getItem(TODOS_LS);
    if(loadedToDo!==null){
        const parsedToDo=JSON.parse(loadedToDo);
        parsedToDo.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDo();
    toDoForm.addEventListener("submit",handleSubmit);
}
init();