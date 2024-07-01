let left_balloon = 4;
let coin = 2;

function askName() {
  let player_name = prompt("Type here");
  return player_name;
}

function purchaseBalloon() {
  $("#shop").on("click", "img", function () {
    if (coin == 0) {
      alert("Not enough coins");
    } else if (left_balloon <= 4) {
      left_balloon += 1;
      coin -= 1;
      console.log("balloon: " + left_balloon);
      console.log("coin: " + coin);
      document.getElementById("balloon_left").textContent =
        "BALLOONS:    " + left_balloon;
      document.getElementById("coin_left").textContent = "COINS:    " + coin;
    } else alert("Can't buy more than 5 Balloons!!");
  });
}

$(document).ready(function () {
  const display_coin = document.getElementById("coin_left");
  display_coin.textContent = "COINS:    " + coin;

  const display_balloon = document.getElementById("balloon_left");
  display_balloon.textContent = "BALLOONS:    " + left_balloon;

  purchaseBalloon();
  $("#play").click(function () {
    const playerData = { balloon: left_balloon, coin: coin };
    const playerDataString = JSON.stringify(playerData);
    localStorage.setItem("playerDataString", playerDataString);
    location.href = "../templates/game.html";
  });
});
