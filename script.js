const questions = [
    {
        question: "Javascript is an _______ language? ",
        options: [
            "Object-Oriented",
            "Object-Based",
            "Assembly-language",
            "High-level"
        ],
        correctAnswer: 0

    },
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        options: [
            "var",
            "let",
            "Both A and B",
            "None of the above",
        ],
        correctAnswer: 2

    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript",
        options: [
            "GetElementById()",
            "GetElementsByClassName()",
            "Both A and B",
            "None of the above",
        ],
        correctAnswer: 2

    },
    {
        question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
        options: [
            "Throws an error",
            "Ignore the statements",
            "Give a warning",
            "None of the above",
        ],
        correctAnswer: 1

    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        options: [
            "Document.write()",
            "Console.log()",
            "Windows.write()",
            "None of the above",
        ],
        correctAnswer: 3

    },
    {
        question: "How can a datatype be declared to be a constant type?",
        options: [
            "const",
            "let",
            "var",
            "All of the above",
        ],
        correctAnswer: 0

    },
    {
        question: "What keyword is used to check whether a given property is valid or not?",
        options: [
            "in",
            "is in",
            "exists",
            "lies",
        ],
        correctAnswer: 0

    },
    // {
    //     question: "What is the use of the <noscript> tag in Javascript?",
    //     options: [
    //         "The contents are displayed by non JS-based browsers",
    //         "Clears all cookies and cache",
    //         "Both A and B",
    //         "None of the above",
    //     ],
    //     correctAnswer: 0

    // },
    {
        question: "When an operator’s value is NULL, the typeof returned by the unary operator is:",
        options: [
            "Boolean",
            "Undefined",
            "Object",
            "Interger",
        ],
        correctAnswer: 2

    },
    {
        question: "Which function is used to serialize an object into a JSON string in Javascript?",
        options: [
            "stringify()",
            "parse()",
            "convert()",
            "None of the above",
        ],
        correctAnswer: 0

    },
    {
        question: "Which of the following is not a Javascript framework?",
        options: [
            "Node",
            "Vue",
            "React",
            "Cassandra"
        ],
        correctAnswer: 3
    },
    {
        question: "Which of the following is not a Javascript framework?",
        options: [
            "Node",
            "Vue",
            "React",
            "Cassandra"
        ],
        correctAnswer: 3
    },

];
const time = document.querySelector('#time');
const startContainer = document.querySelector('#start-container');
const btn = document.querySelector('.btn1');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question');
const optionContainer = document.getElementById('option-container');
const proceed = document.querySelector('#proceed-btn');
const result = document.querySelector('#result');
const feedBack = document.querySelector('#feedback');
const modal = document.querySelector('#modal');
const modalContent = document.querySelector('.modal-content');
const scores = document.querySelector('#score');
const tryAgain = document.querySelector('#Try-Again');

let currentQuestion = 0;
let score = 0;
let remainingTime = 1800;
let timerInterval;

const timeDisplay = function () {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    time.textContent = `Remaining Time: ${String(minutes).padStart(
        2, "0"
    )}:${String(seconds).padStart(
        2, '0'
    )}`;
}

const startTimer = function () {
    timerInterval = setInterval(function () {
        if (remainingTime > 0) {
            remainingTime--;
            timeDisplay();
        } else{
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);

};

const endTimer = function () {
    clearInterval(timerInterval);
};

quizContainer.addEventListener('click,', (e) => {
    e.stopPropagation();
    e.preventDefault();

});

function startQuiz() {
    time.style.display = "block";
    quizContainer.style.display = "block";
    startContainer.style.display = "none";

};

btn.addEventListener('click', () => {
    startQuiz();
    startTimer();

});

quizContainer.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

});

function endQuiz() {
    endTimer();
    //Disable Buttons after time is up
    const buttons = document.querySelectorAll("#option-container button");
    buttons.forEach((button) => (button.disabled = true));

    //Show the result message
    alert("Time's Up")
    scores.style.display = "block";
    showResult();

};

function loadQuestion() {
    const currentQuestionData = questions[currentQuestion];

    questionContainer.textContent = `${currentQuestion + 1}. ${
      currentQuestionData.question
    }`;    

    optionContainer.innerHTML = "";
    currentQuestionData.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.addEventListener('click', () => {
        selectOption(index);
        document.getElementById("feedback").textContent = "";
        checkAnswer(index);
      });
        optionContainer.appendChild(button);
    });
};


function selectOption(selectedIndex) {
    // Remove the "selected" class from all buttons
    const buttons = document.querySelectorAll("#option-container button");
    buttons.forEach((button) => button.classList.remove("selected"));

    // Add the "selected" class to the clicked button
    buttons[selectedIndex].classList.add("selected");
    document.getElementById("proceed-btn").disabled = false;
};

function checkAnswer() {
    const selectedButton = document.querySelector(
        "#option-container button.selected"
    );
    const currentQuestionData = questions[currentQuestion];

    // if (!selectedButton) {
    //     feedBack.textContent = "Please select an option before proceeding.";
    //     return;
    // }
    feedBack.textContent = "";

    const selectedIndex = Array.from(
        selectedButton.parentElement.children
    ).indexOf(selectedButton);

    if (selectedIndex === currentQuestionData.correctAnswer) {
        result.innerHTML = "<span style='font-weight: bold; font-size: 1.5em;'>Correct!</span>";
        result.style.color = "green"
        questions.score++;
    } else if (selectedIndex !== -1) {
        result.innerHTML = `<span style = "font-weight: bold; font-size: 1.5em; color: red;">Incorrect! </span><span style='font-weight: bold; font-size: 1.2em;'> ${
         currentQuestionData.options[currentQuestionData.correctAnswer]
        }</span>`;
    };

    // Disable buttons after the user has selected an answer
    const buttons = document.querySelectorAll("#option-container button");
    buttons.forEach((button) => (button.disabled = true));

    //If the time is exhausted, end the Quiz
    if (remainingTime === 0) {
        endQuiz();
    }

};

function showFeedback() {
    const feedbackContainer = document.createElement("div");
    feedbackContainer.innerHTML = isCorrect ? "correct" : "inCorrect";
    feedbackContainer.appendChild(feedBack);
};

function nextQuestion() {
    result.textContent = "";
    feedBack.textContent = "";
    const buttons = document.querySelectorAll("#option-container button");
    buttons.forEach((button) => {
        button.classList.remove("selected");
        button.disabled = false;
    });

    proceed.disabled = true;

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        console.log("hello")
        scores.style.display = "block";
        showResult();
    };

};

function showResult() {
    endTimer();
    scores.textContent = `${score} out of ${questions.length}`;
    tryAgain.addEventListener("click", tryAgainClickEventHandler);

    // document.getElementById("modal").style.display = "block";
    tryAgain.addEventListener("click", tryAgainClickEventHandler);
    modal.style.display = "block";

    document.addEventListener("click", modalDisplay);

}
function modalDisplay(event) {
    // const scores = document.getElementById("score");
  
    // Check if the clicked element is outside the score section
    if (!scores.contains(event.target)) {
      // Reload the page
      location.reload();
    }
  
};
const tryAgainClickEventHandler = () => {
    //Clear the "Time's Up" message
    result.textContent = "";
    document.getElementById("modal").style.display = "none";
   

    scores.style.display = "none";
    quizContainer.style.display = "block";

    // Reset the quiz
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    remainingTime = 1800;
    timeDisplay();
    startTimer();

    document.removeEventListener("click", clickOutsideScoreSectionHandler);
};
loadQuestion();















