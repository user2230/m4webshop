let cartCount = 0;

const products = [
  ["spiederman.png", 59, "Spiederman - marvel", 4, true],
  ["spiderman.png", 59, "Spiderman ps4 - Marvel", 5, false],
  ["spiderps5.png", 59, "New ps5 spiderman", 5, true]
];

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('div1');
  container.innerHTML = '';

  products.forEach(product => {
    const [img, price, name, stars, inStock] = product;
    const card = document.createElement('div');
    card.className = 'card card-wrapper';
    card.innerHTML = `
      <img class="product-imgs" src="${img}" alt="${name}" width="100">
      <div class="product-price">$${price}</div>
      <div class="product-name">${name}</div>
      <div class="stars">${'⭐'.repeat(stars)}</div>
      <button class="btn--working${!inStock ? ' out-of-stock' : ''}" ${!inStock ? 'disabled' : ''}>
        ${inStock ? 'Add to Cart' : 'Out of stock'}
      </button>
    `;
    container.appendChild(card);
  });

  const cartCountElement = document.getElementById('cart-count');
  function updateCartCount() {
    cartCountElement.textContent = cartCount;
  }

  container.querySelectorAll('.btn--working:not(.out-of-stock)').forEach(button => {
    button.addEventListener('click', () => {
      cartCount++;
      updateCartCount();
    });
  });

  document.querySelectorAll('.btn--remove').forEach(button => {
    button.addEventListener('click', () => {
      if (cartCount > 0) {
        cartCount--;
        updateCartCount();
      }
    });
  });
});