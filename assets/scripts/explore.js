// explore.js

// create variables to access elements of HTML document
const voiceMenu = document.getElementById("voice-select");
const talkButton = document.querySelector("button");
const textBox = document.getElementById("text-to-speak");
const faceImage = document.querySelector("img");

let voices = [];

window.addEventListener('DOMContentLoaded', init);

/**
 * Populates the dropdown menu with the list of possible voices.
 */
function addVoicesToMenu() {
  voices = window.speechSynthesis.getVoices();

  for (let i = 0; i < voices.length; i++) {
    const voiceOption = document.createElement("option");
    voiceOption.textContent = voices[i].name + " (" + voices[i].lang + ")";
    voiceOption.value = i;
    voiceMenu.appendChild(voiceOption);
  }
}

/**
 * Initializes the web page after it finishes loading.
 */
function init() {
  // populate voice menu
  addVoicesToMenu();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = addVoicesToMenu;
  }

  // set button up to speak text when clicked
  talkButton.addEventListener('click', function() {
    let textToSpeak = textBox.value;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.voice = voices[voiceMenu.value];
    utterance.addEventListener('start', function() {
      faceImage.src = "assets/images/smiling-open.png";
      voiceMenu.disabled = true;
      talkButton.disabled = true;
      textBox.disabled = true;
    });
    utterance.addEventListener('end', function() {
      faceImage.src = "assets/images/smiling.png";
      voiceMenu.disabled = false;
      talkButton.disabled = false;
      textBox.disabled = false;
    });
    window.speechSynthesis.speak(utterance);
  });
}