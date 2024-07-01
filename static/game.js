const playerData = localStorage.getItem("playerDataString");
const playerDataJSON = JSON.parse(playerData);
let letter = "";
let left_balloon = playerDataJSON.balloon;
let coin = playerDataJSON.coin;

function getWord() {
  $.ajax({
    url: "/get-word",
    type: "get",
    success: function (result) {
      const word = result.word.split("").join(" ");
      const randomIndex = Math.floor(Math.random() * word.length);
      const hiddenLetter = word[randomIndex];
      const splitWord = word
        .split("")
        .map((letter, index) => (index === randomIndex ? "_" : letter))
        .join(" ");
      document.getElementById("guess_word").textContent = splitWord;
      letter = hiddenLetter;
    },
    error: function (result) {
      alert(result.responseJSON.message);
    },
  });
}

function updateStorage(balloon, coin) {
  const playerData = { balloon: balloon, coin: coin };
  const playerDataString = JSON.stringify(playerData);
  localStorage.setItem("playerDataString", playerDataString);
  console.log(playerDataString);
  getWord();
}

function getInputLetter(i) {
  const input = document.getElementById("guess-input");
  const inputValue = input.value;
  if (i == inputValue) {
    alert("good");
    newCoin = coin + 1;
    document.getElementById("coin").textContent = "COINS:    " + newCoin;
    updateStorage(left_balloon, newCoin);
  } else {
    alert("Try again!!!");
    newBalloon = left_balloon - 1;
    document.getElementById("balloon").textContent =
      "BALLOONS:    " + newBalloon;
    updateStorage(newBalloon, coin);
  }
}

$(document).ready(function () {
  document.getElementById("balloon").textContent =
    "BALLOONS:    " + left_balloon;
  document.getElementById("coin").textContent = "COINS:    " + coin;

  getWord();

  $("#guess-button").click(function () {
    getInputLetter(letter);
  });
});
