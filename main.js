import { ahorcado } from "./src/ahorcado";
import { tresenraya } from "./src/tresraya";
import { papeltijeras } from "./src/papeltijeras";

document.addEventListener("DOMContentLoaded", () => {
  const tresRaya = document.getElementById("tresRaya");
  const piedraInd = document.getElementById("piedraInd");
  const ahorcadoInd = document.getElementById("ahorcadoInd");
  const tresRayaContent = document.getElementById("tresRayaContent");
  const piedraContent = document.getElementById("piedraContent");
  const ahorcadoContent = document.getElementById("ahorcadoContent");

  tresRaya.addEventListener("click", () => {
    tresRayaContent.classList.remove("hidden");
    piedraContent.classList.add("hidden");
    ahorcadoContent.classList.add("hidden");
    tresenraya(tresRayaContent); // Llamar la función correspondiente
  });

  piedraInd.addEventListener("click", () => {
    piedraContent.classList.remove("hidden");
    tresRayaContent.classList.add("hidden");
    ahorcadoContent.classList.add("hidden");
    papeltijeras(piedraContent); // Llamar la función correspondiente
  });

  ahorcadoInd.addEventListener("click", () => {
    ahorcadoContent.classList.remove("hidden");
    tresRayaContent.classList.add("hidden");
    piedraContent.classList.add("hidden");
    startHangmanGame(ahorcado); // Asegúrate de que esta función esté importada y definida
  });
});
