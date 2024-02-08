// Add dynamism to the login message when user is not connected

const divElement = document.querySelector(".login-message-for-connection");

if (divElement) {
  divElement.style.display = "block";

  setTimeout(() => {
    divElement.style.transition = "opacity 2s ease-in-out";

    divElement.style.opacity = "0";

    setTimeout(() => {
      divElement.style.display = "none";
    }, 2000);
  }, 3000);
}
