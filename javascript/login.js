function storeName() {
  const name = document.getElementById("playerName").value.trim();
  if (name) {
    localStorage.setItem("playerName", name);
    window.location.href = "home.html"; // Redirect to your game page
  } else {
    alert("Please enter your name to start the game.");
  }
}
