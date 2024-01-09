function loggedController() {
  const teambutton = document.getElementById("team-nav");
  if (!session) {
    teambutton.style.display = "none";
  }
}
loggedController();
