var timer = document.getElementById("timer");
var question = document.getElementById("question");
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");
var option4 = document.getElementById("option4");
var startBtn = document.getElementById("startBtn");
var resetBtn = document.getElementById("resetBtn");
var scoreBoard = document.getElementById("score");
var questionBox = document.getElementById("questionBox");
var buttonBox = document.getElementById("buttonBox");
var leaderBoard = document.getElementById("highScores");
var scoreBtn = document.getElementById("scoreBtn");
var submitForm = document.getElementById("submitScore");


timer.innerText = 100;
var quizNum  =  0;
var numOfQuestions = questions.length;
var score = 0;
var interval;
var timeRemaining = 100;

var setUpQuestion = () => {
  question.innerText = questions[quizNum].question;
  option1.innerText = questions[quizNum].option1;
  option2.innerText = questions[quizNum].option2;
  option3.innerText = questions[quizNum].option3;
  option4.innerText = questions[quizNum].option4;
}

// Displays the scoreboard
var submitScore = () => {
  questionBox.style.display = "none";
  submitForm.style.display = "flex";
  leaderBoard.style.display = "flex";
  generateLeaderBoard();
}
// resets settings to default
var resetQuiz = () => {
  timeRemaining = 100;
  buttonBox.style.display= "none";
  questionBox.style.display = "flex";
  timer.style.color = "black";
  timer.innerText = `:${timeRemaining}`;
  quizNum  =  0;
  score = 0;
  setUpQuestion();
  scoreBoard.innerText = `${score}`;
  clearInterval(interval)
  interval = setInterval(()=> {
    if(timeRemaining > 0){
      timeRemaining -= 1;
      timer.innerText = `:${timeRemaining}`;
      if(timeRemaining < 15) 
        timer.style.color = "red";
    }
    else {
      clearInterval(interval);
      submitScore();
    }
  },1000)
}
// Starts quiz when user clicks the start button
startBtn.addEventListener("click",resetQuiz);
// Resets quiz when user click the reset button
resetBtn.addEventListener("click",resetQuiz);
// checks user input selection with correct answer, -5 seconds when wrong 
var answerCheck = (value) => {
  if(quizNum >= numOfQuestions)  {
    console.log(`Score: ${score}`);
    return;
  }
  if(questions[quizNum].answer !=  value) {
    if(timeRemaining >  5)
      timeRemaining -=  5;
    else {
      timeRemaining = 0;
      submitScore();
    }
    timer.innerText = `:${timeRemaining}`;
  } else {
    score += timeRemaining;
    scoreBoard.innerText = `${score}`;
  }
  quizNum += 1;
  
  if(quizNum < numOfQuestions) setUpQuestion();
  else submitScore();
}

var player = document.getElementById("name");
var scoreList = document.getElementById("scoreList");

document.getElementById("submitForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if(player.value) {
    var rec = [player.value,score];
    localStorage[localStorage.length] = JSON.stringify(rec);
    generateLeaderBoard();
    submitForm.style.display = "none";
  }
})