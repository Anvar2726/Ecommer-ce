const cardProductsRow = document.querySelector(".card__products__row");
const searchInput = document.querySelector(".search__input");
const productsQuantity = document.querySelector(".all__products");
const pagination = document.querySelector(".pagination");
const categoryLinks = document.querySelector(".nav__category-link__box");
const categryOpenBtn = document.querySelector(".category__open");

let LIMIT = 8;
let search = "";
let page = +localStorage.getItem("ecmsPage") || 1;


function getCardProduct({
  id,
  name,
  images,
  description,
  price,
  discount,
  rating,
}) {
  const inCart = cartProducts.find((el) => el.id === id);
  const checkProduct = favoriteProducts.find((el) => el.id === id);
  const discountPrice = ((100 - discount) / 100) * price;
  return `
  <div class="card__product">
    <div class="card__product__img__box">
      <a href="/pages/product.html" onclick="saveDetail(${id}, 'productId')"><img class="card__product__img" src="${images[0]}" alt="${name}" /></a>
      ${discount > 0 ? `<span >-${discount}%</span>` : " "}
      <button onclick="addToFavorite(${id}, 'ecmFavoriteProducts', products, favoriteProducts, getProducts, getFavoriteQuantity)" class="card__product__favorite">
        ${
          !checkProduct
            ? `<img src="/assets/images/icons/heart-deactive.png" alt="heart " width="24">`
            : `<img src="/assets/images/icons/heart-active.png" alt="heart " width="24">`
        } 
      </button>
    </div>
    <div class="card__product__content__box">
      <h2 class="card__product__name">${name}</h2>
      <p class="card__product__desc">${description}</p>
      ${getRating(+rating)}
      <div>
        ${
          inCart
            ? `
            <div class="card__controls">
              <button onclick="decreaseQuantity(${id}, 'ecmCartProducts', cartProducts, getProducts, getCartQuantity)">-</button>
              <span>${inCart.quantity}</span>
              <button onclick="increaseQuantity(${id}, 'ecmCartProducts', cartProducts, getProducts, getCartQuantity)">+</button>
            </div>`
            : `<button class="card__product__btn" onclick="addToCart(${id}, 'ecmCartProducts', products, cartProducts, getProducts, getCartQuantity )">
                Add to cart
              </button>`
        }
        <p class="card__product__price"> Price: <b>
        ${
          discount > 0
            ? `${discountPrice.toFixed(
                1
              )}$ <span class="old__price">${price}$</span>`
            : `${price}`
        }
        </b> </p>
      </div>
    </div>
  </div>`;
}

//CATEGORIES FUNCTIONS
categryOpenBtn.addEventListener("click", function(){
  categoryLinks.classList.toggle("categoty-link__active");
})
categories.forEach(el =>{
  categoryLinks.innerHTML += `<a href="/pages/category.html" onclick="saveDetail('${el.name}', 'ecmCategory')" class="categories__link">${el.name}</a>`;
})

// PRODUCTS MAPPING
function getProducts() {
  cardProductsRow.innerHTML = " ";
  let searchProducts = products.filter((el) =>
    el.name.toLowerCase().includes(search)
  );

  // PAGINATION
  let pages = Math.ceil(searchProducts.length / LIMIT);

  if (searchProducts.length <= LIMIT) {
    pagination.innerHTML = " ";
  } else {
    pagination.innerHTML = `<button  ${
      page === 1 ? "disabled" : ""
    } class="prev__btn  ${
      page === 1 ? "disabled" : ""
    } " onclick="getPage('-')" >Prev</button>`;

    for (let i = 1; i <= pages; i++) {
      pagination.innerHTML += `<button  class="page__btn ${
        page === i ? "active" : " "
      }" onclick="getPage(${i})">${i}</button>`;
    }

    pagination.innerHTML += `<button ${
      page === pages ? "disabled" : ""
    } class="next__btn ${
      page === pages ? "disabled" : ""
    } " onclick="getPage('+')">Next</button>`;
  }
  // PAGINATION END

  let startIndex = (page - 1) * LIMIT;
  let endIndex = page * LIMIT;

  productsQuantity.innerHTML = `ALL PRODUCTS: ${searchProducts.length}`;
  searchProducts.slice(startIndex, endIndex).forEach((el) => {
    cardProductsRow.innerHTML += getCardProduct(el);
  });
}
getProducts();

// PAGINATION FUNCTION
function getPage(p) {
  if (p === "+") {
    page++;
  } else if (p === "-") {
    page--;
  } else {
    page = p;
  }
  localStorage.setItem("ecmsPage", page);
  getProducts();
}

// SEARCH FUNCTION
searchInput.addEventListener("keyup", (e) => {
  search = e.target.value.toLowerCase();
  page = 1;
  localStorage.setItem("ecmsPage", page);
  getProducts();
});
