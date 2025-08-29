/************************************
 * ELEMENT SELECTORS
 ************************************/
const fvtBtn = document.querySelector("#fvtBtn");
const cartBtn = document.querySelector("#cartBtn");
const menuBtn = document.querySelector("#menuBtn");
const filterBtn = document.querySelector("#filterBtn");
const sortBtn = document.querySelector("#sortBtn");

const overlayBackground = document.querySelector("#overlay");
const favouritesOverlay = document.querySelector("#favorites-overlay");
const cartOverlay = document.querySelector("#cart-overlay");
const mobileMenuOverlay = document.querySelector("#mobile-menu-overlay");
const filterOverlay = document.querySelector("#filterOverlay");
const sortOverlay = document.querySelector("#sortOverlay");

const closeBtn = document.querySelectorAll(".close-btn");
const toggleOptionBtn = document.querySelectorAll(".toggle-options");
const cardFvtBtn = document.querySelectorAll(".favorite-btn");

const cartCounter = document.querySelector("#cartCounter");

const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const fvt = JSON.parse(localStorage.getItem("fvt")) || [];
const fvtCounter = document.querySelector("#fvt-count");
const fvtContent = document.querySelector("#favorites-overlay .cart-content");
const fvtTemplate = document.querySelector(
  "#favorites-overlay .cart-item.template"
);
const checkoutBtn = document.querySelector(".checkout-btn");
const checkoutOverlay = document.querySelector("#checkout-overlay");
const errorMsg = document.querySelectorAll(".error-message");
const backbtn = document.querySelector(".back-btn");
const orderBtn = document.querySelector(".place-order-btn");
const orderSummary = document.querySelector(".order-summary");
const orderTemplate = document.querySelector(".order-item.template");
const clearFvtBtn = document.getElementById("clearFvt");

/************************************
 * TOSTIFY FUNCTIONS
 ************************************/
function showToast(message, type = "info") {
  let bgColor;

  if (type === "success") {
    bgColor = "linear-gradient(to right, #38ef7d, #11998e)";
    // vibrant green success
  } else if (type === "error") {
    bgColor = "linear-gradient(to right, #ff4e50, #f9d423)";
    // strong red/orange error
  } else if (type === "info") {
    bgColor = "linear-gradient(to right, #00c6ff, #0072ff)";
    // clean blue info
  } else if (type === "warning") {
    bgColor = "linear-gradient(to right, #f7971e, #ffd200)";
    // bright yellow warning
  } else {
    bgColor = "linear-gradient(to right, #8e2de2, #4a00e0)";
    // fallback: stylish purple
  }

  Toastify({
    text: message,
    duration: 1000,
    gravity: "top",
    position: "right",
    style: {
      background: bgColor,
      color: "#fff",
      borderRadius: "8px",
      padding: "10px",
    },
    className: "toast-custom",
    stopOnFocus: true,
  }).showToast();
}

/************************************
 * OVERLAY FUNCTIONS
 ************************************/

// Open Favourites overlay
function fvtOverlay() {
  if (favouritesOverlay.classList.contains("active")) {
    favouritesOverlay.classList.remove("active");
    overlayBackground.classList.remove("active");
  }
  favouritesOverlay.classList.add("active");
  overlayBackground.classList.add("active");
  document.body.classList.add("no-scroll");
}
fvtBtn.addEventListener("click", fvtOverlay);

// Open Cart overlay
function cartOverlayFunc() {
  if (cartOverlay.classList.contains("active")) {
    cartOverlay.classList.remove("active");
    overlayBackground.classList.remove("active");
  } else {
    cartOverlay.classList.add("active");
    overlayBackground.classList.add("active");
    document.body.classList.add("no-scroll");
  }
}
cartBtn.addEventListener("click", cartOverlayFunc);

// Open Mobile Menu overlay
function menuOverlay() {
  if (mobileMenuOverlay.classList.contains("active")) {
    mobileMenuOverlay.classList.remove("active");
    overlayBackground.classList.remove("active");
  } else {
    mobileMenuOverlay.classList.add("active");
    overlayBackground.classList.add("active");
    document.body.classList.add("no-scroll");
  }
}
menuBtn.addEventListener("click", menuOverlay);

