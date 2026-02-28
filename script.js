/* ============================================================
   LTTE LO — script.js
   Anti-gravity effects, cart, filtering, smooth scroll
   ============================================================ */

/* ---------- Product Data ---------- */
const PRODUCTS = [
  // Ethnic
  { id: 1,  name: 'Embroidered Silk Kurta',     price: 1499, oldPrice: 2199, category: 'ethnic',      age: 'Adults',        badge: 'new',      img: 'images/ethnic_wear.png' },
  { id: 2,  name: 'Festive Anarkali Set',        price: 1899, oldPrice: 2799, category: 'ethnic',      age: 'Women · Adults', badge: 'trending', img: 'images/ethnic_wear.png' },

  // Traditional
  { id: 3,  name: 'Royal Sherwani',              price: 2999, oldPrice: 4499, category: 'traditional', age: 'Men · Adults',   badge: 'sale',     img: 'images/ethnic_wear.png' },
  { id: 4,  name: 'Classic Dhoti-Kurta Combo',   price:  999, oldPrice: 1499, category: 'traditional', age: 'All Ages',       badge: '',         img: 'images/ethnic_wear.png' },

  // Casual
  { id: 5,  name: 'Oversized Graphic Tee',       price:  599, oldPrice:  899, category: 'casual',      age: 'Teens · Adults', badge: 'new',      img: 'images/casual_wear.png' },
  { id: 6,  name: 'Cotton Linen Shirt',          price:  799, oldPrice: 1199, category: 'casual',      age: 'Men · Adults',   badge: '',         img: 'images/casual_wear.png' },
  { id: 7,  name: 'Relaxed-Fit Joggers',         price:  699, oldPrice:  999, category: 'casual',      age: 'Unisex · Teens', badge: 'trending', img: 'images/casual_wear.png' },

  // Denim
  { id: 8,  name: 'Slim-Fit Indigo Jeans',       price: 1299, oldPrice: 1899, category: 'denim',       age: 'Men · Adults',   badge: 'new',      img: 'images/denim_collection.png' },
  { id: 9,  name: 'Denim Trucker Jacket',        price: 1799, oldPrice: 2499, category: 'denim',       age: 'Unisex',         badge: 'sale',     img: 'images/denim_collection.png' },

  // Kids
  { id: 10, name: 'Rainbow Dungarees',           price:  499, oldPrice:  799, category: 'kids',        age: 'Kids · 3–8 yrs', badge: 'new',      img: 'images/kids_collection.png' },
  { id: 11, name: 'Cartoon Print T-Shirt Set',   price:  399, oldPrice:  599, category: 'kids',        age: 'Kids · 2–6 yrs', badge: '',         img: 'images/kids_collection.png' },
  { id: 12, name: 'Tiny Stars Party Frock',      price:  599, oldPrice:  899, category: 'kids',        age: 'Kids · 4–10 yrs',badge: 'trending', img: 'images/kids_collection.png' },

  // Men's
  { id: 13, name: 'Tailored Formal Blazer',      price: 2499, oldPrice: 3499, category: 'mens',        age: 'Men · Adults',   badge: 'sale',     img: 'images/casual_wear.png' },
  { id: 14, name: 'Cotton Polo T-Shirt',         price:  699, oldPrice:  999, category: 'mens',        age: 'Men · Teens+',   badge: '',         img: 'images/casual_wear.png' },

  // Women's
  { id: 15, name: 'Floral Wrap Dress',           price: 1199, oldPrice: 1799, category: 'womens',      age: 'Women · Adults', badge: 'new',      img: 'images/ethnic_wear.png' },
  { id: 16, name: 'High-Waist Palazzo Set',      price:  899, oldPrice: 1299, category: 'womens',      age: 'Women · All',    badge: 'trending', img: 'images/ethnic_wear.png' },

  // Unisex
  { id: 17, name: 'Urban Street Hoodie',         price:  999, oldPrice: 1499, category: 'unisex',      age: 'Unisex · Teens+',badge: 'new',      img: 'images/casual_wear.png' },
  { id: 18, name: 'Eco-Friendly Cargo Pants',    price: 1099, oldPrice: 1599, category: 'unisex',      age: 'Unisex · All',   badge: '',         img: 'images/denim_collection.png' },
];

/* ---------- State ---------- */
let cartCount = 0;

/* ---------- DOM Cache ---------- */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const navbar       = $('#navbar');
const hamburger    = $('#hamburger');
const navLinks     = $('#navLinks');
const productsGrid = $('#productsGrid');
const cartCountEl  = $('#cartCount');
const toastEl      = $('#toast');
const contactForm  = $('#contactForm');

