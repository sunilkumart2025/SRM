let currentQuestionIndex = 0;
let questions = [];
let score = 0;

async function loadQuestions(subject, test) {
    const response = await fetch("questions1_1.json");
    const data = await response.json();
    questions = data.tests[subject][test];
    document.getElementById("subject-title").innerText = `${subject} - ${test}`;
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        const container = document.getElementById("question-container");
        container.innerHTML = `
            <h2>${question.question}</h2>
            ${question.options.map((opt, i) =>
                `<button onclick="checkAnswer('${opt}')">${opt}</button>`
            ).join("")}
        `;
    } else {
        document.getElementById("question-container").innerHTML = `<h2>Test Completed!</h2>`;
        document.getElementById("score-container").innerText = `Your Score: ${score}/${questions.length}`;
    }
}

function checkAnswer(selectedOption) {
    const correct = questions[currentQuestionIndex].answer;
    if (selectedOption === correct) {
        score++;
    }
    currentQuestionIndex++;
    displayQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get("subject");
    const test = urlParams.get("test");
    if (subject && test) {
        loadQuestions(subject, test);
    } else {
        document.getElementById("question-container").innerHTML = "<h2>Select a valid test!</h2>";
    }
});
