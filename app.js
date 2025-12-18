let start = false;
let level = 0;
let gameseq = [];
let userseq = [];

let high_score = [];

let h3 = document.querySelector("h3");

let btns = ["red" ,"green" , "blue", "yellow"];


document.addEventListener("keypress",function () {
    if(start == false){
        console.log("Game is started !")
        start = true;

        levelup();
    }  
      
});


function game_flash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash")
    }, 500);
}

function user_flash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash")
    }, 500);
}

function levelup(){
    userseq = [];
    level++;
    h3.innerText = `level ${level}`;

    let rand_idx = Math.floor(Math.random() * 3);
    let rand_color = btns[rand_idx];
    let rand_btn = document.querySelector("."+rand_color);
    

    gameseq.push(rand_color);
    console.log("game seq :"+gameseq);

    game_flash(rand_btn);
}

function checkAns(idx){
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelup, 1000);
            console.log("level up!")
        }
    }else{
        let max = -1;
        high_score.push(level);
        for(high of high_score){
            if(max < high){
                max = high;
            }  
        }


        h3.innerHTML = `Game Over ! Your Score is <b> ${level} </b> <br>Press any key to start again <br> Your highest Score is ${max}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function (){
            document.querySelector("body").style.backgroundColor = "white";
        } , 150);
        reset();
    }
}

function btn_press() {
    let btn = this;
    // console.log(btn); 
    user_flash(btn);

    let user_color = btn.getAttribute("id");
    userseq.push(user_color);
    console.log("user seq :"+userseq);

    checkAns(userseq.length-1);
}

let allbtns = document.querySelectorAll(".btn");

for (btn of allbtns) {
    btn.addEventListener("click", btn_press);
}

function reset(){
    start = false;
    gameseq = [];
    userseq = [];
    level = 0;
}