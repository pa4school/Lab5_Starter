// explore.js

window.addEventListener('DOMContentLoaded', init);

const voiceMenu = document.getElementById("voice-select");
const talkButton = document.querySelector("button");
const textBox = document.getElementById("text-to-speak");
const faceImage = document.querySelector("image");

let voices = [];

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

function init() {
  addVoicesToMenu();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = addVoicesToMenu;
  }

  talkButton.addEventListener('click', function() {
    let textToSpeak = textBox.value;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.voice = voices[voiceMenu.value];
    window.speechSynthesis.speak(utterance);
  });
}