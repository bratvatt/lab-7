const modal = document.querySelector(".modal");
const cardsContainer = document.querySelector(".cards");
const cards = [...document.querySelectorAll(".card")];
const video = document.getElementById("background-video");
let selectedCard = null;

function handleCardClick() {
  if (modal.firstChild) modal.firstChild.remove();
  selectedCard = this;
  const { top, left, width } = selectedCard.getBoundingClientRect();
  const {
    background,
    borderRadius,
    boxShadow,
    padding,
    color
  } = window.getComputedStyle(this);

  const clone = selectedCard.cloneNode(true);

  clone.style.top = `${top}px`;
  clone.style.left = `${left}px`;
  clone.style.width = `${width}px`;

  clone.style.background = background;
  clone.style.borderRadius = borderRadius;
  clone.style.boxShadow = boxShadow;
  clone.style.padding = padding;
  clone.style.color = color;

  selectedCard.style.visibility = "hidden";
  modal.appendChild(clone);
  modal.style.display = "block";
  cardsContainer.classList.add("hide");

  setTimeout(() => {
    clone.style.top = "50%";
    clone.style.left = "50%";
    clone.style.transform = "translate(-50%,-50%)";

    modal.style.transform = "scale(1.5)";
  }, 0);
}

function handleModalClose({ target, key }) {
  if (target !== modal && key !== "Escape") return;

  modal.style.display = "none";
  modal.style.transform = "none";
  selectedCard.style.visibility = "visible";
  cardsContainer.classList.remove("hide");

  video.pause();
  video.src = "";
  video.style.display = "none";
}

cards.forEach((card) => {
  card.addEventListener("click", handleCardClick);
  card.addEventListener("click", function () {
    const videoSrc = this.getAttribute("data-src");
    video.src = videoSrc;
    video.play();
    video.style.display = "block";
  });
});
window.addEventListener("click", handleModalClose);
window.addEventListener("keydown", handleModalClose);
