var startQuiz = document.querySelector(".startQuiz");
var quizStartContainer = document.querySelector(".main");
var timerEl = document.querySelector("span");
var answerAlert = document.querySelector("#answerAlert");
var questionContainer = document.querySelector(".content");

var answer;
var listOfQuestions = [
  {
    question : "Inside which HTML element do we put the JavaScript?" ,
    choices : ["<js>", "<scripting>","<script>","<link>"],
    correctAns :"<script>",
  },
  {
    question : "How do you call a function named myFunction?" ,
    choices : ["callmyFunction();","Call myfunction myFunction();","myFunction;","myFunction();"],
    correctAns :"myFunction();",
  },
  {question : "How to write an IF statement in JavaScript?" ,
    choices : ["if i=5","if i=5 then","if(i===5)","if i ==5 then"],
    correctAns :"if(i===5)"
  }
  
];

var questionIndex = 0;

var answer;
var timeLeft = 30;
// console.log(liEl.dataset);

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if(timeLeft === 0 || questionIndex >= listOfQuestions.length) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      displayMessage();
    }

  }, 1000);
}

function handleClickOnContent(event) {
  event.preventDefault() ;

  
  if(event.target.matches("li")) {

    if(event.target.textContent === listOfQuestions[questionIndex].correctAns) {
      answerAlert.innerHTML = "Correct!";
      questionIndex= questionIndex + 1;
     
      showquestion(); 
     
      
    } else {
      // timeLeft = timeLeft - 10;
      answerAlert.textContent = " Not Correct!";
      console.log("Incorrect Answer");
      timeLeft = timeLeft-10;
      console.log(answer);
      questionIndex= questionIndex + 1;
      showquestion(); 
     
    
    }
  }
 
 
}

   
function showquestion() {
 
  
  questionContainer.textContent = "";
  if (questionIndex >= listOfQuestions.length) {
    alert("No more questions");
    
    return;
  }
 
 
    //create elements
    // answerAlert.textContent = "";
    var h2El = document.createElement("h2");
    h2El.setAttribute("style","color:black");
   
    
    //add text
    h2El.textContent =listOfQuestions[questionIndex].question;
    questionContainer.appendChild(h2El);

    //create ol
    var olEl = document.createElement("ol");
    olEl.setAttribute("style", "font-size:1rem;");
    h2El.appendChild(olEl);
    var answerChoice = listOfQuestions[questionIndex].choices;

    // iterate over choices
    // create li for each choices.element, add style, add text, append to ol
    
   
    for(var i=0 ; i<answerChoice.length;i++) {
      var liText = answerChoice[i];
      var liEl = document.createElement("li");
      liEl.setAttribute("style","margin:10px;background-color:rgb(49, 46, 46);padding:10px;color:#fff");
      liEl.setAttribute("class", "li");
      liEl.textContent = liText;
      olEl.appendChild(liEl);

// check for correct answer and if answer is correct then add li = 1
      if(liText === listOfQuestions[questionIndex].correctAns)  {
       liEl.dataset.li = 1;

      } else {
        liEl.dataset.li = 0;
       

      }
      

       }
}


function startGame() {
  quizStartContainer.setAttribute("style","display:none");
  questionContainer.removeAttribute("style","display:none");
   setTime();
  showquestion(); 


}

function displayMessage() {
  answerAlert.textContent = "";
  console.log("This function will display after the user completed the quiz");

  var divEl = document.createElement("div");
  divEl.textContent = "Score -" +timeLeft;
  var name = document.createElement("p");
  name.textContent = "Enter your initials  ";
  var inputBox = document.createElement("input");
  questionContainer.append(divEl);
  divEl.append(name);
  name.appendChild(inputBox);

  localStorage.setItem("initial" ,JSON.stringify(inputBox) );

  jsonCheck();


}


questionContainer.addEventListener("click",handleClickOnContent);


function jsonCheck() {
  var count = localStorage.getItem("initials");
  console.log(count);
}

startQuiz.addEventListener("click", function(event) {
  event.preventDefault();
  console.log("click on button is working");
 
   startGame();
   
  
});