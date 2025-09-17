//! Filter Functionality
function filterItems(category) {
  let cards = document.querySelectorAll(".card");
  let buttons = document.querySelectorAll("#filter_btns>button");

  cards.forEach((card) => {
    if (category == "all") {
      card.style.display = "flex";
    } else {
      if (card.classList.contains(category)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    }
  });
  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
}
//!Add to Cart Functionality
let cart = [];
let cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  // console.log(card);
  let name = card.querySelector(".card_one>.card_info>h2").innerText;
  let price = Number(
    card
      .querySelector(".card_one>.card_info>p")
      .innerText.replace("₹", "")
      .replace("/-", "")
  );
  let quantity = card.querySelector(".card_two>.card_quantity>.quantity");
  // console.log(name);
  // console.log(price);
  // console.log(quantity);
  let plusBtn = card.querySelector(".plus");
  plusBtn.addEventListener("click", () => {
    quantity.innerText = Number(quantity.innerText) + 1;
  });
  let minusBtn = card.querySelector(".minus");
  minusBtn.addEventListener("click", () => {
    let current = Number(quantity.innerText);
    if (current > 0) quantity.innerText = current - 1;
  });

  let addBtn = card.querySelector(".addToCart>button");
  addBtn.addEventListener("click", () => {
    let qty = Number(quantity.innerText);
    if (qty > 0) {
      let existingItem = cart.find((item) => item.name == name);
      if (existingItem) {
        existingItem.qty = qty;
      } else {
        cart.push({ name, qty, price });
        addBtn.style.background = "green";
      }
    } else {
      alert("Please add min of 1 item");
    }
    // quantity.innerText = 0;
    updateCart();
  });
});
function updateCart() {
  let totalQty = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    totalQty += item.qty;
    totalPrice += item.price * item.qty;
  });
  let cart_qty = document.getElementById("cart_quantity");
  let cart_price = document.getElementById("cart_price");

  cart_qty.innerText = totalQty;
  cart_price.innerText = `₹${totalPrice}.00`;

  let sidebar_items = document.getElementById("sidebar_items");
  sidebar_items.innerHTML = "";
  cart.forEach((item) => {
    sidebar_items.innerHTML += `<div class='items_info'>
    <h2>Product: ${item.name}</h2>
    <p>Quantity: ${item.qty}</p>
    <h3>Price: ₹${item.price}.00</h3>
    <button onclick='removeItem("${item.name}")'><i class="ri-delete-bin-line"></i></button>
    </div>
    <hr>
    `;
  });
}

function removeItem(name) {
  cart = cart.filter((item) => item.name != name);
  updateCart();
}

//! Sidebar Functionality
let cart_icon = document.getElementById("cart_icon");
let sidebar = document.getElementById("sidebar");
cart_icon.addEventListener("click", () => {
  sidebar.style.right = "0px";
});
let close_sidebar = document.getElementById("close_sidebar");
close_sidebar.addEventListener("click", () => {
  sidebar.style.right = "-350px";
});
