const questionContainer = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const resultContainer = document.getElementById("result");

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];

async function loadQuestions() {
    const response = await fetch("questions1_1.json");
    const questions = await response.json();
    return questions;
}

function renderQuestion(question) {
    questionContainer.textContent = question.text;
    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => {
            selectedAnswers.push({ 
                question: question.text, 
                correct: option === question.answer, 
                selected: option,
                correctAnswer: question.answer 
            });

            if (option === question.answer) score++;

            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                renderQuestion(questions[currentQuestionIndex]);
            } else {
                showResult();
            }
        };
        optionsContainer.appendChild(button);
    });

    // Scroll to top for smooth UX
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function showResult() {
    questionContainer.style.display = "none";
    optionsContainer.style.display = "none";
    resultContainer.style.display = "block";

    let resultHTML = `<h2>Your Score: ${score}/${questions.length}</h2><table><thead><tr><th>Question</th><th>Your Answer</th><th>Correct Answer</th></tr></thead><tbody>`;
    selectedAnswers.forEach((answer) => {
        const rowClass = answer.correct ? "correct" : "wrong";
        resultHTML += `<tr class="${rowClass}"><td>${answer.question}</td><td>${answer.selected}</td><td>${answer.correctAnswer}</td></tr>`;
    });
    resultHTML += "</tbody></table>";
    resultContainer.innerHTML = resultHTML;
}

let questions = [];

loadQuestions().then((data) => {
    questions = data;
    renderQuestion(questions[currentQuestionIndex]);
});
