document.addEventListener("DOMContentLoaded", () => {
 const inventory = document.getElementById("admin-cars");
 let nextId = 100;

 function drawCars() {
  inventory.replaceChildren();
  cars.forEach(car => {
   const row = inventory.insertRow();
   row.insertCell().textContent = `${car.make} ${car.model}`;
   row.insertCell().textContent = car.year;
   row.insertCell().textContent = Number(car.price).toLocaleString();
   row.insertCell().textContent = car.status;

   const actions = row.insertCell();
   const edit = document.createElement("button");
   edit.className = "text-button";
   edit.textContent = "Edit";
   edit.addEventListener("click", () => {
    const form = document.getElementById("admin-car-form");
    ["make", "model", "year", "price", "mileage", "engine", "description", "status"]
     .forEach(key => form.elements[key].value = car[key] ?? "");
    form.elements.id.value = car.id;
   });

   const remove = document.createElement("button");
   remove.className = "text-button";
   remove.textContent = "Delete";
   remove.addEventListener("click", () => {
    const index = cars.findIndex(item => item.id === car.id);
    if (index >= 0) cars.splice(index, 1);
    drawCars();
   });

   actions.append(edit, document.createTextNode(" "), remove);
  });
 }

 drawCars();

 document.getElementById("admin-car-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const id = Number(data.get("id"));
  const vehicle = {
   id: id || nextId++,
   make: data.get("make"),
   model: data.get("model"),
   year: Number(data.get("year")),
   price: Number(data.get("price")),
   mileage: Number(data.get("mileage")),
   engine: data.get("engine"),
   description: data.get("description"),
   status: data.get("status")
  };

  const existing = cars.findIndex(car => car.id === id);
  if (existing >= 0) cars[existing] = vehicle;
  else cars.push(vehicle);

  drawCars();
  form.reset();
  form.elements.id.value = "";
  document.getElementById("admin-car-message").textContent = "Vehicle details saved successfully.";
 });

 document.getElementById("admin-user-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const row = document.getElementById("admin-users").insertRow();
  [data.get("name"), data.get("email"), data.get("role")]
   .forEach(value => row.insertCell().textContent = value);

  const actions = row.insertCell();
  const change = document.createElement("button");
  change.className = "text-button";
  change.textContent = "Change role";
  change.addEventListener("click", () => {
   const roles = ["Buyer", "Seller", "Inspector", "Admin"];
   const current = row.cells[2].textContent;
   row.cells[2].textContent = roles[(roles.indexOf(current) + 1) % roles.length];
  });

  const remove = document.createElement("button");
  remove.className = "text-button";
  remove.textContent = "Suspend / Remove";
  remove.addEventListener("click", () => row.remove());
  actions.append(change, document.createTextNode(" "), remove);

  document.getElementById("admin-user-message").textContent = "User added successfully.";
  form.reset();
 });

 document.querySelectorAll(".remove-user").forEach(button => {
  button.addEventListener("click", () => button.closest("tr").remove());
 });

 document.querySelectorAll(".update-order").forEach(button => {
  button.addEventListener("click", () => {
   const row = button.closest("tr");
   row.cells[3].textContent = "Paid";
   row.cells[4].textContent = "Completed";
  });
 });

 document.querySelectorAll(".approve-consignment, .reject-consignment").forEach(button => {
  button.addEventListener("click", () => {
   button.closest("tr").cells[2].textContent =
    button.classList.contains("approve-consignment") ? "Approved" : "Rejected";
  });
 });

 document.getElementById("settings-form").addEventListener("submit", event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  document.getElementById("settings-message").textContent = "Settings updated successfully.";
 });
});
