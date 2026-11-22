document.addEventListener("DOMContentLoaded", () => {
 const form = document.getElementById("saved-search-form");
 const list = document.getElementById("saved-search-list");
 function addSavedSearch(values) {
  const item = document.createElement("li");
  const summary = document.createElement("span");
  summary.textContent = `${values.make} ${values.model || ""} — up to ${values.price}`;
  const edit = document.createElement("button");
  edit.type = "button"; edit.className = "text-button"; edit.textContent = "Edit";
  edit.addEventListener("click", () => {
   Object.keys(values).forEach(key => { if (form.elements[key]) form.elements[key].value = values[key]; });
   item.remove();
  });
  const remove = document.createElement("button");
  remove.type = "button"; remove.className = "text-button"; remove.textContent = "Delete";
  remove.addEventListener("click", () => item.remove());
  item.append(summary, document.createTextNode(" "), edit, document.createTextNode(" "), remove);
  list.appendChild(item);
 }
 form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  addSavedSearch(Object.fromEntries(data.entries()));
  form.reset();
 });
 document.querySelectorAll(".cancel-order").forEach(button => {
  button.addEventListener("click", () => button.closest("tr").lastElementChild.textContent = "Cancellation requested successfully");
 });
});
