window.addEventListener("load", start);

// div
let divScreen = document.querySelector("#screen");

// ranges
let rangeRed = document.querySelector("#red");
let rangeGreen = document.querySelector("#green");
let rangeBlue = document.querySelector("#blue");

// input
let txtRed = document.querySelector("#value-red");
let txtGreen = document.querySelector("#value-green");
let txtBlue = document.querySelector("#value-blue");

// variaveis de armazenamento
let colorRedValue = rangeRed.value;
let colorGreenValue = rangeGreen.value;
let colorBlueValue = rangeBlue.value;

function start() {
  colorRed();
  colorGreen();
  colorBlue();
  divScreen.style.backgroundColor =
      "rgb(" +
      colorRedValue +
      "," +
      colorGreenValue +
      "," +
      colorBlueValue +
      ")";
}

function colorRed() {
  txtRed.value = colorRedValue;

  function value() {
    txtRed.value = rangeRed.value;
    colorRedValue = rangeRed.value;
    
    divScreen.style.backgroundColor =
      "rgb(" +
      colorRedValue +
      "," +
      colorGreenValue +
      "," +
      colorBlueValue +
      ")";
  }
  rangeRed.addEventListener("input", value);
}

function colorGreen() {
  txtGreen.value = colorGreenValue;

  function value() {
    txtGreen.value = rangeGreen.value;
    colorGreenValue = rangeGreen.value;
    divScreen.style.backgroundColor =
      "rgb(" +
      colorRedValue +
      "," +
      colorGreenValue +
      "," +
      colorBlueValue +
      ")";
  }
  rangeGreen.addEventListener("input", value);
}

function colorBlue() {
  txtBlue.value = colorBlueValue;

  function value() {
    txtBlue.value = rangeBlue.value;
    colorBlueValue = rangeBlue.value;
    divScreen.style.backgroundColor =
      "rgb(" +
      colorRedValue +
      "," +
      colorGreenValue +
      "," +
      colorBlueValue +
      ")";
  }
  rangeBlue.addEventListener("input", value);
}
