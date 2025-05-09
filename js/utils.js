//INCREASE AND DECREASE QUANTITY FUNCTIONS
function increaseQuantity(id, storageKey, cartArray, ...callbacks) {
  const inCart = cartArray.find((el) => el.id === id);
  if (!inCart) return;

  inCart.quantity++;

  callbacks.forEach((cb) => {
    if (typeof cb === "function") cb();
  });

  localStorage.setItem(storageKey, JSON.stringify(cartArray));
}
function decreaseQuantity(id, storageKey, cartArray, ...callbacks) {
  const inCart = cartArray.find((el) => el.id === id);
  const index = cartArray.findIndex((el) => el.id === id);
  if (!inCart) return;
  if (inCart.quantity === 1) {
    cartArray.splice(index, 1); // joyidan o‘chirish
  } else {
    inCart.quantity--;
  }
  callbacks.forEach((cb) => {
    if (typeof cb === "function") cb();
  });

  localStorage.setItem(storageKey, JSON.stringify(cartArray));
}

// ADD TO FAVORITE
function addToFavorite(id, storageKey, productsArr, favoriteArr, ...callbacks) {
  const findProduct = productsArr.find((el) => el.id === id); // topilgan mahsulot
  const index = favoriteArr.findIndex((el) => el.id === id); //
  if (index !== -1) {
    favoriteArr.splice(index, 1); // joyidan o‘chirish
  } else {
    favoriteArr.push(findProduct);
  }
  callbacks.forEach((cb) => {
    if (typeof cb === "function") cb();
  });

  localStorage.setItem(storageKey, JSON.stringify(favoriteArr));
}

// SAVE DETAIL
function saveDetail(data, storageKey) {
  localStorage.setItem(storageKey, data);
}

// ADD TO CART
function addToCart(id, storageKey, products, cartProducts, ...callbacks) {
  let findProduct = products.find((el) => el.id === id);
  let inCart = cartProducts.find((el) => el.id === id);

  if (inCart) {
    inCart.quantity++;
  } else {
    cartProducts.push({ ...findProduct, quantity: 1 });
  }
  callbacks.forEach((cb) => {
    if (typeof cb === "function") cb();
  });
  localStorage.setItem(storageKey, JSON.stringify(cartProducts));
}

// GET RATING
function getRating(rating) {
  switch (rating) {
    case 5:
      return `<img width="200" src="/assets/images/icons/5.png" alt="5 rating">`;
    case 4.5:
      return `<img width="200" src="/assets/images/icons/4.5.png" alt="4.5 rating">`;
    case 4:
      return `<img width="100" src="/assets/images/icons/4.png" alt="4 rating">`;
    case 3.5:
      return `<img width="200" src="/assets/images/icons/3.5.png" alt="3.5 rating">`;
    case 3:
      return `<img width="200" src="/assets/images/icons/3.png" alt="3 rating">`;
    case 2:
      return `<img width="200" src="/assets/images/icons/2.png" alt="2 rating">`;
    case 1:
      return `<img width="100" src="/assets/images/icons/1.png" alt="2 rating">`;
  }
}


// RENDER SHIMMER
function renderShimmer(renderRow, iteration, time, callback) {
  renderRow.innerHTML = "";
  for (let i = 0; i < iteration; i++) {
    renderRow.innerHTML += `
      <div class="card__product shimmer">
        <div class="shimmer-img shimmer-animate"></div>
        <div class="shimmer-lines">
          <div class="shimmer-line shimmer-animate"></div>
          <div class="shimmer-line shimmer-animate short"></div>
        </div>
      </div>
    `;
  }
  setTimeout(() => {
    callback();
  }, time);
}