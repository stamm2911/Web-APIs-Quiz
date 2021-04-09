var intro = document.getElementById("intro");
var qtn = document.getElementById("questions");
var startbtn = document.getElementById("intro-start-btn");
var secBfrStrt = document.getElementById("sec-bfr-strt");
var qtnForm = document.getElementById("questions-form");
var question = document.getElementById("questions-holder");
var done = document.getElementById("done");
var globalTimeTag = document.getElementById("global-time");
var nameInput = document.getElementById("name-input");
var nameInputBtn = document.getElementById("name-input-btn");
var highScore = document.getElementById("highscores");
var goBackBtn = document.getElementById("go-back-btn");
var clearScore = document.getElementById("clear-score");
var globalQstNum = 0;
var globalScore = 0;
var globalTime = 60;
var myScores = [];
var sortedArray = [];
var QnAPool = [
  (Question1 = {
    Question: "Current UFC strawweight champion?",
    a: "Weili Zhang",
    b: "Amanda Nunes",
    c: "Valentina Shevchenko",
    d: "Ronda Rousey",
    correctAnsw: "Weili Zhang",
  }),
  (Question2 = {
    Question: "Current UFC flyweight women champion?",
    a: "Valentina Shevchenko",
    b: "Joanna Jędrzejczyk",
    c: "Rose Namajunas",
    d: "Carla Esparza",
    correctAnsw: "Valentina Shevchenko",
  }),
  (Question3 = {
    Question: "Current UFC Bantamweight women champion?",
    a: "Amanda Nunes",
    b: "Valentina Shevchenko",
    c: "Miesha Tate",
    d: "Holly Holm",
    correctAnsw: "Amanda Nunes",
  }),
  (Question4 = {
    Question: "Current UFC featherweight women champion?",
    a: "Amanda Nunes",
    b: "Cris Cyborg",
    c: "Germaine de Randamie",
    d: "Tonya Evinger",
    correctAnsw: "Amanda Nunes",
  }),
  (Question5 = {
    Question: "Current UFC flytweight men champion?",
    a: "Deiveson Figueiredo",
    b: "Henry Cejudo",
    c: "Demetrious Johnson",
    d: "Brandon Moreno",
    correctAnsw: "Deiveson Figueiredo",
  }),
  (Question6 = {
    Question: "Current UFC bantamweight men champion?",
    a: "Aljamain Sterling",
    b: "Dominick Cruz",
    c: "T.J. Dillashaw",
    d: "Petr Yan",
    correctAnsw: "Aljamain Sterling",
  }),
  (Question7 = {
    Question: "Current UFC featherweight men champion?",
    a: "Alexander Volkanovski",
    b: "Max Holloway",
    c: "Aljamain Sterling",
    d: "Conor McGregor",
    correctAnsw: "Alexander Volkanovski",
  }),
  (Question8 = {
    Question: "Current UFC lightweight champion?",
    a: "None",
    b: "Dustin Poirier",
    c: "Conor McGregor",
    d: "Khabib Nurmagomedov",
    correctAnsw: "None",
  }),
  (Question9 = {
    Question: "Current UFC Welterweight champion?",
    a: "Colby Covington",
    b: "Kamaru Usman",
    c: "Tyron Woodley",
    d: "Georges St-Pierre",
    correctAnsw: "Kamaru Usman",
  }),
  (Question10 = {
    Question: "Current UFC Middleweight champion?",
    a: "Kelvin Gastelum",
    b: "Anderson Silva",
    c: "Robert Whittaker",
    d: "Israel Adesanya",
    correctAnsw: "Israel Adesanya",
  }),
  (Question11 = {
    Question: "Current UFC Light-Heavyweight champion?",
    a: "Jan Błachowicz",
    b: "Jon Jones",
    c: "Alexander Gustafsson",
    d: "Dominick Reyes",
    correctAnsw: "Jan Błachowicz",
  }),
  (Question12 = {
    Question: "Current UFC Heavyweight champion?",
    a: "Stipe Miocic",
    b: "Francis Ngannou",
    c: "Daniel Cormier",
    d: "Fabrício Werdum",
    correctAnsw: "Francis Ngannou",
  }),
];

shuffle(QnAPool);

init();

startbtn.addEventListener("click", function (event) {
  event.preventDefault();
  shuffle(QnAPool);
  globalTimeTag.children[0].textContent = "60";
  secBfrStrt.textContent = "Ready?";
  intro.setAttribute("class", "hidden");
  qtn.setAttribute("class", "mn-box-settings");
  timerQtn(4);
});

qtn.addEventListener("click", function (event) {
  event.preventDefault();
  var answer = event.target.value;
  if (answer != null) {
    validateQuestion(answer);
  }
});

nameInput.addEventListener("submit", function (event) {
  event.preventDefault();
  if (nameInput.value !== "") {
    setScore();
    nameInput.value = "";
  } else {
    alert("Please enter a name");
  }
});

nameInputBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (nameInput.value !== "") {
    setScore();
    nameInput.value = "";
  } else {
    alert("Please enter a name");
  }
});

goBackBtn.addEventListener("click", function () {
  highScore.setAttribute("class", "hidden");
  intro.setAttribute("class", "mn-box-settings");
});

clearScore.addEventListener("click", function () {
  var confValue = confirm("Are you sure you want to clear all Highscores?");
  if (confValue) {
    myScores = [];
    localStorage.setItem("Scores", "");
    renderList();
  }
});

