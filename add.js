const cars = [
  { id: 1, make: 'Chevrolet', model: 'Bel Air', year: 1957, price: 65000, mileage: 45000, engine: 'V8', image: 'https://via.placeholder.com/400x220/212121/fff?text=Bel+Air+1957', description: 'Iconic American classic with stunning fins and chrome.', status: 'Available', badge: 'Featured' },
  { id: 2, make: 'Ford', model: 'Mustang Shelby GT500', year: 1967, price: 180000, mileage: 22000, engine: 'V8 Big-Block', image: 'https://via.placeholder.com/400x220/cc0000/fff?text=Shelby+GT500', description: 'A legendary muscle car with raw power and timeless appeal.', status: 'Available' },
  { id: 3, make: 'Volkswagen', model: 'Beetle', year: 1963, price: 25000, mileage: 80000, engine: 'Flat-4', image: 'https://via.placeholder.com/400x220/007bff/fff?text=VW+Beetle+1963', description: 'The beloved "Bug", a symbol of counter-culture and practicality.', status: 'Sold', badge: 'Sold' },
  { id: 4, make: 'Jaguar', model: 'E-Type Series 1', year: 1961, price: 250000, mileage: 30000, engine: 'Inline-6', image: 'https://via.placeholder.com/400x220/28a745/fff?text=Jaguar+E-Type', description: 'Often called the most beautiful car ever made.', status: 'Available' },
  { id: 5, make: 'Porsche', model: '911 Carrera RS', year: 1973, price: 550000, mileage: 50000, engine: 'Flat-6', image: 'https://via.placeholder.com/400x220/ffc107/212121?text=Porsche+911+RS', description: 'A lightweight, homologation special, highly sought after.', status: 'Available', badge: 'Just Arrived' },
  { id: 6, make: 'Mercedes-Benz', model: '300SL Gullwing', year: 1955, price: 1200000, mileage: 15000, engine: 'Inline-6', image: 'https://via.placeholder.com/400x220/6c757d/fff?text=MB+300SL', description: 'Iconic gullwing doors and racing pedigree.', status: 'Available' },
  { id: 7, make: 'Ferrari', model: '250 GTO', year: 1962, price: 48000000, mileage: 5000, engine: 'V12', image: 'https://via.placeholder.com/400x220/dc3545/fff?text=Ferrari+250+GTO', description: 'The holy grail of classic cars, extremely rare and valuable.', status: 'Sold', badge: 'Sold' },
  { id: 8, make: 'Aston Martin', model: 'DB5', year: 1964, price: 950000, mileage: 60000, engine: 'Inline-6', image: 'https://via.placeholder.com/400x220/17a2b8/fff?text=Aston+Martin+DB5', description: 'The James Bond car, epitome of British style and performance.', status: 'Available' },
  { id: 9, make: 'Cadillac', model: 'Eldorado Biarritz', year: 1959, price: 120000, mileage: 70000, engine: 'V8', image: 'https://via.placeholder.com/400x220/e83e8c/fff?text=Cadillac+Eldorado', description: 'Peak of American automotive extravagance with massive tailfins.', status: 'Available', badge: 'Featured' },
  { id: 10, make: 'BMW', model: '2002 Turbo', year: 1974, price: 90000, mileage: 55000, engine: 'Turbo Inline-4', image: 'https://via.placeholder.com/400x220/fd7e14/fff?text=BMW+2002+Turbo', description: 'One of the first turbocharged production cars, a driver\'s delight.', status: 'Available', badge: 'Just Arrived' },
  { id: 11, make: 'Lancia', model: 'Stratos HF Stradale', year: 1975, price: 450000, mileage: 35000, engine: 'V6 (Ferrari Dino)', image: 'https://via.placeholder.com/400x220/20c997/fff?text=Lancia+Stratos', description: 'Legendary rally champion with a distinctive wedge shape.', status: 'Sold', badge: 'Sold' },
  { id: 12, make: 'Toyota', model: '2000GT', year: 1967, price: 750000, mileage: 40000, engine: 'Inline-6', image: 'https://via.placeholder.com/400x220/6610f2/fff?text=Toyota+2000GT', description: 'Japan\'s first supercar, known for its beauty and refinement.', status: 'Available' },
];

