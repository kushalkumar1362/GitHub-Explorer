const root = document.documentElement.style;
const get = (param) => document.getElementById(`${param}`);
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");

// Intially
let darkMode = false;

// Listner for mode button
btnmode.addEventListener("click", function () {
  if (darkMode == false) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});

function darkModeProperties() {
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-text", "white");
  modetext.innerText = "LIGHT";
  modeicon.src = "./Assets/sun-icon.svg";
  darkMode = true;
  localStorage.setItem("dark-mode", true);
}

function lightModeProperties() {
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-text", "#4B6A9B");
  modetext.innerText = "DARK";
  modeicon.src = "./Assets/moon-icon.svg";
  darkMode = false;
  localStorage.setItem("dark-mode", false);
}