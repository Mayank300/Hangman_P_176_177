let left_balloon = 2;
let coin = 0;

function purchaseBalloon() {
  $("#shop").on("click", "img", function () {
    if (coin == 0) {
      Swal.fire({
        icon: "info",
        html: "Not enough coins",
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
      });
    } else if (left_balloon <= 4) {
      left_balloon += 1;
      coin -= 1;
      console.log("balloon: " + left_balloon);
      console.log("coin: " + coin);
      document.getElementById("balloon_left").textContent =
        "BALLOONS:    " + left_balloon;
      document.getElementById("coin_left").textContent = "COINS:    " + coin;
    } else {
      Swal.fire({
        icon: "error",
        html: "Can't buy more than <b>5</b> balloons",
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
      });
    }
  });
}

function getResponse() {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedData = urlParams.get("response");
  if (encodedData) {
    const jsonData = decodeURIComponent(encodedData);
    const data = JSON.parse(jsonData);
    console.log(data);
    coin = data.coin;
    display_coin = document.getElementById("coin_left").textContent =
      "COINS:    " + data.coin;
  }
}

$(document).ready(function () {
  const display_coin = document.getElementById("coin_left");
  display_coin.textContent = "COINS:    " + coin;

  const display_balloon = document.getElementById("balloon_left");
  display_balloon.textContent = "BALLOONS:    " + left_balloon;

  purchaseBalloon();
  $("#play").click(function () {
    const playerData = { balloon: left_balloon, coin: coin };
    const jsonData = JSON.stringify(playerData);
    const encodedData = encodeURIComponent(jsonData);
    window.location.href = "../templates/game.html?data=" + encodedData;
  });
  getResponse();
});
