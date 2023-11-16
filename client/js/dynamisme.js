function gestionnairePageCourante() {
  // Récupérer les éléments
  const elements = document.getElementsByClassName("pokedex-title-nav-li");
  console.log(elements);

  // Les intégrer dans un tableau
  const elementsArray = Array.from(elements);

  // Ajouter un écouteur d'événements sur chaque élément du tableau
  elementsArray.forEach((element) => {
    element.addEventListener("click", (event) => {
      // Ajouter la classe "current-page" à l'élément cliqué
      element.classList.add("current-page");

      // Parcourir tous les éléments et supprimer la classe "current-page" des autres
      elementsArray.forEach((otherElement) => {
        if (otherElement !== element) {
          otherElement.classList.remove("current-page");
        }
      });

      console.log("ok");
      next();
    });
  });
}
