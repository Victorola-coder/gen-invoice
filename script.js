async function generateInvoice() {
  const clientName = document.getElementById("clientName").value;
  const projectName = document.getElementById("projectName").value;
  const date = document.getElementById("date").value;

  const components = {
    "UI/UX Design": Number(document.getElementById("uiux").value) || 0,
    "Web Development": Number(document.getElementById("web").value) || 0,
    "Backend Development":
      Number(document.getElementById("backend").value) || 0,
    "Mobile Development": Number(document.getElementById("mobile").value) || 0,
    "Server Costs": Number(document.getElementById("server").value) || 0,
  };

  const customComponents = document.querySelectorAll(".custom-component");
  customComponents.forEach((component) => {
    const description = component.querySelector(".custom-description").value;
    const amount = Number(component.querySelector(".custom-amount").value) || 0;
    if (description && amount) {
      components[description] = amount;
    }
  });

  const total = Object.values(components).reduce((acc, curr) => acc + curr, 0);

  const invoiceHTML = `
        <div class="invoice-header">
            <div>
                <h2>INVOICE</h2>
                <p>Date: ${date}</p>
                <p>Client: ${clientName}</p>
                <p>Project: ${projectName}</p>
            </div>
            <div>
                <h3>SohcaHToA Platform</h3>
                <p>Invoice #: ${generateInvoiceNumber()}</p>
            </div>
        </div>
        
        <div class="invoice-items">
            <table style="width: 100%">
                <thead>
                    <tr>
                        <th style="text-align: left">Component</th>
                        <th style="text-align: right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(components)
                      .filter(([_, amount]) => amount > 0)
                      .map(
                        ([component, amount]) => `
                            <tr>
                                <td>${component}</td>
                                <td style="text-align: right">$${amount.toLocaleString()}</td>
                            </tr>
                        `
                      )
                      .join("")}
                </tbody>
            </table>
        </div>
        
        <div class="invoice-total">
            <h3>Total: $${total.toLocaleString()}</h3>
        </div>
    `;

  const invoiceSection = document.getElementById("invoice");
  invoiceSection.innerHTML = invoiceHTML;
  invoiceSection.classList.remove("hidden");
}

function generateInvoiceNumber() {
  return "INV-" + Date.now().toString().slice(-6);
}

function addNewItem() {
  const componentInputs = document.querySelector(".component-inputs");

  const newComponent = document.createElement("div");
  newComponent.className = "custom-component";

  newComponent.innerHTML = `
      <input type="text" placeholder="Item Description" class="custom-description">
      <input type="number" placeholder="Amount" class="custom-amount">
      <button type="button" class="remove-btn" onclick="removeItem(this)">×</button>
  `;

  componentInputs.appendChild(newComponent);
}

function removeItem(button) {
  button.parentElement.remove();
}
