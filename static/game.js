let letter = "";
let left_balloon, left_coin;

function getPlayerData() {
  $(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get("data");
    if (encodedData) {
      const jsonData = decodeURIComponent(encodedData);
      const data = JSON.parse(jsonData);
      document.getElementById("balloon").textContent =
        "BALLOONS:    " + data.balloon;
      document.getElementById("coin").textContent = "COINS:    " + data.coin;
      left_balloon = data.balloon;
      left_coin = data.coin;
    } else {
      console.log("no data found");
    }
  });
}

function getWord() {
  $.ajax({
    url: "/get-word",
    type: "get",
    success: function (result) {
      const word = result.word;
      const randomIndex = Math.floor(Math.random() * word.length);
      const hiddenLetter = word[randomIndex];
      const modifiedWord =
        word.substring(0, randomIndex) + "_" + word.substring(randomIndex + 1);
      const splitWord = modifiedWord.split("").join(" ");
      document.getElementById("guess_word").textContent = splitWord;
      letter = hiddenLetter;
      document.getElementById("guess-input").value = "";
    },
    error: function () {
      console.log("error loading word from backend");
    },
  });
}

function checkInputLetter(i) {
  const input = document.getElementById("guess-input");
  const inputValue = input.value;
  if (left_balloon > 0) {
    if (i == inputValue) {
      Swal.fire({
        icon: "success",
        title: "Well Done!",
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1000,
      });
      console.log(left_coin);
      left_coin += 1;
      newCoin = left_coin;
      document.getElementById("coin").textContent = "COINS:    " + newCoin;
    } else {
      Swal.fire({
        icon: "warning",
        title: "Opps! Try Again",
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1000,
      });
      left_balloon -= 1;
      newBalloon = left_balloon;
      document.getElementById("balloon").textContent =
        "BALLOONS:    " + newBalloon;
    }
  } else {
    Swal.fire({
      icon: "warning",
      title: "No More Balloons Left!",
      confirmButtonColor: "#4CAF50",
      confirmButtonText: "Play Again!",
    }).then(() => {
      const playerResponse = { balloon: left_balloon, coin: left_coin };
      const jsonData = JSON.stringify(playerResponse);
      const encodedData = encodeURIComponent(jsonData);
      window.location.href = "/?response=" + encodedData;
    });
  }
  getWord();
}

$(document).ready(function () {
  getPlayerData();
  getWord();
  $("#guess-button").click(function () {
    checkInputLetter(letter);
  });
});
