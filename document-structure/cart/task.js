const cart = document.querySelector('.cart');
const cartProducts = document.querySelector('.cart__products');

const STORAGE_KEY = 'cartItems';

let cartItems = loadCart();

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
}

function updateCartVisibility() {
  cart.style.display = cartProducts.children.length === 0 ? 'none' : '';
}

function createCartProduct(item) {
  const cartProduct = document.createElement('div');
  cartProduct.className = 'cart__product';
  cartProduct.dataset.id = item.id;
  cartProduct.innerHTML = `
    <img class="cart__product-image" src="${item.image}" alt="">
    <div class="cart__product-count">${item.count}</div>
    <div class="cart__product-remove">&times;</div>
  `;

  cartProduct.querySelector('.cart__product-remove').addEventListener('click', () => {
    cartProduct.remove();
    cartItems = cartItems.filter(i => i.id !== item.id);
    saveCart();
    updateCartVisibility();
  });

  return cartProduct;
}

function renderCart() {
  cartProducts.innerHTML = '';
  cartItems.forEach(item => {
    cartProducts.appendChild(createCartProduct(item));
  });
  updateCartVisibility();
}

function flyToCart(sourceImg, productId) {
  const sourceRect = sourceImg.getBoundingClientRect();

  let targetRect;
  const existing = cartProducts.querySelector(`.cart__product[data-id="${productId}"]`);

  if (existing) {
    targetRect = existing.querySelector('.cart__product-image').getBoundingClientRect();
  } else if (cartProducts.lastElementChild) {
    targetRect = cartProducts.lastElementChild.querySelector('.cart__product-image').getBoundingClientRect();
  } else {
    targetRect = cart.getBoundingClientRect();
  }

  const flyingImg = document.createElement('img');
  flyingImg.src = sourceImg.src;
  flyingImg.className = 'product-shadow';
  flyingImg.style.position = 'fixed';
  flyingImg.style.left = sourceRect.left + 'px';
  flyingImg.style.top = sourceRect.top + 'px';
  flyingImg.style.width = sourceRect.width + 'px';
  flyingImg.style.height = sourceRect.height + 'px';
  flyingImg.style.objectFit = 'contain';
  flyingImg.style.zIndex = '1000';
  flyingImg.style.pointerEvents = 'none';
  document.body.appendChild(flyingImg);

  let deltaX = targetRect.left - sourceRect.left;
  let deltaY = targetRect.top - sourceRect.top;

  const steps = 50;
  let step = 0;

  const stepX = deltaX / steps;
  const stepY = deltaY / steps;

  const interval = setInterval(() => {
    step++;

    flyingImg.style.left = (parseFloat(flyingImg.style.left) + stepX) + 'px';
    flyingImg.style.top = (parseFloat(flyingImg.style.top) + stepY) + 'px';

    if (step >= steps) {
      clearInterval(interval);
      flyingImg.remove();
    }
  }, 15);
}

document.querySelectorAll('.product__quantity-control_dec').forEach(btn => {
  btn.addEventListener('click', () => {
    const valueEl = btn.closest('.product__quantity-controls').querySelector('.product__quantity-value');
    const value = parseInt(valueEl.textContent, 10);
    if (value > 1) {
      valueEl.textContent = value - 1;
    }
  });
});

document.querySelectorAll('.product__quantity-control_inc').forEach(btn => {
  btn.addEventListener('click', () => {
    const valueEl = btn.closest('.product__quantity-controls').querySelector('.product__quantity-value');
    const value = parseInt(valueEl.textContent, 10);
    valueEl.textContent = value + 1;
  });
});

document.querySelectorAll('.product__add').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.closest('.product');
    const productId = product.dataset.id;
    const productImage = product.querySelector('.product__image');
    const quantity = parseInt(product.querySelector('.product__quantity-value').textContent, 10);

    const existing = cartItems.find(item => item.id === productId);

    if (existing) {
      existing.count += quantity;
    } else {
      cartItems.push({ id: productId, image: productImage.src, count: quantity });
    }

    saveCart();
    renderCart();
    flyToCart(productImage, productId);
  });
});

renderCart();