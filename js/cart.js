const cartProductsRow = document.querySelector(".cart__products__row");
const totalProducts = document.querySelector(".total-products");
const totalPrice = document.querySelector(".total-price");

function getCartProduct({
  id,
  name,
  description,
  discount,
  quantity,
  price,
  images,
  category,
  rating
}) {
  let discountPrice = ((100 - discount) / 100) * price * quantity;
  const checkProduct = favoriteProducts.find((el) => el.id === id);
  return `
    <div class="product-cart">
        <img src="${images[0]}" alt="asjld" />
        <div class="cart_product__content__box">
        <p class="product-cart__category">Category: ${category}</p>
        <p class="product-cart__desc">${description}</p>
        <h3>${name}</h3>
        ${getRating(rating)}
        <div class="product-cart__controls">
            <div>
                <button onclick="decreaseQuantity(${id}, 'ecmCartProducts', cartProducts, getCartProducts)">-</button>
                <span>${quantity}</span>
                <button onclick="increaseQuantity(${id}, 'ecmCartProducts', cartProducts, getCartProducts)">+</button>
            </div>
            ${
              discount > 0
                ? `
                <p> Price: ${discountPrice.toFixed(
                  2
                )}$ <span class="old__price">${price * quantity} $</span></p>
                `
                : `<p>Price: ${price * quantity}$</p>`
            } 
        </div>
        <button onclick="addToFavorite(${id}, 'ecmFavoriteProducts', products, favoriteProducts, getCartProducts)" class="product-cart__favorite">
           ${
             !checkProduct
               ? `<img src="/assets/images/icons/heart-deactive.png" alt="heart " width="24">`
               : `<img src="/assets/images/icons/heart-active.png" alt="heart " width="24">`
           } 
        </button>
        <button onclick="deleteCart(${id})" class="delete-cart">
            <img src="/assets/images/icons/delete.png" alt="delete" width="24">
        </button>
        </div>
    </div>`;
}

// DELETE CART
function deleteCart(id){
    const deleteProduct = cartProducts.find(el => el.id === id)
    const confirm = window.confirm(
      `Would you like to remove ${deleteProduct.name} from the cart?`
    ); 
    if(confirm){
        cartProducts = cartProducts.filter(el => el.id !== id)
    }
    getCartProducts();
    let JsonCartProducts = JSON.stringify(cartProducts);
    localStorage.setItem("ecmCartProducts", JsonCartProducts);
}
// TOTAL PRICE FUNCTION
function getTotalPrice() {
  let total = 0;
  for (let i = 0; i < cartProducts.length; i++) {
    const quantity = cartProducts[i].quantity;
    const price = cartProducts[i].price;
    const discount = cartProducts[i].discount;
    if (discount > 0) {
      let discountedPrice = ((100 - discount) / 100) * price;
      total += discountedPrice * quantity;
    } else {
      total += price * quantity;
    }
  }
  return +total.toFixed(2);
}

// CART PRODUCTS MAPPING
function getCartProducts() {
  cartProductsRow.innerHTML = " ";
  totalProducts.innerHTML = `Total products: ${cartProducts.length}`;
  totalPrice.innerHTML = `Total price: ${getTotalPrice()}$`;
  cartProducts.forEach((el) => {
    cartProductsRow.innerHTML += getCartProduct(el);
  });
}
getCartProducts();

