let currentQuestionIndex = 0;
let questions = [];

async function loadQuestions(subject, test) {
    try {
        const response = await fetch("questions1_1.json");
        const data = await response.json();
        if (data[subject] && data[subject][test]) {
            questions = data[subject][test];
            showQuestion();
        } else {
            document.getElementById("question").innerText = "Test not found!";
        }
    } catch (error) {
        document.getElementById("question").innerText = "Failed to load questions!";
        console.error(error);
    }
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        document.getElementById("question").innerText = question.question;
        const options = document.getElementById("options");
        options.innerHTML = "";
        question.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.innerText = option;
            button.onclick = () => checkAnswer(index);
            options.appendChild(button);
        });
    } else {
        const totalScore = questions.length;
        const message = `Test completed! You scored ${totalScore} out of ${questions.length}.`;
        document.getElementById("question").innerText = message;
        document.getElementById("options").innerHTML = "";
    }
}

function checkAnswer(selectedIndex) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const selectedOption = questions[currentQuestionIndex].options[selectedIndex];
    if (selectedOption === correctAnswer) {
        alert("Correct!");
    } else {
        alert("Wrong!");
    }
    currentQuestionIndex++;
    showQuestion();
}

const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get("subject");
const test = urlParams.get("test");
if (subject && test) {
    loadQuestions(subject, test);
} else {
    document.getElementById("question").innerText = "Select a valid test!";
}
