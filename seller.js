document.addEventListener("DOMContentLoaded", () => {
 const form = document.getElementById("consignment-form");
 const table = document.getElementById("seller-listings");
 let editingRow = null;

 form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const vehicle = `${data.get("year")} ${data.get("make")} ${data.get("model")}`;
  const price = Number(data.get("price")).toLocaleString();
  if (editingRow) {
   editingRow.cells[0].textContent = vehicle;
   editingRow.cells[1].textContent = price;
   editingRow.cells[2].textContent = "Pending review";
   editingRow = null;
  } else {
   const row = table.insertRow();
   row.insertCell().textContent = vehicle;
   row.insertCell().textContent = price;
   row.insertCell().textContent = "Pending review";
   const actions = row.insertCell();
   actions.innerHTML = '<button class="text-button edit-listing" type="button">Edit</button> <button class="text-button withdraw-listing" type="button">Withdraw</button>';
  }
  document.getElementById("seller-message").textContent = "Vehicle submitted successfully.";
  form.reset();
 });

 table.addEventListener("click", event => {
  const row = event.target.closest("tr");
  if (!row) return;
  if (event.target.classList.contains("edit-listing")) {
   const parts = row.cells[0].textContent.split(" ");
   form.elements.year.value = parts.shift();
   form.elements.make.value = parts.shift();
   form.elements.model.value = parts.join(" ");
   form.elements.price.value = row.cells[1].textContent.replace(/,/g, "");
   form.elements.mileage.value = 0;
   form.elements.engine.value = "Update engine details";
   form.elements.condition.value = "Update vehicle condition details before submitting.";
   editingRow = row;
   document.getElementById("seller-message").textContent = "Edit the listing details in the form above. ";
  }
  if (event.target.classList.contains("withdraw-listing")) {
   row.remove();
   document.getElementById("seller-message").textContent = "Listing withdrawn successfully.";
  }
 });

 document.getElementById("seller-response-form").addEventListener("submit", event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  document.getElementById("seller-response-message").textContent = "Your response has been sent successfully.";
  event.currentTarget.reset();
 });
});
