//global state variable for the current list word user selects
let correctSpelling = "";
const actualLockCode = "1234";
let lockStatus = "unlocked";

//adjusts the app from practice to test mode
toggleMode = (currentText) => {
  console.log("in toggleMode");
 
  if (currentText == "Practice Mode") {
    modeLabel.innerHTML = "Test Mode";
    document.getElementById("practiceInput").style.display = "none";
    document.getElementById("modeLabel").style.color = "white"
  } else {
    modeLabel.innerHTML = "Practice Mode";
    document.getElementById("practiceInput").style.display = "flex";
    document.getElementById("modeLabel").style.color = "#1cf115"
    setInitialFocus();
  }

};
//event listener on the switch calls toggleMode which adjusts the label below the pic and 
//provides a form field for inputs
document.getElementById("switchButton").addEventListener("click", function () {
  let currentText = document.getElementById("modeLabel").innerHTML;
  toggleMode(currentText);
});
//when user presses a word button, value gets stored in state. On submit, the value is compared. If correct, flash a checkmark and restore the input. If incorrect flash an x and restore input with placeholder of spell the word.
chooseSpellingList = (selectedList) => {
  console.log({selectedList});
  console.log("chooseSpellingList", selectedList);
  changeButtonText(selectedList);
  makeDictationButtons(selectedList);
  
};

changeButtonText = (newText) => {
  document.getElementById("lesson").innerHTML = newText;
};
//sets up form field for app start up
setInitialFocus = () => {
  // document.getElementById("input").focus();
  document.getElementById("input").setAttribute("placeholder", "Choose a number");
}
//dynamically constructs a list of buttons, one for each list word of list chosen
makeDictationButtons = (currentList) => {
  let numButtons = Object.keys(lists[currentList]);

  //clear out any pre-existing buttons
  removeAllButtons();

  //find how many key value pairs in the spellinglist object and use that value to make that many buttons
  {
    numButtons.map((c, i) => insertButtons(c, i, currentList));
  }
  // setInitialFocus();
};

removeAllButtons = () => {
  document.getElementById("span").innerHTML = "";
};
//populates the screen with a list of buttons for the chosen list
insertButtons = (c, i, currentList) => {
  if (
    document.getElementsByClassName("listButton").length <
    Object.keys(lists[currentList]).length
  ) {
    let btn = document.createElement("button");
    btn.innerHTML = i + 1;
    btn.classList.add("listButton");
    const span = document.getElementById("span");
    span.appendChild(btn);
    setInitialFocus();
    btn.addEventListener("click", function () {
      btn.style.color = "#1cf115";
      playAudio(c, currentList);
           disableButtons();
  disableInputs(); 
  
    });
  }
};

playAudio = (key, currentList) => {
  const wordSentenceWord = lists[currentList][key];
  textToSpeech(wordSentenceWord);
  //trimmed off whitespace to make sure the data was correct
 correctSpelling = wordSentenceWord[0].trim();
};

setInputFocus = () => {
  document.getElementById("input").focus();
  document.getElementById("input").setAttribute("placeholder", "Spell the word");
}

textToSpeech = (utteranceArray) => {
  let word1= new SpeechSynthesisUtterance(utteranceArray[0]);
  let sentence = new SpeechSynthesisUtterance(utteranceArray[1]);
  let word2= new SpeechSynthesisUtterance(utteranceArray[0]);

  setTimeout(window.speechSynthesis.speak(word1), 2000);
  setTimeout(window.speechSynthesis.speak(sentence), 2000);
  setTimeout(window.speechSynthesis.speak(word2), 2000);

  word2.onend = function(e) {
    reactivateButtons();
    reactivateInputs();
  setInputFocus();
  }
};

disableInputs = () => {
document.getElementById("input").disabled = true;
document.getElementById("submitButton").disabled = true;
}
reactivateInputs = () => {
document.getElementById("input").disabled = false;
document.getElementById("submitButton").disabled = false;
}
disableButtons = () => {
  const listButtons = document.getElementsByClassName("listButton");
  console.log(document.getElementsByClassName("listButton"));
  for (const eachButton of listButtons) {
    eachButton.disabled = true;
    // console.log(eachButton);
  }
};

reactivateButtons = () => {
  const listButtons = document.getElementsByClassName("listButton");
  console.log(document.getElementsByClassName("listButton"));
  for (const eachButton of listButtons) {
    eachButton.disabled = false;
    eachButton.style.color = "black";
    // console.log(eachButton);
  }
};
//function to check teacher passcode to lockout practice mode
lockPracticeMode = () => {
  const lockSymbol = document.getElementById('locked');
 const lockcode = document.getElementById("inputPin").value;
 const switchButton = document.getElementById("switchButton");
 const inputPin = document.getElementById('inputPin');
 console.log(switchMode);
  console.log('lockPracticeMode', lockcode);
  if (lockcode === actualLockCode) {
    lockStatus === "unlocked" ? lockStatus = "locked" : lockStatus = "unlocked";
    console.log(lockcode); 
   inputPin.style.background = "#1cf115"
   lockStatus === "locked" ? inputPin.setAttribute("placeholder", "Locked") : inputPin.setAttribute("placeholder", "Unlocked")
   lockSymbol.style.display === "inline-block" ? lockSymbol.style.display = "none" : lockSymbol.style.display = "inline-block";
   setTimeout(function(){inputPin.setAttribute("placeholder", "Enter Pin");
  inputPin.style.background = "white";
  }, 1200);
    
  switchButton.disabled === false ? switchButton.disabled = true : switchButton.disabled = false ;

  }else {
    const inputPin = document.getElementById('inputPin');
    inputPin.style.background = "#f80606";
    inputPin.setAttribute("placeholder", "Wrong Pin");
    setTimeout(function(){inputPin.setAttribute("placeholder", "Enter Pin");
  inputPin.style.background = "rgb(255, 255, 255)";

  }, 1200);
  }
  document.getElementById("lockcodeInput").reset(); 
}
//handles user input. Displays got it if correct and try again if not
checkSpelling = () => {

const spelling = document.getElementById("input").value;
console.log('spelling', spelling);
  if ( spelling == correctSpelling) {
    console.log('correct');
    const right = document.getElementById("right");
    right.style.display = "flex";
    right.innerHTML = "✅" 
      document.getElementById('input').setAttribute("placeholder", "Got it!");
    setTimeout(function(){right.style.display = 'none';
  document.getElementById("input").setAttribute("placeholder", "Choose a number");
  }, 2000);
   document.getElementById("practiceInput").reset(); 

}else {
 console.log('incorrect')
  const right = document.getElementById("right");
    right.style.display = "flex";
    right.innerHTML = "❌"
    document.getElementById("input").style.borderColor = "red"
    document.getElementById('input').setAttribute("placeholder", "Try again!");
    setTimeout(function(){right.style.display = 'none';
    document.getElementById("input").style.borderColor = "#1cf115"
    }, 2000);
   document.getElementById("practiceInput").reset();
}


}