// Open Filter overlay
function filterOverlayFunc() {
  if (filterOverlay.classList.contains("active")) {
    filterOverlay.classList.remove("active");
  }
  filterOverlay.classList.add("active");
  document.body.classList.add("no-scroll");
}
filterBtn.addEventListener("click", filterOverlayFunc);

// Open Sort overlay
function sortOverlayFunc() {
  if (sortOverlay.classList.contains("active")) {
    sortOverlay.classList.remove("active");
  }
  sortOverlay.classList.add("active");
  document.body.classList.add("no-scroll");
}
sortBtn.addEventListener("click", sortOverlayFunc);

// Close all overlays (used by close buttons)
function closeOverlay() {
  [
    favouritesOverlay,
    cartOverlay,
    mobileMenuOverlay,
    filterOverlay,
    sortOverlay,
  ].forEach((panel) => panel.classList.remove("active"));
  overlayBackground.classList.remove("active");
  document.body.classList.remove("no-scroll");
}
closeBtn.forEach((btn) => btn.addEventListener("click", closeOverlay));

// Close filter/sort when clicking their own background
[filterOverlay, sortOverlay].forEach((panel) => {
  panel?.addEventListener("click", (e) => {
    if (e.target === panel) {
      panel.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
  });
});

// Close global overlays (favourites, cart, mobile menu) when clicking global background
overlayBackground?.addEventListener("click", () => {
  [favouritesOverlay, cartOverlay, mobileMenuOverlay].forEach((panel) =>
    panel?.classList.remove("active")
  );
  overlayBackground.classList.remove("active");
  document.body.classList.remove("no-scroll");
});

/************************************
 * FILTER OPTIONS TOGGLE (+ / -)
 ************************************/
toggleOptionBtn.forEach((element) => {
  element.addEventListener("click", () => {
    const optionList = element
      .closest(".filter-group")
      .querySelector(".filter-options-list");

    optionList.classList.toggle("active");
    element.textContent = optionList.classList.contains("active") ? "-" : "+";
  });
});

/************************************
 * HERO IMAGE (Responsive Swap)
 ************************************/
function updateHeroImage() {
  const heroImage = document.querySelector(".hero-image");
  if (window.innerWidth <= 768) {
    heroImage.src = "./assets/hero-img-small-screen.jpg";
  } else {
    heroImage.src = "./assets/hero-img.jpg";
  }
}
updateHeroImage(); // Initial call
window.addEventListener("resize", updateHeroImage);

/************************************
 * SCROLL REVEAL ANIMATION
 ************************************/
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementBottom = el.getBoundingClientRect().bottom;

    // Trigger when element is ~5% inside viewport
    const revealPoint = windowHeight * 0.95;

    if (elementTop < revealPoint && elementBottom > 0) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

// Throttle scroll for performance
let ticking = false;
function requestTick() {
  if (!ticking) {
    requestAnimationFrame(revealOnScroll);
    ticking = true;
  }
}
function handleScroll() {
  ticking = false;
  requestTick();
}

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("load", revealOnScroll);
document.addEventListener("DOMContentLoaded", revealOnScroll);

/************************************
 * CART LOGIC
 ************************************/

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function renderCart() {
  const cartContent = document.querySelector(".cart-content");
  const cartTotal = document.querySelector(".cart-total span:last-child");
  const template = document.querySelector(".cart-item.template");
  cartContent
    .querySelectorAll(".cart-item:not(.template)")
    .forEach((el) => el.remove());
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    // cloning html data
    const clone = template.cloneNode(true);

    clone.classList.remove("template");
    clone.style.display = "flex";
    clone.dataset.index = index;

    // fill in product data
    clone.querySelector(".cart-item-img").src = item.image;
    clone.querySelector(".cart-item-img").alt = item.title;
    clone.querySelector(".cart-item-title").textContent = item.title;
    clone.querySelector(
      ".cart-item-price"
    ).textContent = `$${item.price.toFixed(2)}`;
    clone.querySelector(".quantity-control span").textContent = item.quantity;

    cartContent.appendChild(clone);
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;

  cartCounter.innerHTML = cart.length;
  saveCart();
  if (cart.length === 0) {
    checkoutBtn.classList.add("disabled");
    checkoutBtn.disabled = true;
  } else {
    checkoutBtn.classList.remove("disabled");
    checkoutBtn.disabled = false;
  }
}
renderCart();

//adding product to cart
function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity++;
    showToast(`Product qunatity increased`, "info");
  } else {
    cart.push({ ...product, quantity: 1 });
    showToast(`Product added to cart`, "success");
  }
  renderCart();
}

