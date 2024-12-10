alert("Instructions:\n1. Observe the sequence of flashing colors.\n2. Click the colors in the same order as they flashed.");


let gameSeq=[]; 
let userSeq=[];  
let btns=["red", "green", "blue", "yellow",];

let started=false;
let level=0;

let highestscore=0;

let h3=document.querySelector('h3');

//---------------------------------------------------------------

document.addEventListener("click", startGame);
document.addEventListener("touchstart", startGame);

function startGame() {
    if (!started) {
        console.log("Game Is Started");
        started = true;
        levelUp();
    }
}
//----------------------------------------------------------------

document.addEventListener("keypress", function(){
if (started==false) {
    console.log("Game Is Started");
    started=true;
    levelUp();
}
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");  
    }, 1000);
}
function levelUp(){
    userSeq=[];  
    level++;
    h3.innerText = `Level ${level}`;

    let ranIndex=Math.floor(Math.random()*3);
    let randmColor=btns[ranIndex];
    let randmbtn=document.querySelector(`.${randmColor}`);
    gameSeq.push(randmColor);
     btnFlash(randmbtn);

}

function checkAns(idx) {
    if(userSeq[idx]===gameSeq[idx]){
       
        if(userSeq.length==gameSeq.length){ 

            setTimeout(levelUp, 1000); 
        }
    }else{
        h3.innerHTML =`Game Over ! Your Score was <b>${level}</b> <br>Press Any key To Start Game Again`; 
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },500)

        if (level > highestscore) {
            highestscore = level;
            let b = document.querySelector('#score');
            b.innerHTML = `<b>Highest score: ${highestscore}</b>`;
        }
        reset();
        
    }
}

if(highestscore<level){
    highestscore=level;
    let b=document.querySelector('#score');
    b.innerText=`Higest score: ${highestscore}`;
 }
function btnPress(){
    let btn=this;
    btnFlash(btn);

    userColor=btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns)
{
    btn.addEventListener("click",btnPress);
}
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
