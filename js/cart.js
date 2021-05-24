const cartName = "wealthCart";
const getCart = () => {
  let cart = localStorage.getItem(cartName);

  if (!cart) {
    localStorage.setItem(cartName, JSON.stringify([]));
    cart = localStorage.getItem(cartName);
  }

  return JSON.parse(cart);
};

//Syncing the price with item price and item quantity directly from local storage cart
const syncPrice = () => {
  let myCart = getCart();

  const total = myCart.reduce(
    (total, item) => (total += item.price * item.quantity),
    0
  );

  document.querySelector(
    "#total"
  ).innerHTML = `Total Amount:  <span>&#8358</span>   ${total}`;
  return total;
};

//Generating cart markup from local storage-cart
const getCartItems = () => {
  document.querySelector("#displayed").innerHTML = "";

  const cart = getCart();

  cart.forEach((item, index) => {
    const orders = `<div class="card"  data-id ="product${item.index}">
                <span>${index + 1}</span>
                                  <img src = "images/product${item.index}.png"/>
                                 <div> <p class ="name">${item.name}</p>
                                  <p>Currency: (&#8358)</p>
                                 <p  class ="price${item.index} price">${
      item.price * item.quantity
    }</p>
                                  <p class ="quantity${item.index}">${
      item.quantity
    }</p>
                                  <button onclick="increase(${
                                    item.index
                                  })" class ="increase${
      item.index
    }" id ="increase"> +</button>
                                  <button onclick="decrease(${
                                    item.index
                                  })"class ="decrease${
      item.index
    }" id ="decrease"> - </button>
                                  <br>
                                  <br>
                                  <button onclick = "remove(${
                                    item.index
                                  })" class ="remove${
      item.index
    }" id ="remove">Remove</button>
                                  </div>
                      </div>`;
    document.querySelector("#displayed").innerHTML += orders;
  });
};

getCartItems();
syncPrice();

//increasing with the (+) button
const increase = (index) => {
  const cart = getCart();

  const flow = cart.find((item) => item.index == index);

  if (flow) {
    const itemIndex = cart.findIndex((item) => item.index == index);

    cart[itemIndex].quantity = flow.quantity + 1;

    document.querySelector(".quantity" + index).innerHTML = flow.quantity;

    document.querySelector(".price" + index).innerHTML =
      flow.price * flow.quantity;
  }

  localStorage.setItem(cartName, JSON.stringify(cart));
  syncPrice();
};

const addMsg = document.querySelector(".test");

//decreasing with the minus (-) button
const decrease = (index) => {
  const cart = getCart();

  const flow = cart.find((item) => item.index == index);

  const itemIndex = cart.findIndex((item) => item.index == index);

  if (cart[itemIndex].quantity > 1) {
    cart[itemIndex].quantity = flow.quantity - 1;

    document.querySelector(".quantity" + index).innerHTML = flow.quantity;
  } else {
    addMsg.innerHTML = `Do you want to remove ${flow.name}? <br>if yes, kindly use the remove button below`;
    addMsg.classList.add("msg");
    setTimeout(() => {
      addMsg.classList.remove("msg");
    }, 1500);
  }
  document.querySelector(".price" + index).innerHTML =
    flow.price * flow.quantity;

  localStorage.setItem(cartName, JSON.stringify(cart));

  syncPrice();
};

//removing item with the remove button
const remove = (index) => {
  const cart = getCart();

  const findItem = cart.find((item) => item.index == index);
  if (findItem) {
    const itemIndex = cart.findIndex((item) => item.index == index);
    cart.splice(itemIndex, 1);

    localStorage.setItem(cartName, JSON.stringify(cart));
  }

  syncPrice();

  getCartItems();
};

document.querySelector("#shopRedirect").onclick = () => {
  window.location.href = "index.html#Shop";
};

//form validation
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const tel = document.querySelector("#tel");
const errorMsg1 = document.querySelector(".errorMsg1");
const errorMsg2 = document.querySelector(".errorMsg2");
const errorMsg3 = document.querySelector(".errorMsg3");

(function formInputValidation() {
  name.addEventListener("blur", () => {
    if (name.value === "" || name.value < 0) {
      errorMsg1.innerHTML = "Please enter your name";
    } else {
      errorMsg1.innerHTML = "";
    }
  });
  email.addEventListener("blur", () => {
    if (email.value === "" || !email.value.includes("@")) {
      errorMsg2.innerHTML = "Please enter a valid email address";
    } else {
      errorMsg2.innerHTML = "";
    }
  });

  tel.addEventListener("blur", () => {
    if (Number.isNaN(parseInt(tel.value)) || tel.value == "") {
      errorMsg3.innerHTML = "Input can only be numbers";
    } else if (tel.value.length < 11) {
      errorMsg3.innerHTML = "Phone numbers cannot be less than 11 digits";
    } else {
      errorMsg3.innerHTML = "";
    }
  });
})();

function payWithPaystack() {
  console.log("test");
  let handler = PaystackPop.setup({
    key: "pk_test_c8d49ba5c7751a42402cb85eeb58485e3bb3d0f6", // Replace with your public key
    email: document.getElementById("email").value,
    amount: syncPrice() * 100,
    // amount: syncPrice() * 100,
    ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    onClose: function () {
      alert("Window closed.");
    },
    callback: function (response) {
      setTimeout(showSummary, 1000);
    },
  });
  handler.openIframe();
}

function clearCart() {
  let cart = getCart();
  cart.splice(0, cart.length);
  localStorage.setItem(cartName, JSON.stringify(cart));
  email.value = "";
  name.value = "";
  tel.value = "";

  closeModal();
  syncPrice();
  getCartItems();
}

// Get the modal<script>
const modal = document.getElementById("myModal");

const showSummary = () => {
  let cart = getCart();

  modal.style.display = "block";
  let names = document.getElementById("name").value;
  document.getElementById(
    "content-head"
  ).innerHTML = `<div class= summary-heading><h2>Thanks ${names}, your payment was successful</h2>
  
  <img id ='check' src= "images/check.svg"/>
  </div>`;

  document.getElementById(
    "content"
  ).innerHTML = `<div class = 'summary-subheading'>

  <span>S/No</span>
  <span>Name</span>
  <span>Quantity</span>
  </div>`;
  cart.forEach((item, index) => {
    document.getElementById(
      "content"
    ).innerHTML += `<div class ='summary-items'>
  <span>${index + 1}</span>
  <span> ${item.name} </span>
  <span> ${item.quantity}</span>
  </div>`;
  });
};

const closeModal = () => {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};
