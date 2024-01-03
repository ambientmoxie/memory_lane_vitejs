import quotes from "./quotes";
const container = document.getElementById("main");

// Simple function qui récupère du contenu et l'injecte dans le body.

export default function createContent() {
  quotes.forEach((quote) => {
    const draggableElt = document.createElement("div");
    draggableElt.innerHTML = `<p>${quote.quote}</p>`;
    draggableElt.classList.add("draggable-elt");
    container.appendChild(draggableElt);
  });
}