function init() {
  var json = localStorage.getItem("Scores");
  console.log(json);

  if (json === null || json == "") {
    localStorage.setItem("Scores", "[]");
    json = localStorage.getItem("Scores");
    myScores = JSON.parse(json);
    console.log(myScores);
  } else {
    myScores = JSON.parse(json);
    console.log(myScores);
  }
  for (var i = 0; i < myScores.length; i++) {
    var row = document.createElement("li");
    row.setAttribute("data-index", i);
    row.textContent = Number(row.dataset.index) + 1 + ". " + myScores[i];
    highScore.children[1].children[0].appendChild(row);
  }
}

function setScore() {
  var scoreBorad = {
    User: nameInput.value.trim(),
    Time: globalTime,
  };
  myScores.push(scoreBorad);
  localStorage.setItem("Scores", JSON.stringify(myScores));
  console.log(scoreBorad);
  console.log(myScores);
  globalQstNum = 0;
  globalTime = 60;
  globalScore = 0;
  renderList();
  done.setAttribute("class", "hidden");
  highScore.setAttribute("class", "mn-box-settings");
}

function renderList() {
  var json = localStorage.getItem("Scores");
  console.log(json);

  if (json === null || json == "") {
    localStorage.setItem("Scores", "[]");
    json = localStorage.getItem("Scores");
  } else {
    myScores = JSON.parse(json);
    arraySorter();
  }

  highScore.children[1].children[0].remove();
  var newOl = document.createElement("ol");
  highScore.children[1].appendChild(newOl);

  for (var i = 0; i < myScores.length; i++) {
    var row = document.createElement("li");
    row.setAttribute("data-index", i);
    row.textContent =
      i +
      1 +
      ". " +
      "User: " +
      myScores[i].User +
      " | Time: " +
      myScores[i].Time +
      " sec";
    highScore.children[1].children[0].appendChild(row);
  }
}

function arraySorter() {
  console.log(myScores);
  console.log(myScores[0].Time);
  var lastValue;
  for (var z = 0; z < myScores.length; z++) {
    for (var i = 0; i < myScores.length - 1; i++) {
      if (myScores[i].Time < myScores[i + 1].Time) {
        lastValue = myScores[i];
        myScores[i] = myScores[i + 1];
        myScores[i + 1] = lastValue;
      }
    }
  }
}

function startGlobalTime() {
  var timerInterval = setInterval(() => {
    if (globalQstNum === QnAPool.length || globalTime === 0) {
      clearInterval(timerInterval);
      setQuestion(globalQstNum);
    } else {
      globalTime--;
      globalTimeTag.children[0].textContent = globalTime;
    }
  }, 1000);
}

function timerQtn(secLeft) {
  var timerInterval = setInterval(() => {
    secLeft--;
    secBfrStrt.textContent = secLeft;
    if (secLeft === 0) {
      clearInterval(timerInterval);
      setQuestion(globalQstNum);
      startGlobalTime();
    }
  }, 800);
}

function validateQuestion(answer) {
  disableOptions(true);
  if (answer == QnAPool[globalQstNum].correctAnsw) {
    event.target.setAttribute("class", "btn-answ correct-ans");
    globalScore++;
  } else {
    event.target.setAttribute("class", "btn-answ incorrect-ans");
    globalTime -= 10;
    if (globalTime <= 0) {
      globalTime = 0;
      globalTimeTag.children[0].textContent = globalTime;
      setQuestion(globalQstNum);
    }
  }
  setTimeout(function () {
    globalQstNum++;
    setQuestion(globalQstNum);
    disableOptions(false);
  }, 400);
}

function disableOptions(flag) {
  for (var i = 1; i <= 4; i++) {
    qtnForm.children[i].disabled = flag;
  }
}

function setQuestion(questionNumber) {
  if (questionNumber < QnAPool.length && globalTime !== 0) {
    qtn.children[0].setAttribute("class", "hidden");
    qtn.children[1].setAttribute("class", "");
    question.textContent =
      questionNumber + 1 + ". " + QnAPool[questionNumber].Question;
    for (var i = 1; i <= 4; i++) {
      switch (i) {
        case 1:
          qtnForm.children[i].setAttribute("class", "btn-style1");
          qtnForm.children[i].value = QnAPool[questionNumber].a;
          break;
        case 2:
          qtnForm.children[i].setAttribute("class", "btn-style1");
          qtnForm.children[i].value = QnAPool[questionNumber].b;
          break;
        case 3:
          qtnForm.children[i].setAttribute("class", "btn-style1");
          qtnForm.children[i].value = QnAPool[questionNumber].c;
          break;
        case 4:
          qtnForm.children[i].setAttribute("class", "btn-style1");
          qtnForm.children[i].value = QnAPool[questionNumber].d;
          break;
      }
    }
  } else {
    qtn.children[1].setAttribute("class", "hidden");
    qtn.children[0].setAttribute("class", "");
    qtn.setAttribute("class", "hidden");
    done.setAttribute("class", "mn-box-settings center-btn");
    if (globalTime === 0) {
      done.children[0].children[1].textContent =
        "Your final score-time is " + globalTime + " seconds 😂🤣";
    } else {
      done.children[0].children[1].textContent =
        "Your final score-time is " + globalTime + " seconds 👍👍";
    }
  }
}

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}