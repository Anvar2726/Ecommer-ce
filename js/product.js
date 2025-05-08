const productRow = document.querySelector(".product");

const productId = +localStorage.getItem("productId");

const productFound = products.find((el) => el.id == productId);

const id = productFound.id;
const img = productFound.images;
const productName = productFound.name;
const description = productFound.description;
const price = productFound.price;
const discount = productFound.discount;
const rating = productFound.rating;
const category = productFound.category;

function getProductRow() {
  const inCart = cartProducts.find(el => el.id === id)
  return (productRow.innerHTML = `
    <div class="product-container">
      <div class="image-gallery">
        <div class="thumbnails">
          <img
            onclick="changeImage(this)"
            src="${img[0]}"
            alt=""
          />
          <img
            onclick="changeImage(this)"
            src="${img[1]}"
            alt=""
          />
          <img
            onclick="changeImage(this)"
            src="${img[3]}"
            alt=""
          />
          <img
            onclick="changeImage(this)"
            src="${img[2]}"
            alt=""
          />
        </div>
        <div class="main-image">
          <img
            id="main-image"
            src="${img[0]}"
            alt="Apple"
          />
        </div>
      </div>
      <div class="product-details">
        <h1>${productName}</h1>
        <p class="category">Category: ${category}</p>
        <p class="description">
          ${description}
        </p>
        <p class="price">Price: <strong>${price}$</strong></p>
        <p class="rating">Rating: ${getRating(rating)}</p>
        ${
          inCart
            ? `
            <div class="card__controls">
              <button onclick="decreaseQuantity(${id}, 'ecmCartProducts', cartProducts, getProductRow)">-</button>
                <span>${inCart.quantity}</span>
              <button onclick="increaseQuantity(${id}, 'ecmCartProducts', cartProducts, getProductRow)">+</button>
            </div>`
            : `<button class="product__ad-to-cart" onclick="addToCart(${id}, 'ecmCartProducts', products, cartProducts, getProductRow)">
                Add to cart
            </button>`
        }
        
      </div>
    </div>`);
}

getProductRow()
function changeImage(element) {
  document.getElementById("main-image").src = element.src;
}
