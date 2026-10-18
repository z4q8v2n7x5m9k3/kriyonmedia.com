/**
 * TALLA JEWELLERS — DIGITAL ATELIER ENGINE
 * E-Commerce Core, Cart Drawer, Wishlist, Quick View, Gold Rate Calc, Bespoke Consultation
 */

(function () {
  'use strict';

  // --- Real Curated Products Database ---
  const PRODUCTS = [
    {
      id: 'tj-01',
      name: 'Nizami Royal Polki Choker Set',
      category: 'polki',
      categoryLabel: 'Uncut Diamond Polki',
      price: 485000,
      image: '/assets/jewellery/pixelone-image-078.png',
      purity: '22K Gold (916)',
      grossWeight: '88.40g',
      netWeight: '72.10g',
      diamonds: '14.50 cts Syndicate Uncut Polki',
      certification: 'SGL Certified • 100% BIS Hallmarked',
      description: 'An archival heirloom choker crafted in 22-karat hallmarked yellow gold, adorned with open-setting syndicate uncut diamonds and suspended Zambian emerald drops.'
    },
    {
      id: 'tj-02',
      name: 'Amora Solitaire Diamond Ring',
      category: 'solitaire',
      categoryLabel: 'Solitaire & Diamonds',
      price: 148500,
      image: '/assets/jewellery/pixelone-image-081.png',
      purity: '18K White Gold (750)',
      grossWeight: '4.85g',
      netWeight: '4.61g',
      diamonds: '1.20 ct IGI Certified VVS1-E Round Brilliant',
      certification: 'IGI Laser Inscribed • BIS Hallmarked',
      description: 'A solitaire of extraordinary fire and symmetry, held within a handcrafted four-prong cathedral setting sculpted in 18-karat sovereign white gold.'
    },
    {
      id: 'tj-03',
      name: 'Imperial Emerald Waterfall Haar',
      category: 'bridal',
      categoryLabel: 'Bridal High Jewellery',
      price: 675000,
      image: '/assets/talla/talla-detail-01.png',
      purity: '22K Gold (916)',
      grossWeight: '124.60g',
      netWeight: '98.20g',
      diamonds: '22.80 cts Syndicate Polki & Rose Cuts',
      certification: 'IGI Certified Diamond & Emeralds • BIS HUID',
      description: 'Sculpted across 240 artisan hours in our Jammu atelier, featuring graduated tiers of untreated Colombian emerald cabochons framed by royal polki florets.'
    },
    {
      id: 'tj-04',
      name: 'Gulrukh Jadau Kangan Pair',
      category: 'bangles',
      categoryLabel: 'Royal Bangles',
      price: 320000,
      image: '/assets/jewellery/pixelone-image-082.png',
      purity: '22K Gold (916)',
      grossWeight: '62.40g',
      netWeight: '56.80g',
      diamonds: '6.40 cts Uncut Diamonds',
      certification: 'BIS Hallmarked • Authentic Meenakari',
      description: 'Hand-hammered 22-karat heritage gold kadas detailed with polychromatic reverse meenakari enameling and bezel-set natural uncut diamonds.'
    },
    {
      id: 'tj-05',
      name: 'Celeste Solitaire Tennis Bracelet',
      category: 'solitaire',
      categoryLabel: 'Solitaire & Diamonds',
      price: 295000,
      image: '/assets/jewellery/pixelone-image-089.png',
      purity: '18K Rose Gold (750)',
      grossWeight: '16.20g',
      netWeight: '15.44g',
      diamonds: '3.80 cts Round Brilliant Diamonds (VVS-FG)',
      certification: 'SGL Certified Diamond Solitaires',
      description: 'A continuous line of hand-matched brilliant-cut diamonds, meticulously set in articulated 18-karat rose gold links for velvet-like drape.'
    },
    {
      id: 'tj-06',
      name: 'Devi Temple Filigree Jhumkas',
      category: 'bridal',
      categoryLabel: 'Temple Jewellery',
      price: 185000,
      image: '/assets/jewellery/pixelone-image-106.png',
      purity: '22K Yellow Gold (916)',
      grossWeight: '38.50g',
      netWeight: '38.50g (All Pure Gold)',
      diamonds: 'Natural Basra Seed Pearls Accent',
      certification: '100% BIS Hallmarked 916',
      description: 'Traditional Nakshi craftsmanship carved with divine motifs, culminating in delicate floral bells strung with certified Basra seed pearls.'
    },
    {
      id: 'tj-07',
      name: 'Pure Shine Diamond Band',
      category: 'solitaire',
      categoryLabel: 'Everyday Fine Wear',
      price: 29869,
      image: '/assets/jewellery/pixelone-image-110.png',
      purity: '18K Yellow Gold (750)',
      grossWeight: '2.40g',
      netWeight: '2.34g',
      diamonds: '0.32 ct Natural Diamonds (SI-GH)',
      certification: 'BIS Hallmarked • IGI Certified',
      description: 'A refined contemporary band featuring micropave-set natural round brilliant diamonds designed for effortless everyday grace.'
    },
    {
      id: 'tj-08',
      name: 'Luna Luxe Diamond Tennis Bangle',
      category: 'bangles',
      categoryLabel: 'Diamond Bangles',
      price: 84500,
      image: '/assets/jewellery/pixelone-image-118.png',
      purity: '18K White Gold (750)',
      grossWeight: '9.80g',
      netWeight: '9.61g',
      diamonds: '0.95 ct Brilliant Cut Diamonds',
      certification: 'IGI Certified • BIS Hallmark',
      description: 'Slim modern oval silhouette with double safety clasp, pavé-set with shimmering natural diamonds that catch light with every gesture.'
    },
    // New Arrivals
    {
      id: 'tj-09',
      name: 'Amora Solitaire Drop Earrings',
      category: 'solitaire',
      categoryLabel: 'Solitaire & Diamonds',
      price: 112000,
      image: '/assets/jewellery/pixelone-image-107.png',
      purity: '18K Rose Gold (750)',
      grossWeight: '6.20g',
      netWeight: '5.96g',
      diamonds: '1.20 cts Solitaire Diamonds (VVS-F)',
      certification: 'IGI Certified Solitaires',
      description: 'Articulated solitaire earrings that sway with radiant illumination, crowned with bezel-set accent diamonds.'
    },
    {
      id: 'tj-10',
      name: 'Zoya Marquise Diamond Pendant',
      category: 'solitaire',
      categoryLabel: 'High Jewellery',
      price: 78000,
      image: '/assets/jewellery/pixelone-image-109.png',
      purity: '18K Yellow Gold (750)',
      grossWeight: '4.10g',
      netWeight: '3.95g',
      diamonds: '0.75 ct Marquise & Round Brilliants',
      certification: 'BIS Hallmarked • SGL Certified',
      description: 'A sculptural marquise diamond cluster forming an ethereal floral petal motif, suspended on an 18-karat yellow gold cable chain.'
    },
    {
      id: 'tj-11',
      name: 'Aaryavart Royal Temple Choker',
      category: 'bridal',
      categoryLabel: 'Temple Jewellery',
      price: 540000,
      image: '/assets/jewellery/pixelone-image-079.png',
      purity: '22K Gold (916)',
      grossWeight: '94.20g',
      netWeight: '88.10g',
      diamonds: 'Natural Burmese Rubies & Uncut Polki',
      certification: '100% BIS Hallmarked • Karigar Certified',
      description: 'Inspired by ancient royal dynasties, hand-embossed in pure 22K gold featuring sacred peacock and Lakshmi engravings.'
    },
    {
      id: 'tj-12',
      name: 'Celeste Solitaire Studs',
      category: 'solitaire',
      categoryLabel: 'Solitaire & Diamonds',
      price: 92000,
      image: '/assets/jewellery/pixelone-image-112.png',
      purity: '18K White Gold (750)',
      grossWeight: '2.80g',
      netWeight: '2.64g',
      diamonds: '0.80 ct Pair (0.40 ct each) VVS-E',
      certification: 'Laser Inscribed IGI Certificates',
      description: 'The quintessential luxury essential. Two matched natural brilliant-cut solitaires held within minimal three-prong martini settings.'
    }
  ];

  // --- State Managers (LocalStorage backed) ---
  let cart = JSON.parse(localStorage.getItem('talla_cart') || '[]');
  let wishlist = JSON.parse(localStorage.getItem('talla_wishlist') || '[]');

  // Save Helpers
  function saveCart() {
    localStorage.setItem('talla_cart', JSON.stringify(cart));
    updateCartUI();
  }

  function saveWishlist() {
    localStorage.setItem('talla_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
  }

  // Currency Formatter
  function formatINR(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
  }

  // --- UI Updates ---
  function updateCartUI() {
    const countBadges = document.querySelectorAll('.cart-count-badge');
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    countBadges.forEach(b => {
      b.textContent = totalQty;
      b.style.display = totalQty > 0 ? 'flex' : 'none';
    });

    const cartList = document.getElementById('cartDrawerItems');
    const emptyState = document.getElementById('cartEmptyState');
    const footer = document.getElementById('cartDrawerFooter');
    const subtotalEl = document.getElementById('cartSubtotalVal');

    if (!cartList) return;

    if (cart.length === 0) {
      cartList.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (footer) footer.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (footer) footer.style.display = 'block';

    let subtotal = 0;
    cartList.innerHTML = cart.map(item => {
      const prod = PRODUCTS.find(p => p.id === item.id) || item;
      const itemTotal = prod.price * item.qty;
      subtotal += itemTotal;
      return `
        <div class="drawer-item" data-id="${item.id}">
          <img src="${prod.image}" alt="${prod.name}" class="drawer-item-img">
          <div class="drawer-item-info">
            <h4 class="drawer-item-name">${prod.name}</h4>
            <div class="drawer-item-price">${formatINR(prod.price)}</div>
            <div class="drawer-qty-row">
              <button class="qty-btn" onclick="window.tallaStore.updateCartQty('${item.id}', -1)" aria-label="Decrease quantity">−</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn" onclick="window.tallaStore.updateCartQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
              <button class="drawer-remove-btn" onclick="window.tallaStore.removeFromCart('${item.id}')">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (subtotalEl) {
      subtotalEl.textContent = formatINR(subtotal);
    }
  }

  function updateWishlistUI() {
    const countBadges = document.querySelectorAll('.wishlist-count-badge');
    countBadges.forEach(b => {
      b.textContent = wishlist.length;
      b.style.display = wishlist.length > 0 ? 'flex' : 'none';
    });

    // Update heart icons across product cards
    document.querySelectorAll('.wishlist-toggle').forEach(btn => {
      const pid = btn.dataset.productId;
      if (wishlist.includes(pid)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const wishlistList = document.getElementById('wishlistDrawerItems');
    const emptyState = document.getElementById('wishlistEmptyState');
    if (!wishlistList) return;

    if (wishlist.length === 0) {
      wishlistList.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    wishlistList.innerHTML = wishlist.map(pid => {
      const prod = PRODUCTS.find(p => p.id === pid);
      if (!prod) return '';
      return `
        <div class="drawer-item">
          <img src="${prod.image}" alt="${prod.name}" class="drawer-item-img">
          <div class="drawer-item-info">
            <h4 class="drawer-item-name">${prod.name}</h4>
            <div class="drawer-item-price">${formatINR(prod.price)}</div>
            <div style="display:flex; gap:0.5rem; margin-top:0.5rem;">
              <button class="btn-primary" style="padding:0.4rem 0.85rem; font-size:0.68rem;" onclick="window.tallaStore.addToCart('${prod.id}'); window.tallaStore.toggleWishlist('${prod.id}');">Move to Bag</button>
              <button class="drawer-remove-btn" onclick="window.tallaStore.toggleWishlist('${prod.id}')">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- Toast Notifications ---
  function showToast(message, isSuccess = true) {
    let toast = document.getElementById('tallaToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'tallaToast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }

    const checkIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`;
    toast.innerHTML = `${checkIcon} <span>${message}</span>`;
    toast.classList.add('show');

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // --- Store Engine API ---
  window.tallaStore = {
    addToCart(id, qty = 1) {
      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.qty += qty;
      } else {
        cart.push({ id, qty });
      }
      saveCart();
      showToast('Added to your shopping bag');
      this.openDrawer('cartDrawer');
    },

    updateCartQty(id, delta) {
      const idx = cart.findIndex(item => item.id === id);
      if (idx !== -1) {
        cart[idx].qty += delta;
        if (cart[idx].qty <= 0) {
          cart.splice(idx, 1);
        }
        saveCart();
      }
    },

    removeFromCart(id) {
      cart = cart.filter(item => item.id !== id);
      saveCart();
      showToast('Item removed from shopping bag');
    },

    toggleWishlist(id) {
      const index = wishlist.indexOf(id);
      if (index === -1) {
        wishlist.push(id);
        showToast('Saved to your Wishlist');
      } else {
        wishlist.splice(index, 1);
        showToast('Removed from Wishlist');
      }
      saveWishlist();
    },

    openQuickView(id) {
      const prod = PRODUCTS.find(p => p.id === id);
      if (!prod) return;

      const modal = document.getElementById('quickViewModal');
      const content = document.getElementById('quickViewContent');
      if (!modal || !content) return;

      content.innerHTML = `
        <div class="quickview-layout">
          <div class="quickview-media">
            <img src="${prod.image}" alt="${prod.name}">
          </div>
          <div class="quickview-details">
            <div class="eyebrow eyebrow-burgundy">${prod.categoryLabel}</div>
            <h2 class="quickview-title">${prod.name}</h2>
            <div class="quickview-price">${formatINR(prod.price)} <span style="font-size:0.75rem; color:#8E8787; font-weight:400;">(Inc. all taxes)</span></div>
            <p style="font-size:0.88rem; line-height:1.7; color:#5A5454; margin-bottom:1.5rem;">${prod.description}</p>
            
            <table class="quickview-specs-table">
              <tr><td>Gold Purity</td><td>${prod.purity}</td></tr>
              <tr><td>Gross Weight</td><td>${prod.grossWeight}</td></tr>
              <tr><td>Net Gold Weight</td><td>${prod.netWeight}</td></tr>
              <tr><td>Diamonds / Gemstones</td><td>${prod.diamonds}</td></tr>
              <tr><td>Certification</td><td>${prod.certification}</td></tr>
            </table>

            <div style="display:flex; gap:1rem; margin-top:auto;">
              <button class="btn-primary" style="flex:1;" onclick="window.tallaStore.addToCart('${prod.id}'); window.tallaStore.closeModals();">
                Add to Shopping Bag
              </button>
              <button class="btn-secondary" style="width:48px; padding:0;" onclick="window.tallaStore.toggleWishlist('${prod.id}')" aria-label="Add to wishlist">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      `;

      this.openModal('quickViewModal');
    },

    openDrawer(drawerId) {
      const backdrop = document.getElementById('drawerBackdrop');
      const drawer = document.getElementById(drawerId);
      if (backdrop && drawer) {
        backdrop.classList.add('active');
        drawer.classList.add('active');
        document.body.classList.add('lock-scroll');
      }
    },

    openModal(modalId) {
      const backdrop = document.getElementById('drawerBackdrop');
      const modal = document.getElementById(modalId);
      if (backdrop && modal) {
        backdrop.classList.add('active');
        modal.classList.add('active');
        document.body.classList.add('lock-scroll');
      }
    },

    closeModals() {
      const backdrop = document.getElementById('drawerBackdrop');
      if (backdrop) backdrop.classList.remove('active');
      document.querySelectorAll('.slide-drawer, .center-modal').forEach(el => {
        el.classList.remove('active');
      });
      document.body.classList.remove('lock-scroll');
    },

    // Gold Rate Calculator
    calculateGoldRate() {
      const gramsInput = document.getElementById('calcGramsInput');
      const puritySelect = document.getElementById('calcPuritySelect');
      const output = document.getElementById('calcOutputVal');
      if (!gramsInput || !puritySelect || !output) return;

      const grams = parseFloat(gramsInput.value) || 0;
      const ratePerGram = parseFloat(puritySelect.value) || 7195;
      const total = grams * ratePerGram;
      output.textContent = formatINR(Math.round(total));
    },

    // Product Discovery Filter
    filterDiscoveryProducts() {
      const metal = document.getElementById('filterMetal')?.value || 'all';
      const category = document.getElementById('filterCategory')?.value || 'all';
      const priceRange = document.getElementById('filterPrice')?.value || 'all';

      const filtered = PRODUCTS.filter(p => {
        // Category match
        if (category !== 'all' && p.category !== category) return false;
        // Metal match
        if (metal !== 'all') {
          if (metal === '22k' && !p.purity.includes('22K')) return false;
          if (metal === '18k' && !p.purity.includes('18K')) return false;
        }
        // Price match
        if (priceRange === 'under100k' && p.price >= 100000) return false;
        if (priceRange === '100k-300k' && (p.price < 100000 || p.price > 300000)) return false;
        if (priceRange === 'above300k' && p.price <= 300000) return false;
        return true;
      });

      const container = document.getElementById('discoveryGrid');
      const countEl = document.getElementById('discoveryCount');
      if (countEl) countEl.textContent = `Showing ${filtered.length} Curated Creation${filtered.length === 1 ? '' : 's'}`;

      if (!container) return;

      if (filtered.length === 0) {
        container.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: #8E8787;">
            <p style="font-family: 'Bodoni Moda', serif; font-size: 1.35rem; color: #242020; margin-bottom: 0.5rem;">No Pieces Matched Your Criteria</p>
            <p style="font-size: 0.88rem;">Adjust your filters or contact our concierge atelier for bespoke creation.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map(prod => `
        <article class="product-card">
          <div class="product-thumb-wrap">
            <span class="product-purity-tag">${prod.purity.split(' ')[0]}</span>
            <button class="wishlist-toggle ${wishlist.includes(prod.id) ? 'active' : ''}" data-product-id="${prod.id}" onclick="window.tallaStore.toggleWishlist('${prod.id}')" aria-label="Add to wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <img src="${prod.image}" alt="${prod.name}" loading="lazy">
            <button class="quick-view-btn" onclick="window.tallaStore.openQuickView('${prod.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              Quick View
            </button>
          </div>
          <div class="product-meta">
            <span class="product-category-sub">${prod.categoryLabel}</span>
            <h3 class="product-name">${prod.name}</h3>
            <div class="product-details-chips">
              <span class="chip">${prod.grossWeight}</span>
              <span class="chip">${prod.purity.split(' ')[0]}</span>
            </div>
            <div class="product-price-row">
              <div class="price-box">
                <span class="price-val">${formatINR(prod.price)}</span>
                <span class="price-tax">Inc. GST</span>
              </div>
              <button class="btn-add-cart" onclick="window.tallaStore.addToCart('${prod.id}')">Add to Bag</button>
            </div>
          </div>
        </article>
      `).join('');
    },

    // Bestseller Tabs
    switchBestsellerTab(tabCategory) {
      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === tabCategory);
      });

      const cards = document.querySelectorAll('#bestsellerGrid .product-card');
      cards.forEach(card => {
        const cat = card.dataset.category;
        if (tabCategory === 'all' || cat === tabCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    },

    // Handle Appointment Booking Submission
    handleConsultationSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const showroom = form.showroom?.value || 'Flagship Channi Himmat, Jammu';
      const name = form.name?.value || 'Valued Patron';
      const date = form.date?.value || 'Selected Date';
      const time = form.time?.value || '11:00 AM';

      const bookingId = 'TJ-' + Math.floor(100000 + Math.random() * 900000);

      const confirmModal = document.getElementById('consultationConfirmModal');
      const confirmDetails = document.getElementById('confirmDetailsBox');
      if (confirmDetails) {
        confirmDetails.innerHTML = `
          <div style="background-color:#FAF9F6; border:1px solid #EAE6DE; padding:1.5rem; text-align:left; margin:1.5rem 0;">
            <p style="font-size:0.75rem; letter-spacing:0.12em; text-transform:uppercase; color:#B49B7B; margin-bottom:0.35rem;">Appointment Reference</p>
            <p style="font-family:'Bodoni Moda', serif; font-size:1.35rem; color:#580F2B; font-weight:600; margin-bottom:1rem;">${bookingId}</p>
            <p style="font-size:0.85rem; color:#242020; margin-bottom:0.4rem;"><strong>Patron:</strong> ${name}</p>
            <p style="font-size:0.85rem; color:#242020; margin-bottom:0.4rem;"><strong>Showroom:</strong> ${showroom}</p>
            <p style="font-size:0.85rem; color:#242020; margin-bottom:0.4rem;"><strong>Schedule:</strong> ${date} at ${time}</p>
            <p style="font-size:0.78rem; color:#5A5454; margin-top:0.85rem; line-height:1.6;">Our Senior Jewellery Stylist will prepare a dedicated private viewing suite and curated archival selections for you.</p>
          </div>
        `;
      }

      form.reset();
      this.closeModals();
      this.openModal('consultationConfirmModal');
      showToast('Bespoke Bridal Appointment Confirmed');
    }
  };

  // --- Initializer on DOM Ready ---
  document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    updateCartUI();
    updateWishlistUI();
    window.tallaStore.filterDiscoveryProducts();
    window.tallaStore.calculateGoldRate();

    // Backdrop click listener
    const backdrop = document.getElementById('drawerBackdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        window.tallaStore.closeModals();
      });
    }

    // Header scroll appearance
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    });

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        window.tallaStore.openDrawer('mobileNavDrawer');
      });
    }

    // New Arrivals slider buttons
    const arrivalsSlider = document.getElementById('arrivalsSlider');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    if (arrivalsSlider && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        arrivalsSlider.scrollBy({ left: -340, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        arrivalsSlider.scrollBy({ left: 340, behavior: 'smooth' });
      });
    }
  });

})();
