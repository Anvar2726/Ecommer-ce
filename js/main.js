const cartQuantity = document.querySelector(".cart__quantity");
const favoriteQuantity = document.querySelector(".favorite__quantity");

const cartProducts = JSON.parse(localStorage.getItem("ecmCartProducts")) || [];
const favoriteProducts = JSON.parse(localStorage.getItem("ecmFavoriteProducts")) || [];

function getFavoriteQuantity() {
  if (favoriteQuantity) favoriteQuantity.innerHTML = favoriteProducts.length;
}
function getCartQuantity() {
  if (cartQuantity) cartQuantity.innerHTML = cartProducts.length;
}

getFavoriteQuantity();
getCartQuantity();