//handling cart btns functions
document.querySelector(".cart-content").addEventListener("click", (e) => {
  let item1 = e.target.closest(".cart-item");
  if (!item1 || item1.classList.contains("template")) return;
  const idx = item1.dataset.index;
  if (e.target.classList.contains("inc")) {
    cart[idx].quantity++;
  }
  if (e.target.classList.contains("dec")) {
    cart[idx].quantity = Math.max(1, cart[idx].quantity - 1);
  }
  if (e.target.classList.contains("remove-btn")) {
    cart.splice(idx, 1);
    showToast(`Product removed to cart`, "error");
  }
  renderCart();
});
//init cart
renderCart();

addToCartBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    const product = {
      id: card.querySelector(".product-title").textContent,
      title: card.querySelector(".product-title").textContent,
      price: parseFloat(
        card.querySelector(".current-price").textContent.replace("$", "")
      ),
      image: card.querySelector(".product-image").src,
    };
    addToCart(product);
  });
});

/************************************
 * FVT LOGIC
 ************************************/
//saving to local storage
function saveFvt() {
  localStorage.setItem("fvt", JSON.stringify(fvt));
}

//rendering local storage items
function renderFvt() {
  fvtContent
    .querySelectorAll(".cart-item:not(.template)")
    .forEach((element) => {
      element.remove();
    });
  fvt.forEach((item, index) => {
    const clone = fvtTemplate.cloneNode(true);
    clone.classList.remove("template");
    clone.style.display = "flex";
    clone.dataset.index = index;
    clone.querySelector(".cart-item-img").src = item.image;
    clone.querySelector(".cart-item-img").alt = item.title;
    clone.querySelector(".cart-item-title").textContent = item.title;
    clone.querySelector(
      ".cart-item-price"
    ).textContent = `$${item.price.toFixed(2)}`;
    fvtContent.appendChild(clone);
  });
  fvtCounter.textContent = fvt.length;
  saveFvt();
  // ✅ Toggle clear button enable/disable
  if (fvt.length === 0) {
    clearFvtBtn.disabled = true;
    clearFvtBtn.classList.add("disabled");
  } else {
    clearFvtBtn.disabled = false;
    clearFvtBtn.classList.remove("disabled");
  }

  document.querySelectorAll(".favorite-btn").forEach((btn) => {
    const card = btn.closest(".product-card");
    const id = card.querySelector(".product-title").textContent;
    const icon = btn.querySelector("i");
    if (fvt.find((f) => f.id === id)) {
      btn.classList.add("active");
      icon.classList.remove("far"); //outline heart
      icon.classList.add("fas"); //solid heart
    } else {
      btn.classList.remove("active");
      icon.classList.add("far");
      icon.classList.remove("fas");
    }
  });
}

//adding to fvt
function addToFvt(product) {
  const exists = fvt.find((item) => item.id === product.id);
  if (!exists) {
    fvt.push(product);
    showToast(`Product added to Favorites`, "success");
  }
  renderFvt();
}

//removing from fvt
function removeFromFvt(id, showToastMsg = true) {
  const index = fvt.findIndex((item) => item.id === id);
  if (index !== -1) {
    fvt.splice(index, 1);
    if (showToastMsg) {
      showToast(`Product removed from Favorites`, "error");
    }
  }
  renderFvt();
}

