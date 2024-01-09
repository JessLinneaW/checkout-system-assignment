let products = [];


function addProduct() {

  let productName = document.getElementById("productName").value;
  let product = { name: productName };
  products.push(product);
  
  let productList = document.getElementById("productList");
  let newOption = document.createElement("option");
  newOption.value = productName;
  newOption.text = productName;
  productList.add(newOption);

  document.getElementById("productName").value = "";
}



function addPrice() {
  let selectedProduct = document.getElementById("productList").value;
  let price = document.getElementById("productPrice").value;
  let productPrice = parseFloat(price).toFixed(2);

  for (let i = 0; i < products.length; i++) {
    if (products[i].name === selectedProduct) {
      products[i].price = productPrice;
      break;
    }
  }

  let listMenu = document.getElementById("listMenu");

  let productExists = false;

  for (let i = 0; i < listMenu.options.length; i++) {
    if (listMenu.options[i].value === selectedProduct) {
      productExists = true;
      break;
    }
  }

  if (!productExists) {
    let option = document.createElement("option");
    option.text = selectedProduct + " - $" + productPrice;
    option.value = selectedProduct;
    listMenu.add(option);
  }

  document.getElementById("productPrice").value = "";
}



function newTransaction() {
  let receiptTableBody = document.getElementById("receiptTableBody");
 
  while (receiptTableBody.firstChild) {
    receiptTableBody.removeChild(receiptTableBody.firstChild);
  }

  let subtotalCell = document.getElementById("subtotal");
  subtotalCell.innerHTML = "";
  let taxCell = document.getElementById("tax");
  taxCell.innerHTML = "";
  let totalCell = document.getElementById("total");
  totalCell.innerHTML = "";
  let timeInfo = document.getElementsByClassName("time-info")[0];
  let dateInfoCell = timeInfo.getElementsByTagName("li")[0];
  dateInfoCell.innerHTML = "<strong>Date:</strong> "
  let timeInfoCell = timeInfo.getElementsByTagName("li")[1];
  timeInfoCell.innerHTML = "<strong>Time:</strong> "
}



function addUnits() {
  let currentDate = new Date();
  let formattedDate = currentDate.toLocaleDateString();
  let formattedTime = currentDate.toLocaleTimeString();

  let selectedProduct = document.getElementById("productList").value;
  let productUnits = document.getElementById("productUnits").value;
  let i=0;

  for (i = 0; i < products.length; i++) {
    if (products[i].name === selectedProduct) {
      products[i].units = productUnits;
      break;
    }
  }

  let receiptTableBody = document.getElementById("receiptTableBody");
  let newRow = receiptTableBody.insertRow();
  let descriptionCell = newRow.insertCell();
  let ppuCell = newRow.insertCell();
  let quantityCell = newRow.insertCell();
  let priceCell = newRow.insertCell();

  descriptionCell.innerHTML = selectedProduct;
  ppuCell.innerHTML = products[i].price;
  quantityCell.innerHTML = products[i].units;
  let price = products[i].price * products[i].units;
  priceCell.innerHTML = price.toFixed(2);

  let subtotal = 0;
  for (i = 0; i < products.length; i++) {
    subtotal += products[i].price * products[i].units;
  }
  let tax = subtotal * 0.05;
  let total = subtotal + tax;

  let subtotalCell = document.getElementById("subtotal");
  subtotalCell.innerHTML = subtotal.toFixed(2);
  let taxCell = document.getElementById("tax");
  taxCell.innerHTML = tax.toFixed(2);
  let totalCell = document.getElementById("total");
  totalCell.innerHTML = total.toFixed(2);

  let timeInfo = document.getElementsByClassName("time-info")[0];
  let dateInfoCell = timeInfo.getElementsByTagName("li")[0];
  let timeInfoCell = timeInfo.getElementsByTagName("li")[1];
  dateInfoCell.innerHTML = "<strong>Date:</strong> " + formattedDate;
  timeInfoCell.innerHTML = "<strong>Time:</strong> " + formattedTime;

  document.getElementById("productUnits").value = "";
}



function pay(){
  document.getElementById("message").innerHTML= "Thank you for your purchase.";
}



function handler(event) {
  console.log("handler() function called");
  let productUnitsInput = document.getElementById("productUnits");
  let units = productUnitsInput.value ? parseInt(productUnitsInput.value) : 0;
  let newUnits = parseInt(event.target.textContent);
  productUnitsInput.value = units * 10 + newUnits;
}
  
Array.from(
  document.getElementsByTagName("td")
).forEach(
  (td) => {
    td.addEventListener("click", handler)
  }
)