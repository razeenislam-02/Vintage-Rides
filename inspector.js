document.addEventListener("DOMContentLoaded", () => {
 const form = document.getElementById("inspection-form");
 const queue = document.getElementById("inspection-queue");
 document.getElementById("assignment-form").addEventListener("submit", event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  const data = new FormData(event.currentTarget);
  const row = queue.insertRow();
  [data.get("vehicle"), data.get("seller"), "Not set", "Assigned"].forEach(value => row.insertCell().textContent = value);
  document.getElementById("assignment-message").textContent = "Inspection assignment added successfully.";
  event.currentTarget.reset();
 });
 const history = document.getElementById("inspection-history");
 let latestDraft = null;
 form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  latestDraft = Object.fromEntries(data.entries());
  const item = document.createElement("li");
  item.textContent = `${data.get("vehicle")} — report submitted; rating ${data.get("rating")}/10 `;
  const remove = document.createElement("button");
  remove.type = "button"; remove.className = "text-button delete-report"; remove.textContent = "Delete draft";
  item.appendChild(remove);
  history.appendChild(item);
  document.getElementById("inspection-message").textContent = "Inspection report submitted successfully.";
  form.reset();
 });
 history.addEventListener("click", event => {
  if (event.target.classList.contains("delete-report")) event.target.closest("li").remove();
 });
 document.getElementById("edit-latest-report").addEventListener("click", () => {
  if (!latestDraft) {
   document.getElementById("inspection-message").textContent = "No draft report is available to edit.";
   return;
  }
  Object.keys(latestDraft).forEach(key => { if (form.elements[key]) form.elements[key].value = latestDraft[key]; });
  document.getElementById("inspection-message").textContent = "Latest draft loaded into the form for editing.";
 });
});
