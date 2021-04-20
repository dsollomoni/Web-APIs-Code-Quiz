let timer = document.getElementById("timer");
import {testQuestions} from "./questions.js";
timer.innerText = 100;

setInterval(()=> {
  timer.innerText = timer.innerText - 1;
},1000);


let question = document.getElementById("question");
question.innerText = testQuestions[0].question;