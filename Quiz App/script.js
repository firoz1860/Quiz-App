const questions = [
    {
        question: " The nucleus of an atom consists of",
        answers: [
            {text:"electrons and neutrons", correct:false},
            {text:"electrons and neutrons", correct: false},
            {text:"protons and neutrons", correct: true},
            {text:"All of the above", correct: false},
            
        ]
    },
    {
        question: " The number of moles of solute present in 1 kg of a solvent is called its",
        answers: [
            {text:"molality", correct:true},
            {text:"molarity", correct: false},
            {text:"normality", correct: false},
            {text:"formality", correct: false},
            
        ]
    },
    {
        question: "The most electronegative element among the following is",
        answers: [
            {text:"sodium", correct:false},
            {text:"bromine", correct: false},
            {text:"florine", correct: true},
            {text:"formality", correct: false},
            
        ] 
    },
    {
        question: "The metal used to recover copper from a solution of copper sulphate is",
        answers: [
            {text:"Na", correct:false},
            {text:"Ag", correct: false},
            {text:"Hg", correct: false},
            {text:"Fe", correct: true},
            
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.append(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");

    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();