  let correctSpelling = "";

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
  }

  console.log("modeButtonText", modeButtonText);
};
//event listener on the switch calls toggleMode which adjusts the label below the pic
document.getElementById("switchButton").addEventListener("click", function () {
  let currentText = document.getElementById("modeLabel").innerHTML;
  toggleMode(currentText);
});
//when user presses a word button, value gets stored in state. On submit, the value is compared. If correct, flash a checkmark and restore the input. If incorrect flash an x and restore input with placeholder of spell the word.
chooseSpellingList = (selectedList) => {
  console.log("chooseSpellingList", selectedList);
  changeButtonText(selectedList);
  makeDictationButtons(selectedList);
};

changeButtonText = (newText) => {
  document.getElementById("lesson").innerHTML = newText;
};

makeDictationButtons = (currentList) => {
  let numButtons = Object.keys(lists[currentList]);
  console.log("numbuttons", numButtons);
  //clear out any pre-existing buttons
  removeAllButtons();
  //find how many key value pairs in the spellinglist object and use that value to make that many buttons
  {
    numButtons.map((c, i) => insertButtons(c, i, currentList));
  }
};
removeAllButtons = () => {
  document.getElementById("span").innerHTML = "";
};



    
  

 
insertButtons = (c, i, currentList) => {
  console.log("c", c);
  console.log("i", i);

  console.log("currentList", currentList);

  if (
    document.getElementsByClassName("listButton").length <
    Object.keys(lists[currentList]).length
  ) {
    let btn = document.createElement("button");
    btn.innerHTML = i + 1;
    btn.classList.add("listButton");
    const span = document.getElementById("span");
    span.appendChild(btn);
    btn.addEventListener("click", function () {
      playAudio(c, currentList);
    });
  }
};

playAudio = (key, currentList) => {
  disableButtons();
  const wordSentenceWord = lists[currentList][key];
  textToSpeech(wordSentenceWord);
 correctSpelling = wordSentenceWord[0];
};

textToSpeech = (utteranceArray) => {
  let word = new SpeechSynthesisUtterance(utteranceArray[0]);
  let sentence = new SpeechSynthesisUtterance(utteranceArray[1]);

  setTimeout(window.speechSynthesis.speak(word), 2000);
  setTimeout(window.speechSynthesis.speak(sentence), 2000);
  setTimeout(window.speechSynthesis.speak(word), 2000);
  setTimeout(() => reactivateButtons(), 6100);
};

disableButtons = () => {
  const listButtons = document.getElementsByClassName("listButton");
  console.log(document.getElementsByClassName("listButton"));
  for (const eachButton of listButtons) {
    eachButton.disabled = true;
    console.log(eachButton);
  }
};

reactivateButtons = () => {
  const listButtons = document.getElementsByClassName("listButton");
  console.log(document.getElementsByClassName("listButton"));
  for (const eachButton of listButtons) {
    eachButton.disabled = false;
    console.log(eachButton);
  }

};

checkSpelling = () => {

const spelling = document.getElementById("input").value;

console.log('spelling', spelling);
console.log('correctSpelling', correctSpelling);
  if ( spelling == correctSpelling) {
    console.log('correct');
    const right = document.getElementById("right");
    right.style.display = "flex";
    right.innerHTML = "✅"
    setTimeout(function(){right.style.display = 'none';
  document.getElementById("input").setAttribute("placeholder", "spell the word");
  }, 2000);
  document.getElementById("practiceInput").reset();
    //show check mark for 3s
    //reset input field placeholder to respell or try another one
    

}else {
 console.log('incorrect')
  const right = document.getElementById("right");
    right.style.display = "flex";
    right.innerHTML = "❌"
    setTimeout(function(){right.style.display = 'none';
    }, 2000);
    document.getElementById("input").setAttribute("placeholder", "try again");
  document.getElementById("practiceInput").reset();
 //show x for 3s
 //reset input field placeholder respell or try another one

}
}

