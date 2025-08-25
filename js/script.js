/** @format */

// toggler navbar
const openNav = document.querySelector(".toggler");
const closeNav = document.querySelector(".nav-links .close-menu");
const overLayBody = document.querySelector(".overlay");

openNav.addEventListener("click", () => {
  document.querySelector(".nav-links").classList.add("active");
  overLayBody.classList.add("active");
});
closeNav.addEventListener("click", () => {
  document.querySelector(".nav-links").classList.remove("active");
  overLayBody.classList.remove("active");
});

// Gallery

const heroImage = document.querySelector(".hero-img img");
const heroImageModel = document.querySelector(".large-image img");
const popupModel = document.querySelector(".model-container");
const thumbnails = document.querySelectorAll(".product-gallery .thumbnail img");
const thumbnailsModel = document.querySelectorAll(".model .thumbnail img");

// view small image as hero image
thumbnails.forEach((img, index) => {
  img.addEventListener("click", (e) => {
    thumbnails.forEach((item) => item.parentElement.classList.remove("active"));
    e.target.parentElement.classList.add("active");

    heroImage.src = `images/image-product-${index + 1}.jpg`;
    heroImageModel.src = `images/image-product-${index + 1}.jpg`;
  });
});
// view small image as hero image again in model
thumbnailsModel.forEach((img, index) => {
  img.addEventListener("click", (e) => {
    thumbnailsModel.forEach((item) =>
      item.parentElement.classList.remove("active")
    );
    e.target.parentElement.classList.add("active");

    heroImageModel.src = `images/image-product-${index + 1}.jpg`;
  });
});

// open model with click hero image gallery
heroImage.addEventListener("click", () => {
  popupModel.classList.add("active");
  document.body.classList.add("stop-scroll");
});

// Coles  model with esc
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && popupModel.classList.contains("active")) {
    popupModel.classList.remove("active");
    document.body.classList.remove("stop-scroll");
  }
});
// Close Model with close button x
const closeModel = document.querySelector(".model-container .close-model");
closeModel.addEventListener("click", () => {
  popupModel.classList.remove("active");
  document.body.classList.remove("stop-scroll");
});

// controller icons next , previous

const next = document.querySelector(".next");
const previous = document.querySelector(".previous");

// get large image that high qulity  ass Array

const totalImage = 5;
const imagePath = "images/";
const imagePaths = [];
for (let i = 1; i < totalImage; i++) {
  const image = `${imagePath}image-product-${i}.jpg`;
  imagePaths.push(image);
}

next.addEventListener("click", () => {
  // 1. Find the currently active image
  const currentActiveImage = document.querySelector(".thumbnail img.active");
  // 2. Find the index of the current active image
  const currentIndex = Array.from(thumbnails).indexOf(currentActiveImage);

  // 3. Calculate the index of the next image.
  const nextIndex = (currentIndex + 1) % thumbnails.length;

  // 4. Remove the 'active' class from the current image
  currentActiveImage.classList.remove("active");

  thumbnailsModel.forEach((img) => {
    img.parentElement.classList.remove("active");

    thumbnailsModel[nextIndex].parentElement.classList.add("active");
  });

  // 5. Add the 'active' class to the next image in the list
  thumbnails[nextIndex].classList.add("active");

  // change hero image to next image

  heroImageModel.src = imagePaths[nextIndex];
});
previous.addEventListener("click", () => {
  // 1. Find the currently active image
  const currentActiveImage = document.querySelector(".thumbnail img.active");
  // 2. Find the index of the current active image
  const currentIndex = Array.from(thumbnails).indexOf(currentActiveImage);

  // 3. Calculate the index of the previous image.
  const previousIndex = (currentIndex + 1) % thumbnails.length;

  // 4. Remove the 'active' class from the current image
  currentActiveImage.classList.remove("active");

  // 5. Add the 'active' class to the previous image in the list
  thumbnails[previousIndex].classList.add("active");

  // get src for current active image
  const activeImgSrc = thumbnails[previousIndex].getAttribute("src");

  // change hero image to previous image
  heroImageModel.src = imagePaths[previousIndex];

  thumbnailsModel.forEach((img) => {
    img.parentElement.classList.remove("active");

    thumbnailsModel[previousIndex].parentElement.classList.add("active");
  });
  // 5. Add the 'active' class to the next image in the list
  thumbnails[previousIndex].classList.add("active");
});

// handel Product quantity and Price
const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const total = document.querySelector(".total");
const price = document.querySelector(".product-price").innerHTML;

let totalPriceCart = 1;

minus.addEventListener("click", () => {
  if (total.textContent > 1) {
    total.textContent--;
    totalPriceCart = price * total.textContent;
  }
});
plus.addEventListener("click", () => {
  if (total.textContent >= 1) {
    total.textContent++;
    totalPriceCart = price * total.textContent;
  }
});

// add to cart
const addToCartBtn = document.querySelector(".add-to-cart");
const productTitleCart = document.querySelector(".p-description .text");
const productPriceCart = document.querySelector(".price");
const productImageCart = document.querySelector(".p-img");
const numberProductsOnCartIcon = document.querySelector('.number')

addToCartBtn.addEventListener("click", (e) => {
  const productInfo = e.currentTarget.closest(".product-info");
  const title = productInfo.querySelector(".large-title").textContent;
  const productImage = heroImage.src;

  productImageCart.src = productImage;
  productTitleCart.textContent = title;

  if (total.textContent == 1) {
    productPriceCart.innerHTML = `<strong>$ ${price}</strong>`;
  } else {
    productPriceCart.innerHTML = `$ ${price} x ${total.textContent}  = <strong>$ ${totalPriceCart}</strong>`;
  }

  // handel number of Products on cart icon in navbar
  numberProductsOnCartIcon.textContent = total.textContent
  numberProductsOnCartIcon.classList.add('heart-pulse')
});

// delete Item From cart
const deleteItemIcon = document.querySelector(".delete-icon");

// deleteItemIcon.addEventListener("click", (e) => {
// e.target.parentElement.remove()
// });