// Shared page behaviour. All changes are temporary data in the browser.
const money = value => "$" + Number(value).toLocaleString("en-US");
const byId = id => document.getElementById(id);

function showMessage(id, message) {
 const target = byId(id);
 if (target) target.textContent = message;
}

function makeCarCard(car) {
 const card = document.createElement("article");
 card.className = "car-card";
 const image = document.createElement("img");
 image.src = car.image;
 image.alt = car.make + " " + car.model;
 const content = document.createElement("div");
 content.className = "card-content";
 content.innerHTML = `<h3>${car.year} ${car.make} ${car.model}</h3>
  <p>Price: ${money(car.price)}</p><p>Mileage: ${Number(car.mileage).toLocaleString()} km</p>
  <p>Status: ${car.status}</p>`;
 if (car.status === "Available") {
  const add = document.createElement("button");
  add.className = "button";
  add.type = "button";
  add.textContent = "Add to cart";
  add.addEventListener("click", () => {
   cart.push(car);
   showMessage("cart-message", "Car added to your cart.");
   if (document.body.dataset.page === "cart") renderCart();
  });
  content.appendChild(add);
 }
 card.append(image, content);
 return card;
}

let cart = [];

function renderCars(list, targetId) {
 const target = byId(targetId);
 if (!target) return;
 target.replaceChildren();
 list.forEach(car => target.appendChild(makeCarCard(car)));
 if (!list.length) target.textContent = "No cars match your search.";
}

function renderCart() {
 const target = byId("cart-items");
 if (!target) return;
 target.replaceChildren();
 if (!cart.length) target.textContent = "Your cart is empty.";
 cart.forEach((car, index) => {
  const row = document.createElement("p");
  row.textContent = `${car.year} ${car.make} ${car.model} — ${money(car.price)} `;
  const remove = document.createElement("button");
  remove.className = "text-button";
  remove.textContent = "Remove";
  remove.addEventListener("click", () => { cart.splice(index, 1); renderCart(); });
  row.appendChild(remove);
  target.appendChild(row);
 });
 const total = cart.reduce((sum, car) => sum + Number(car.price), 0);
 showMessage("cart-summary", `Items: ${cart.length} | Subtotal: ${money(total)} | Tax estimate (5%): ${money(total * .05)} | Total: ${money(total * 1.05)}`);
}

