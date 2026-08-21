let userScore = 0;
let comScore = 0;

const choices = document.querySelectorAll(".choice");

const genCompChoice = () =>{
    const options = ["rock","paper","scissors"];
    const randIdx = Math.floor(Math.random()*3);
    return options[randIdx];
    // rock,paper,scissors

}

const drawGame = ()=>{
    console.log("game was draw.");
}

const playGame=(userChoice)=>{
    console.log("user choice = ",userChoice);
    // Generate Computer Choice
    const compChoice = genCompChoice();
    console.log("comp choice = ",compChoice);

    if(userChoice == compChoice){
        // Draw Game
        drawGame();
    }

}

choices.forEach((choice)=>{
    console.log(choice);
    choice.addEventListener("click",()=>{
        const userChoice= choice.getAttribute("id")
        playGame(userChoice);
    })
})

