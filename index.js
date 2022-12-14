/*
  API link: https://fakestoreapi.com/ <3
  My github: https://github.com/S3ck1/ ( ͡° ͜ʖ ͡°)
*/

const API = "https://fakestoreapi.com";
let categories = [];
let allProducts = {};

async function fetchData(urlApi) {
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
}


async function getProducts(urlApi) {
  categories = await fetchData(`${urlApi}/products/categories`);
  categories.splice(categories.indexOf("electronics"), 1); //remove extra category
  console.log(categories);
  //get products
  for (const category of categories) {
    const categoryProducts = await fetchData(
      `${urlApi}/products/category/${category}`
    );
    allProducts[category] = categoryProducts;
  }
  return allProducts;
}

let productCards = [];
let productsArea = document.querySelector(".products-container");

async function displayProducts(category) {
  let products = [];

  if (category == "all") {
    //saves all products on products array
    await getProducts(API).then(
      (response) =>
        (products = [
          ...response["men's clothing"],
          ...response["women's clothing"],
          ...response["jewelery"],
        ])
    );
  } else {
    await getProducts(API).then(
      //saves specific category on products array
      (response) => (products = [...response[`${category}`]])
    );
  }

  //Displays selected products
  products.forEach((product) => {
    productCards.push(`
    <div class="product-card">
      <div class="product-img-container">
        <img src=${product.image} alt="" class="product-img">
        </div>
        <div class="product-bottom-section">
          <span class="product-price">$${product.price}</span>
          <div class="btn-container">
            <button id = "${product.id}" class="add-btn" onclick="addToCart(${product.id})">+</button>
          </div>
        </div>
    </div>
    `);
    const cardText = productCards.join("");
    productsArea.innerHTML = cardText;
  });
}

let productCategoriesBtns = document.querySelectorAll(".category");
(function () {
  productCategoriesBtns.forEach((categoryBtn) => {
    categoryBtn.addEventListener("click", () => {
      //First clean product cards array and products area
      //get all categories
      productsArea.innerHTML = "<div></div><div>LOADING...</div><div></div>";
      productCards = [];
      let category = categoryBtn.id;
      switch (category) {
        case "category-all":
          displayProducts("all");
          break;
        case "category-men":
          displayProducts("men's clothing");
          break;
        case "category-women":
          displayProducts("women's clothing");
          break;
        case "category-jewelery":
          displayProducts("jewelery");
          break;
        default:
          console.log("Error, that product doesn't exist :(");
          break;
      }
    });
  });
})();

let cartContainerCards = [];
let cartContainer = document.querySelector("#cart-products-container");
async function addToCart(id) {
  let product = await fetchData(`${API}/products/${id}`);
  console.log(product);
  cartContainerCards.push(`
    <div class ="cart-product-container">
      <div class ="cart-img-container">
        <img class="cart-img" src=${product.image} alt=""">
      </div>
      <div class ="cart-product-details">
        <br>
        <span class="cart-product-title">${product.title}</span>
        <br>
        <span class="cart-product-price">$${product.price}</span>
      </div>
    </div>
  `)
  const cardText = cartContainerCards.join("");
  cartContainer.innerHTML = cardText;
}

function addPreviewItem() {
  cartContainerCards.push(`
    <div class ="cart-product-container">
      <div class ="cart-img-container">
        <img class="cart-img" src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg" alt=""">
      </div>
      <div class ="cart-product-details">
        <br>
        <span class="cart-product-title">Men's Cotton Jacket</span>
        <br>
        <span class="cart-product-price">$55.99</span>
      </div>
    </div>
  `)
  const cardText = cartContainerCards.join("");
  cartContainer.innerHTML = cardText;
}