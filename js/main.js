const cartQuantities = document.querySelectorAll(".cart__quantity");
const favoriteQuantities = document.querySelectorAll(".favorite__quantity");

const cartProducts = JSON.parse(localStorage.getItem("ecmCartProducts")) || [];
const favoriteProducts =
  JSON.parse(localStorage.getItem("ecmFavoriteProducts")) || [];

function getFavoriteQuantity() {
  favoriteQuantities.forEach((el) => {
    el.innerHTML = favoriteProducts.length;
  });
}

function getCartQuantity() {
  cartQuantities.forEach((el) => {
    el.innerHTML = cartProducts.length;
  });
}

getFavoriteQuantity();
getCartQuantity();
