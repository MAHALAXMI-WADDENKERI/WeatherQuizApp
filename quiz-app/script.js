const quiz = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Rome"], answer: "Paris" },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Dickens", "Hemingway", "Tolstoy"], answer: "Shakespeare" }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    document.getElementById('result').innerText = '';
    const q = quiz[currentQuestion];
    document.getElementById('question').innerText = q.question;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    q.options.forEach(option => {
        optionsDiv.innerHTML += `<button class='option' onclick='checkAnswer("${option}")'>${option}</button>`;
    });
}

function checkAnswer(answer) {
    if (answer === quiz[currentQuestion].answer) {
        score++;
        document.getElementById('result').innerText = 'Correct!';
    } else {
        document.getElementById('result').innerText = 'Wrong!';
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quiz.length) {
        loadQuestion();
    } else {
        document.getElementById('question').innerText = 'Quiz Completed!';
        document.getElementById('options').innerHTML = '';
        document.getElementById('result').innerText = `Your Score: ${score}/${quiz.length}`;
    }
}

loadQuestion();
