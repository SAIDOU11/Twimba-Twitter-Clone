const galleryContainer = document.querySelector(".gallery-container");
let isLiked = false;
let isShared = false;

document.addEventListener("click", function (e) {
  if (e.target.dataset.heart) {
    isLiked = !isLiked;
    render();
  } else if (e.target.dataset.shareIcon) {
    isShared = !isShared;
    render();
  }
});

function render() {
  let heartClass = "";
  let shareClass = "";

  if (isLiked) {
    heartClass = "liked";
  }
  if (isShared) {
    shareClass = "shared";
  }

  let imageHtml = `
  <div id="image-1" class="img-container">
        <img
          src="dino2.jpeg"
          alt="Visite dinosaure. Jurassic Parc"          
        />
        <div class="social-icons-container">
          <i class="fa-solid fa-heart ${heartClass}" data-heart="image-1"></i>
          <i class="fa-solid fa-share ${shareClass} " data-share-icon="image-1"></i>
        </div>
      </div>
  `;
  galleryContainer.innerHTML = imageHtml;
}
render();
