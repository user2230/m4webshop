let cartCount = 0;

const products = [
  ["img/spiederman.png", 59, "Spiderman ps4 - marvel", "4 dagen", 4, true],
  ["img/spiderman.png", 59, "Spiderman ps4 - Marvel", "2 min, 42 sec", 5, false],
  ["img/spiderps5.png", 59, "New ps5 spiderman,", "30 min", 5, true],
  ["img/ps4maarvel.png", 39, "Avengers ps4", "1 dag", 3, true],
  ["img/ps5game1.png", 49, "The Last of Us ps5", "12 uur", 4, false],
  ["img/ps5game5.png", 69, "assassins creed shadows ps5", "5 min", 5, true]
];

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('div1');
  function renderProducts(filter = 'all') {
    container.innerHTML = '';
    let filteredProducts = products.map((product, idx) => {
      // Assign platform class for filtering
      let platform = 'ps5';
      if (product[2].toLowerCase().includes('ps4')) platform = 'ps4';
      return { product, idx, platform };
    });
    if (filter !== 'all') {
      // Sort so filtered platform comes first
      filteredProducts = [
        ...filteredProducts.filter(p => p.platform === filter),
        ...filteredProducts.filter(p => p.platform !== filter)
      ];
    }
    filteredProducts.forEach(({ product, platform }) => {
      const [img, price, name, scamtime, stars, inStock] = product;
      const card = document.createElement('div');
      card.className = `card card-wrapper game-item ${platform}`;
      card.innerHTML = `
        <img class="product-imgs" src="${img}" alt="${name}" width="100">
        <div class="product-price">$${price}</div>
        <div class="product-name">${name}</div>
        <div class="product-scam">${scamtime}</div>
        <div class="stars">${'⭐'.repeat(stars)}</div>
        <button class="btn--working${!inStock ? ' out-of-stock' : ''}" ${!inStock ? 'disabled' : ''}>
          ${inStock ? 'Add to Cart' : 'Out of stock'}
        </button>
      `;
      container.appendChild(card);
    });
    // Add event listeners for add to cart
    container.querySelectorAll('.btn--working:not(.out-of-stock)').forEach(button => {
      button.addEventListener('click', () => {
        cartCount++;
        updateCartCount();
      });
    });
  }
  function updateCartCount() {
    document.getElementById('cart-count').textContent = cartCount;
  }
  // Initial render
  renderProducts();
  // Filter bar logic
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      renderProducts(filter);
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
  // Remove from cart logic
  document.querySelectorAll('.btn--remove').forEach(button => {
    button.addEventListener('click', () => {
      if (cartCount > 0) {
        cartCount--;
        updateCartCount();
      }
    });
  });
});