//adding fucntions to btns
fvtContent.addEventListener("click", (e) => {
  const element1 = e.target.closest(".cart-item");
  const idx = element1.dataset.index;
  if (!element1 || element1.classList.contains("template")) {
    return;
  }
  if (
    e.target.classList.contains("remove-btn") ||
    e.target.closest(".remove-btn")
  ) {
    removeFromFvt(fvt[idx].id);
  }
  if (e.target.classList.contains("add-to-cart-from-fav")) {
    addToCart(fvt[idx]);
    removeFromFvt(fvt[idx].id, false);
  }
});
document.querySelectorAll(".favorite-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    const product = {
      id: card.querySelector(".product-title").textContent,
      title: card.querySelector(".product-title").textContent,
      price: parseInt(
        card.querySelector(".current-price").textContent.replace("$", "")
      ),
      image: card.querySelector(".product-image").src,
    };
    if (fvt.find((item) => item.id === product.id)) {
      removeFromFvt(product.id);
    } else {
      addToFvt(product);
    }
  });
});

//clearing fvt items list
clearFvtBtn.addEventListener("click", () => {
  fvt.length = 0;
  saveFvt();
  renderFvt();
  showToast("All favorites cleared!", "error");
});

renderFvt();

/************************************
 * CHECKOUT LOGIC
 ************************************/
function openCheckout() {
  if (checkoutBtn.disabled) {
    return;
  } else {
    checkoutOverlay.classList.add("active");
    renderOrderSummary();
    closeOverlay();
  }
}

function closeCheckout() {
  if (!checkoutOverlay.classList.contains("active")) {
    return;
  } else {
    checkoutOverlay.classList.remove("active");
  }
}

//adding validations onto input fields
orderBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let isValid = true;
  let firstInvalidInput = null;

  errorMsg.forEach((element) => {
    element.textContent = "";
  });

  const firstName = document.querySelector("#firstName");
  const lastName = document.querySelector("#lastName");
  const email = document.querySelector("#email");
  const phoneNumber = document.querySelector("#phone");
  const address = document.querySelector("#address");
  const city = document.querySelector("#city");
  const state = document.querySelector("#state");
  const zipCode = document.querySelector("#zipCode");
  const country = document.querySelector("#country");
  const notes = document.querySelector("#notes");

  // First name
  if (!/^[A-Za-z\s]{2,30}$/.test(firstName.value.trim())) {
    setError(firstName, "First name should be 2–30 letters only.");
    if (!firstInvalidInput) firstInvalidInput = firstName;
    isValid = false;
  }

  // Last name
  if (!/^[A-Za-z\s]{2,30}$/.test(lastName.value.trim())) {
    setError(lastName, "Last name should be 2–30 letters only.");
    if (!firstInvalidInput) firstInvalidInput = lastName;
    isValid = false;
  }

  // Email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    setError(email, "Enter a valid email address.");
    if (!firstInvalidInput) firstInvalidInput = email;
    isValid = false;
  }

  // Phone
  if (!/^\d{10,15}$/.test(phoneNumber.value.trim())) {
    setError(phoneNumber, "Phone number must be 10–15 digits.");
    if (!firstInvalidInput) firstInvalidInput = phoneNumber;
    isValid = false;
  }

  // Address
  if (!/^[A-Za-z0-9\s,.\-#/]{5,100}$/.test(address.value.trim())) {
    setError(address, "Enter a valid street address (min 5 characters).");
    if (!firstInvalidInput) firstInvalidInput = address;
    isValid = false;
  }

  // City
  if (!/^[A-Za-z\s]{2,50}$/.test(city.value.trim())) {
    setError(city, "City must contain only letters (min 2 characters).");
    if (!firstInvalidInput) firstInvalidInput = city;
    isValid = false;
  }

  // State
  if (!state.value) {
    setError(state, "Please select a state.");
    if (!firstInvalidInput) firstInvalidInput = state;
    isValid = false;
  }

  // ZIP
  if (!/^[A-Za-z0-9]{4,10}$/.test(zipCode.value.trim())) {
    setError(zipCode, "ZIP code must be 4–10 characters (letters/numbers).");
    if (!firstInvalidInput) firstInvalidInput = zipCode;
    isValid = false;
  }

  // Country
  if (country.value.toLowerCase() !== "pakistan") {
    setError(country, "Country must be Pakistan.");
    if (!firstInvalidInput) firstInvalidInput = country;
    isValid = false;
  }

  // Notes
  if (notes.value.length > 500) {
    setError(notes, "Notes cannot exceed 500 characters.");
    if (!firstInvalidInput) firstInvalidInput = notes;
    isValid = false;
  }
  const dangerousScript = /<script|<\/script>|onerror=|onload=|javascript:/i;
  if (dangerousScript.test(notes.value.trim())) {
    setError(notes, "Notes contain forbidden content.");
    if (!firstInvalidInput) firstInvalidInput = notes;
    isValid = false;
  }
  if (!/^[a-zA-Z0-9\s.,!?'"()\-]*$/.test(notes.value.trim())) {
    setError(notes, "Notes contain invalid symbols.");
    if (!firstInvalidInput) firstInvalidInput = notes;
    isValid = false;
  }

  // Scroll to first invalid input
  if (!isValid && firstInvalidInput) {
    firstInvalidInput.scrollIntoView({ behavior: "smooth", block: "center" });
    firstInvalidInput.focus();
    return false;
  }
  //GENERATE ORDER NUMBER IF ALL DATA IS GOOD
  if (isValid) {
    const orderNumber = Math.floor(100000 + Math.random() * 900000); // 6-digit

    showNotification(
      `✅ Thank you for your order!\nYour Order #${orderNumber} has been placed successfully.`
    );

    document.querySelector("form").reset();

    setTimeout(() => {
      cart.length = 0;
      saveCart();
      renderCart();
      closeOverlay();
      closeCheckout();
    }, 2000);
  }
});

