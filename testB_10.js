let currentQuestionIndex = 0;
let score = 0;
let questions = [];

async function loadQuestions(subject, test) {
    try {
        const response = await fetch("questionsB_10.json");
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
        showResult();
    }
}

function checkAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const correctIndex = question.options.indexOf(question.answer);
    const options = document.getElementById("options").children;

    Array.from(options).forEach((btn, index) => {
        if (index === correctIndex) {
            btn.classList.add("correct");
        } else if (index === selectedIndex) {
            btn.classList.add("wrong");
        }
        btn.disabled = true;
    });

    if (selectedIndex === correctIndex) {
        score++;
    }

    currentQuestionIndex++;
    setTimeout(showQuestion, 1000);
}

function showResult() {
    document.getElementById("question").innerText = "Test Completed!";
    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `
        You scored <strong>${score}/${questions.length}</strong>.
        <table>
            <thead>
                <tr>
                    <th>Question</th>
                    <th>Your Answer</th>
                    <th>Correct Answer</th>
                </tr>
            </thead>
            <tbody>
                ${questions
                    .map((q, i) => {
                        const userCorrect =
                            q.options[q.options.indexOf(q.answer)] === q.answer;
                        return `<tr class="${
                            userCorrect ? "correct" : "wrong"
                        }">
                            <td>${q.question}</td>
                            <td>${q.options[q.options.indexOf(q.answer)]}</td>
                            <td>${q.answer}</td>
                        </tr>`;
                    })
                    .join("")}
            </tbody>
        </table>
    `;
}

const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get("subject");
const test = urlParams.get("test");
if (subject && test) {
    loadQuestions(subject, test);
} else {
    document.getElementById("question").innerText = "Select a valid test!";
}