/* ============================================================
   1. NAVBAR — scroll shadow + mobile toggle
   ============================================================ */
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ============================================================
   2. PRODUCT CARD RENDERER
   ============================================================ */
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card floating reveal';
  card.dataset.category = product.category;

  // Stagger the float animation so cards don't all bob together
  const delay = Math.random() * 4;
  const duration = 5 + Math.random() * 3;
  card.style.animationDelay = `${delay}s`;
  card.style.animationDuration = `${duration}s`;

  let badgeHTML = '';
  if (product.badge) {
    badgeHTML = `<span class="product-card__badge product-card__badge--${product.badge}">${product.badge}</span>`;
  }

  let oldPriceHTML = '';
  if (product.oldPrice) {
    oldPriceHTML = `<del>₹${product.oldPrice.toLocaleString('en-IN')}</del>`;
  }

  card.innerHTML = `
    <div class="product-card__img-wrap">
      <img class="product-card__img" src="${product.img}" alt="${product.name}" loading="lazy" />
      ${badgeHTML}
    </div>
    <div class="product-card__body">
      <div class="product-card__category">${product.category}</div>
      <div class="product-card__name">${product.name}</div>
      <div class="product-card__age">${product.age}</div>
      <div class="product-card__price-row">
        <span class="product-card__price">₹${product.price.toLocaleString('en-IN')} ${oldPriceHTML}</span>
        <button class="btn-cart" aria-label="Add to cart" data-id="${product.id}">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  `;

  return card;
}

function renderProducts(filter = 'all') {
  productsGrid.innerHTML = '';
  const filtered = filter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === filter);

  filtered.forEach((p) => productsGrid.appendChild(createProductCard(p)));

  // Re-attach cart button listeners
  productsGrid.querySelectorAll('.btn-cart').forEach((btn) => {
    btn.addEventListener('click', handleAddToCart);
  });

  // Re-run reveal observer for new cards
  observeRevealElements();
}

/* ============================================================
   3. CATEGORY FILTER
   ============================================================ */
$$('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    $$('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});

// Clicking a category card also filters products
$$('.category-card').forEach((card) => {
  card.addEventListener('click', () => {
    const cat = card.dataset.category;
    // Scroll to products section
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    // Activate corresponding filter button
    setTimeout(() => {
      $$('.filter-btn').forEach((b) => {
        b.classList.toggle('active', b.dataset.filter === cat);
      });
      renderProducts(cat);
    }, 400);
  });
});

/* ============================================================
   4. ADD TO CART
   ============================================================ */
function handleAddToCart(e) {
  const btn = e.currentTarget;
  cartCount++;
  cartCountEl.textContent = cartCount;

  // Button animation
  btn.classList.add('added', 'ripple');
  setTimeout(() => btn.classList.remove('added', 'ripple'), 600);

  // Cart badge bump
  cartCountEl.classList.add('bump');
  setTimeout(() => cartCountEl.classList.remove('bump'), 400);

  // Change icon briefly to check
  const icon = btn.querySelector('i');
  icon.className = 'fa-solid fa-check';
  setTimeout(() => { icon.className = 'fa-solid fa-plus'; }, 1000);

  // Toast notification
  const productId = Number(btn.dataset.id);
  const product = PRODUCTS.find((p) => p.id === productId);
  showToast(`🛒  "${product ? product.name : 'Item'}" added to bag!`);
}

/* ============================================================
   5. TOAST
   ============================================================ */
let toastTimer;
function showToast(message) {
  clearTimeout(toastTimer);
  toastEl.textContent = message;
  toastEl.classList.add('show');
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2500);
}

/* ============================================================
   6. CONTACT FORM
   ============================================================ */
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('✨  Message sent! We\'ll get back to you soon.');
  contactForm.reset();
});

/* ============================================================
   7. SCROLL-REVEAL (Intersection Observer)
   ============================================================ */
function observeRevealElements() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  $$('.reveal:not(.visible)').forEach((el) => observer.observe(el));
}

/* ============================================================
   8. ANTI-GRAVITY PHYSICS — subtle parallax mouse movement
   ============================================================ */
function initAntiGravity() {
  const cards = $$('.product-card');
  const heroImg = $('.hero__image-wrap');

  document.addEventListener('mousemove', (e) => {
    const mx = (e.clientX / window.innerWidth  - 0.5) * 2; // -1 … 1
    const my = (e.clientY / window.innerHeight - 0.5) * 2;

    // Parallax on hero image
    if (heroImg) {
      heroImg.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 10}px) translate(${mx * 12}px, ${my * 8}px)`;
    }

    // Subtle 3D tilt on product cards in viewport
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      const cx = (rect.left + rect.width / 2) / window.innerWidth  - 0.5;
      const cy = (rect.top  + rect.height / 2) / window.innerHeight - 0.5;
      const dx = (mx - cx) * 6;
      const dy = (my - cy) * 4;

      card.style.transform += ` perspective(800px) rotateY(${dx}deg) rotateX(${-dy}deg)`;
    });
  });
}

/* ============================================================
   9. PARALLAX SCROLL on hero orbs
   ============================================================ */
function initParallax() {
  const orbs = $$('.hero__orb');
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed = 0.15 + i * 0.08;
      orb.style.transform = `translateY(${sy * speed}px)`;
    });
  });
}

/* ============================================================
   10. INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();        // Render all products
  observeRevealElements(); // Set up scroll reveal
  initAntiGravity();       // Mouse-based floating
  initParallax();          // Scroll parallax on orbs
});
