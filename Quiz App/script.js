const questions = [
  [
    "Which is the national language of India?", "Tamil", "French", "Tulu",
    "Hindi", "none", 4
  ],
  [
    "What is the capital of India?", "Shimla", "Banglore", "Delhi",
    "Kerala", "none", 3
  ],
  [
    "Which planet is known as the largest Planet?", "Earth", "Mars", "Jupiter",
    "Venus", "none", 3
  ],
  [
    "In which year did India got freedom?", "1940", "1944", "1945",
    "1947", "none", 4
  ],
  [
    "Who wrote 'Romeo and Juliet'?", "Charles Dickens", "William Shakespeare", "Jane Austen",
    "Mark Twain", "none", 2
  ],
  [
    "Which programming language is known for its use in web development?", "Java", "Python", "HTML",
    "C++", "none", 3
  ],
  [
    "What is the largest mammal on Earth?", "Elephant", "Blue Whale", "Giraffe",
    "Hippopotamus", "none", 2
  ],
  [
    "Which city is known as the Scotland of India?", "Goa", "South Korea", "Coorg",
    "Mandya", "none", 3
  ],
  [
    "In which year did World War II end?", "1945", "1939", "1950",
    "1942", "none", 1
  ],
  [
    "What is the capital of Karnataka?", "Shimoga", "Belgam", "Madhurai",
    "Banglore", "none", 4
  ], 
  // Add more questions here...
];

const levels = [10, 20, 30, 40, 50, 60, 70, 80, 90,100];
let points = 0;
let currentQuestion = 0;

const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const resultElement = document.getElementById('result');

function loadQuestion() {
  const question = questions[currentQuestion];
  questionElement.innerHTML = `<strong>Question for ${levels[currentQuestion]} point </strong><br>${question[0]}`;
  
  optionsContainer.innerHTML = '';
  for (let i = 1; i <= 4; i++) {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option';
    optionDiv.textContent = question[i];
    optionDiv.addEventListener('click', () => checkAnswer(i));
    optionsContainer.appendChild(optionDiv);
  }
}

function checkAnswer(selectedOption) {
  const question = questions[currentQuestion];
  const correctOption = question[6];

  if (selectedOption === correctOption) {
    points = levels[currentQuestion];
    resultElement.textContent = "Correct answer! You got " + points + " points";
  } else {
    resultElement.textContent = "Wrong answer! Reloading from the beginning.";
    setTimeout(() => {
      resultElement.textContent = '';
      resetQuiz();
    }, 2000);
    return;
  }

  currentQuestion++;
  
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    resultElement.textContent += " | You won ....! ";
  }
}

function resetQuiz() {
  currentQuestion = 0;
  points = 0;
  loadQuestion();
}

loadQuestion();