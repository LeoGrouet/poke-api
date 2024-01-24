let size = window.innerWidth;

function responsiveNavBar() {
  let size = window.innerWidth; // Initialiser la variable size avec la largeur initiale

  // Fonction pour mettre à jour la visibilité des éléments de la barre de navigation
  const updateNavBarVisibility = () => {
    const navbar = document.querySelector(".nav-bar");
    const mobile = document.querySelector(".nav-bar-mobile");
    const menu = document.querySelector(".hamburger");

    if (size > 950) {
      navbar.style.display = "flex";
      mobile.style.display = "none";
      menu.style.display = "none";
    } else if (size <= 950) {
      navbar.style.display = "none";
      menu.style.display = "flex";
    }
  };

  // Appeler la fonction initiale
  updateNavBarVisibility();

  // Ajouter un écouteur d'événements pour le redimensionnement de la fenêtre
  window.addEventListener("resize", () => {
    size = window.innerWidth; // Mettre à jour la variable size avec la nouvelle largeur lors du redimensionnement
    updateNavBarVisibility(); // Appeler la fonction pour mettre à jour la visibilité
  });
}

// Appeler la fonction d'initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", responsiveNavBar);

const checkbox = document.querySelector(".menuburger-checkbox");
checkbox.addEventListener("click", () => {
  const checked = checkbox.checked;
  const mobile = document.querySelector(".nav-bar-mobile");

  if (checked === true) {
    mobile.style.display = "flex";
    mobile.style.transition = "ease 2s all ";
  } else {
    mobile.style.display = "none";
  }
});