// NOTIFCATION FOR ORDER NUMBER
function showNotification(message) {
  let notification = document.createElement("div");
  notification.className = "custom-notification";
  notification.innerText = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 2000);
}

function setError(inputEl, msg) {
  const formGroup = inputEl.closest(".form-group");
  if (!formGroup) return;

  const errorSpan = formGroup.querySelector(".error-message");
  if (errorSpan) {
    errorSpan.textContent = msg;
    errorSpan.style.display = "block";
  }
}

function clearError(inputEl) {
  const formGroup = inputEl.closest(".form-group");
  if (!formGroup) return;

  const errorSpan = formGroup.querySelector(".error-message");
  if (errorSpan) {
    errorSpan.textContent = "";
    errorSpan.style.display = "none";
  }
}

/************************************
 *ORDER SUMMARY LOGIC
 ************************************/
function renderOrderSummary() {
  orderSummary
    .querySelectorAll(".order-item:not(.template)")
    .forEach((element) => {
      element.remove();
    });
  let subTotal = 0;
  cart.forEach((item) => {
    subTotal += item.price * item.quantity;

    const clone = orderTemplate.cloneNode(true);
    clone.classList.remove("template");
    clone.style.display = "flex";

    clone.querySelector(".order-item-img").src = item.image;
    clone.querySelector(".order-item-img").alt = item.title;
    clone.querySelector(".order-item-name").textContent = item.title;
    clone.querySelector(
      ".order-item-qty"
    ).textContent = `Qty: ${item.quantity}`;
    clone.querySelector(".order-item-price").textContent = `$${(
      item.price * item.quantity
    ).toFixed(2)}`;

    orderSummary.appendChild(clone);
  });
  const shipping = 15;
  const tax = subTotal * 0.18;
  const total = shipping + tax + subTotal;

  document.querySelector("#subtotal").textContent = `$${subTotal.toFixed(2)}`;
  document.querySelector("#shipping").textContent = `$${shipping.toFixed(2)}`;
  document.querySelector("#tax").textContent = `$${tax.toFixed(2)}`;
  document.querySelector("#grand-total").textContent = `$${total.toFixed(2)}`;
}

checkoutBtn.addEventListener("click", openCheckout);
