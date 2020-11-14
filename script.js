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
};

textToSpeech = (utteranceArray) => {
  let word = new SpeechSynthesisUtterance(utteranceArray[0]);
  let sentence = new SpeechSynthesisUtterance(utteranceArray[1]);
  const voices = window.speechSynthesis.getVoices();
  word.voice = voices[1];
  sentence.voice = voices[1];
  window.speechSynthesis.speak(word);
  setTimeout(() => reactivateButtons(), 6100);
  setTimeout(window.speechSynthesis.speak(sentence), 2000);
  setTimeout(window.speechSynthesis.speak(word), 2000);
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
