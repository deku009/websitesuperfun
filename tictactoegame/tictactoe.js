let boxes= document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turnO=true;

const winPatterns =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    enabledBoxes();
    msgContainer.classList.add("hide");
    msg.innerText = "";
};
let count = 0;
boxes.forEach((box)=>{
   box.addEventListener("click",()=>{
      console.log("box as clicked")
    count++;
    //   console.log(count);
    if (turnO) {//playerO
        box.innerText ="O";
        turnO= false;
        
    } else {//playerX
         box.innerText ="X";
          turnO= true;
    }
    box.disabled = true;
    checkWinner();
   });
});
console.log(count);
const disabledBoxes =()=>{
    for (let box of boxes) {
        box.disabled =true;
    }
};

const enabledBoxes =()=>{
    for (let box of boxes) {
        box.disabled =false;
        box.innerText = "";
    }
};
const showWinner = (Winner) =>{
    msg.innerText = `CONGRATULATIONS!!, WINNER  is ${Winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};
const checkWinner = () => {
    for(let patterns of winPatterns){
       let posVal1 = boxes[patterns[0]].innerText;
       let posVal2 = boxes[patterns[1]].innerText;
       let posVal3 = boxes[patterns[2]].innerText;
         
    if (posVal1 != "" && posVal2 != "" && posVal3 != "" ) {
        if (posVal1 === posVal2 && posVal2 === posVal3) {
           
            showWinner(posVal1);
        }
    }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

