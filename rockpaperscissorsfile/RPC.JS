let userScore = 0;
let compScore = 0;


const choices= document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = ()  => {
    const options = ["rock","paper","scissor"];
    const randIdx = Math.floor(Math.random()*3);
    return options[randIdx];
}

const drawgame = () => {
   
    msg.innerText = "Game was draw!!.Play Again?? ";
    msg.style.backgroundColor = "#05464C";

};

const showWinner = (userWin,userChoice,compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
      
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";

    } else {
        compScore++;
        compScorePara.innerText = compScore;
     
        msg.innerText = `You lose! Your ${compChoice} beats your ${userChoice}`;
        // msg.innerText = "You lose!";
        msg.style.backgroundColor = "red";
    }
};

const playGame = (userChoice) => {
   console.log("user choice =",userChoice);
   //Generate computer choice
   const compChoice = genCompChoice();
   console.log("comp choice =",compChoice);

   if (userChoice === compChoice) {
    //Draw game//
    drawgame();
   } else{
    let userWin = true;
    if (userChoice === "rock") {
        //scissor,paper//
      userWin = compChoice === "paper" ? false: true;
    } else if (userChoice === "paper") {
        //Scissor,rock//
        userWin = compChoice === "scissor" ? false : true;
    } else{
        //rock,paper//
        userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin,userChoice,compChoice);
   }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
       playGame(userChoice);
    });
});