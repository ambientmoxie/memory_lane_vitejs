import quotes from "./quotes";
const container = document.getElementById("main");

// Simple function that retrieves content and injects it into the body.

export default function createContent() {
  quotes.forEach((quote) => {
    const draggableElt = document.createElement("div");
    draggableElt.innerHTML = `<p>${quote.quote}</p>`;
    draggableElt.classList.add("draggable-elt");
    container.appendChild(draggableElt);
  });
}
