const questions = [
  {
    question: "What does CPU stand for?",
    options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Core Processing Unit"],
    answer: 1
  },
  {
    question: "Which language is used for web styling?",
    options: ["HTML", "JavaScript", "CSS", "Python"],
    answer: 2
  },
  {
    question: "What does RAM stand for?",
    options: ["Read Access Memory", "Random Access Memory", "Run Access Memory", "Random Array Memory"],
    answer: 1
  },
  {
    question: "Which of these is a programming language?",
    options: ["HTTP", "HTML", "Python", "CSS"],
    answer: 2
  },
  {
    question: "What does 'www' stand for?",
    options: ["World Wide Web", "World Web Wide", "Wide World Web", "Web World Wide"],
    answer: 0
  },
  {
    question: "Which data structure works on LIFO principle?",
    options: ["Queue", "Array", "Stack", "Linked List"],
    answer: 2
  },
  {
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Query Language", "Strong Query Logic", "System Query Language"],
    answer: 0
  },
  {
    question: "Which symbol is used for single line comment in Python?",
    options: ["//", "/*", "#", "--"],
    answer: 2
  },
  {
    question: "What is the full form of OOP?",
    options: ["Object Oriented Programming", "Object Origin Programming", "Oriented Object Process", "Open Object Programming"],
    answer: 0
  },
  {
    question: "Which of these is NOT an operating system?",
    options: ["Linux", "Windows", "Oracle", "macOS"],
    answer: 2
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
  answered = false;
  let q = questions[currentQuestion];

  document.getElementById("question-text").innerText =
    (currentQuestion + 1) + ". " + q.question;

  document.getElementById("progress").innerText =
    "Question " + (currentQuestion + 1) + " of " + questions.length;

  let percent = ((currentQuestion) / questions.length) * 100;
  document.getElementById("progress-bar").style.width = percent + "%";

  let optionsBox = document.getElementById("options-box");
  optionsBox.innerHTML = "";

  q.options.forEach(function(option, index) {
    let btn = document.createElement("button");
    btn.innerText = option;
    btn.className = "option-btn";
    btn.onclick = function() { checkAnswer(index, btn); };
    optionsBox.appendChild(btn);
  });

  document.getElementById("score-box").innerText = "";
}

function checkAnswer(selected, btn) {
  if (answered) return;
  answered = true;

  let correct = questions[currentQuestion].answer;
  let allBtns = document.querySelectorAll(".option-btn");

  allBtns.forEach(function(b, i) {
    if (i === correct) {
      b.style.background = "#2ecc71";
      b.style.color = "white";
      b.style.borderColor = "#2ecc71";
    } else {
      b.style.background = "#e74c3c";
      b.style.color = "white";
      b.style.borderColor = "#e74c3c";
    }
  });

  if (selected === correct) {
    score++;
    document.getElementById("score-box").innerText = "✅ Correct!";
  } else {
    document.getElementById("score-box").innerText = "❌ Wrong!";
  }
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    let percent = Math.round((score / questions.length) * 100);
    document.getElementById("quiz-container").innerHTML =
      `<h1>Quiz Complete! 🎉</h1>
       <p style="font-size:20px; margin-top:20px; color:#555;">Your Score</p>
       <p style="font-size:48px; font-weight:bold; color:#302b63; margin:10px 0;">
         ${score}/${questions.length}
       </p>
       <p style="font-size:18px; color:#777;">${percent}% Correct</p>
       <button onclick="location.reload()"
         style="margin-top:30px; padding:14px 36px;
         background:linear-gradient(to right,#302b63,#24243e);
         color:white; border:none; border-radius:10px;
         font-size:16px; cursor:pointer;">
         Play Again 🔄
       </button>`;
  }
}

loadQuestion();