function setupPage() {
 document.querySelectorAll('input[type="tel"]').forEach(input => {
  const checkPhone = () => {
   const digitCount = input.value.replace(/\D/g, "").length;
   input.setCustomValidity(digitCount >= 11 ? "" : "Phone number must contain at least 11 numbers.");
  };
  input.addEventListener("input", checkPhone);
  input.addEventListener("blur", checkPhone);
 });
 const menu = byId("menu-button");
 if (menu) menu.addEventListener("click", () => byId("main-nav").classList.toggle("open"));

 if (byId("featured-cars")) renderCars(cars.filter(car => car.status === "Available").slice(0, 3), "featured-cars");

 if (byId("car-list")) {
  renderCars(cars, "car-list");
  byId("search-form").addEventListener("submit", event => {
   event.preventDefault();
   const term = byId("search").value.toLowerCase();
   const max = Number(byId("max-price").value || Infinity);
   const year = Number(byId("year-from").value || 0);
   const status = byId("status").value;
   const filtered = cars.filter(car =>
    (car.make + " " + car.model).toLowerCase().includes(term) &&
    car.price <= max && car.year >= year && (!status || car.status === status)
   );
   renderCars(filtered, "car-list");
   showMessage("search-count", `${filtered.length} car(s) found.`);
  });
  byId("reset-search").addEventListener("click", () => {
   setTimeout(() => { renderCars(cars, "car-list"); showMessage("search-count", "Showing all cars."); }, 0);
  });
 }

 if (byId("compare-form")) {
  const first = byId("compare-one"), second = byId("compare-two");
  cars.forEach(car => {
   const label = `${car.year} ${car.make} ${car.model}`;
   first.add(new Option(label, car.id));
   second.add(new Option(label, car.id));
  });
  first.selectedIndex = 0; second.selectedIndex = 1;
  let comparisonPair = null;
  byId("compare-form").addEventListener("submit", event => {
   event.preventDefault();
   const a = cars.find(car => car.id === Number(first.value));
   const b = cars.find(car => car.id === Number(second.value));
   if (!a || !b || a.id === b.id) { showMessage("compare-feedback", "Choose two different cars."); return; }
   const fields = ["make", "model", "year", "price", "mileage", "engine", "status"];
   comparisonPair = [a, b];
   byId("comparison").innerHTML = `<table><thead><tr><th>Specification</th><th>${a.make} ${a.model}</th><th>${b.make} ${b.model}</th></tr></thead><tbody>${fields.map(key => `<tr><th>${key}</th><td>${key === "price" ? money(a[key]) : a[key]}</td><td>${key === "price" ? money(b[key]) : b[key]}</td></tr>`).join("")}</tbody></table>`;
   showMessage("compare-feedback", "Cars compared successfully.");
  });
  byId("save-comparison").addEventListener("click", () => {
   if (!comparisonPair) { showMessage("compare-feedback", "Compare two cars first."); return; }
   showMessage("saved-comparison", `${comparisonPair[0].make} ${comparisonPair[0].model} and ${comparisonPair[1].make} ${comparisonPair[1].model} saved successfully.`);
  });
  byId("remove-comparison").addEventListener("click", () => showMessage("saved-comparison", "Saved comparison removed."));
 }

 if (byId("cart-items")) {
  renderCart();
  byId("checkout-button").addEventListener("click", () => {
   if (!cart.length) { showMessage("cart-message", "Add a car before checkout."); return; }
   byId("checkout-section").hidden = false;
  });
  byId("checkout-form").addEventListener("submit", event => {
   event.preventDefault();
   const form = event.currentTarget;
   if (!form.reportValidity()) return;
   showMessage("cart-message", "Your order has been placed successfully.");
   cart = [];
   renderCart();
   form.reset();
   byId("checkout-section").hidden = true;
  });
 }

 if (byId("login-form")) {
  const passwordRule = /^(?=.*[0-9]).{8,}$/;

  byId("login-form").addEventListener("submit", event => {
   event.preventDefault();
   const form = event.currentTarget;
   if (!form.reportValidity()) return;
   if (!passwordRule.test(form.elements.password.value)) {
    showMessage("login-message", "Password must contain at least 8 characters and one number.");
    return;
   }
   const role = form.elements.role.value;
   showMessage("login-message", "Login successful. Opening the " + role + " dashboard.");
   const dashboards = { buyer: "buyer.html", seller: "seller.html", inspector: "inspector.html", admin: "admin.html" };
   window.location.href = dashboards[role];
  });

  byId("register-form").addEventListener("submit", event => {
   event.preventDefault();
   const form = event.currentTarget;
   if (!form.reportValidity()) return;
   if (!passwordRule.test(form.elements.password.value)) {
    showMessage("register-message", "Password must contain at least 8 characters and one number.");
    return;
   }
   if (form.elements.password.value !== form.elements.confirm.value) {
    showMessage("register-message", "Passwords do not match.");
    return;
   }
   showMessage("register-message", "Account created successfully.");
   form.reset();
  });
 }
 if (byId("profile-form")) {
  byId("profile-form").addEventListener("submit", event => {
   event.preventDefault();
   if (!event.currentTarget.reportValidity()) return;
   showMessage("profile-message", "Profile updated successfully.");
  });
  byId("delete-profile").addEventListener("click", () => showMessage("profile-message", "Profile deletion requested."));
 }

 if (byId("contact-form")) {
  byId("contact-form").addEventListener("submit", event => {
   event.preventDefault();
   if (!event.currentTarget.reportValidity()) return;
   showMessage("contact-message", "Your message has been sent successfully.");
   event.currentTarget.reset();
  });
 }
}

document.addEventListener("DOMContentLoaded", setupPage);
