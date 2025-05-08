const categoryName = document.querySelector(".category__name");
const categoryRow = document.querySelector(".category__row");

const storageCategoryName = localStorage.getItem("ecmCategory");
categoryName.innerHTML = `Category: <b>${storageCategoryName}</b>`;

const categoryProducts = products.filter(
  (el) => el.category === storageCategoryName
);

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
      <button onclick="addToFavorite(${id}, 'ecmFavoriteProducts', products, favoriteProducts, getCategoryProducts, getFavoriteQuantity)" class="card__product__favorite">
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
              <button onclick="decreaseQuantity(${id}, 'ecmCartProducts', cartProducts, getCartQuantity, getCategoryProducts)">-</button>
              <span>${inCart.quantity}</span>
              <button onclick="increaseQuantity(${id}, 'ecmCartProducts', cartProducts, getCartQuantity, getCategoryProducts)">+</button>
            </div>`
            : `<button class="card__product__btn" onclick="addToCart(${id}, 'ecmCartProducts', products, cartProducts, getCategoryProducts )">
                Add to cart
              </button>`
        }
        <p class="card__product__price"> Price: <b>
        ${
          discount > 0
            ? `${discountPrice.toFixed(
                1
              )}$ <span class="old__price">${price}$</span>`
            : `${price} $`
        }
        </b> </p>
      </div>
    </div>
  </div>`;
}

function getCategoryProducts() {
  categoryRow.innerHTML = " ";
  categoryProducts.forEach((el) => {
    categoryRow.innerHTML += getCardProduct(el);
  });
}
getCategoryProducts();
