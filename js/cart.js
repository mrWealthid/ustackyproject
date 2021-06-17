const cartName = "wealthCart";

//Go to intro
const introRedirect = () => {
  window.location.href = "index.html";
};
//get Mycart
const getCart = () => {
  let cart = localStorage.getItem(cartName);

  if (!cart) {
    localStorage.setItem(cartName, JSON.stringify([]));
    cart = localStorage.getItem(cartName);
  }

  return JSON.parse(cart);
};

//Syncing the price with item price and item quantity directly from local storage
const syncPrice = () => {
  let myCart = getCart();

  const total = myCart.reduce(
    (total, item) => (total += item.price * item.quantity),
    0
  );

  document.querySelector(
    "#total"
  ).innerHTML = `Total Amount To Be Paid:  <span>&#8358</span> ${total.toLocaleString()}`;
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
                                 <p  class ="price${item.index} price">${(
      item.price * item.quantity
    ).toLocaleString()}</p>
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

    document.querySelector(".price" + index).innerHTML = (
      flow.price * flow.quantity
    ).toLocaleString();
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
    addMsg.innerHTML = `Do You Want To Remove ${flow.name}? <br>If Yes, Kindly Use The Remove Button Below`;
    addMsg.classList.add("msg");
    setTimeout(() => {
      addMsg.classList.remove("msg");
    }, 1500);
  }
  document.querySelector(".price" + index).innerHTML = (
    flow.price * flow.quantity
  ).toLocaleString();

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

//form validation

function formValidation() {
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const tel = document.querySelector("#tel");
  const errorMsg1 = document.querySelector(".errorMsg1");
  const errorMsg2 = document.querySelector(".errorMsg2");
  const errorMsg3 = document.querySelector(".errorMsg3");

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
    if (Number.isNaN(Number(tel.value))) {
      errorMsg3.innerHTML = "Input can only be numbers";
    } else if (tel.value.length < 11) {
      errorMsg3.innerHTML = "Phone numbers cannot be less than 11 digits";
    } else {
      errorMsg3.innerHTML = "";
    }
  });
}

formValidation();

//Go to shop
const shopRedirect = () => {
  window.location.href = "index.html#Shop";
};

function payWithPaystack(e) {
  e.preventDefault();
  let carts = getCart();

  if (Number.isNaN(Number(tel.value))) {
    addMsg.innerHTML = `Check Form Validation Message Within Input Field `;
    addMsg.classList.add("msg");
    setTimeout(() => {
      addMsg.classList.remove("msg");
    }, 2500);
  } else if (carts.length <= 0) {
    addMsg.innerHTML = `You Have No Cart Item, To Add Items To Cart <br> Kindly Visit Shop Using The Continue Shopping Button Below`;
    addMsg.classList.add("msg");
    setTimeout(() => {
      addMsg.classList.remove("msg");
    }, 2500);
  } else {
    let handler = PaystackPop.setup({
      key: "pk_test_c8d49ba5c7751a42402cb85eeb58485e3bb3d0f6",
      email: document.getElementById("email").value,
      amount: syncPrice() * 100,
      ref: "" + Math.floor(Math.random() * 1000000000 + 1),
      onClose: function () {
        alert("Window closed.");
      },
      callback: function (response) {
        setTimeout(showSummary, 1000);
      },
    });
    handler.openIframe();
  }
}

// Get the modal
const modal = document.getElementById("myModal");

//show summary function
const showSummary = () => {
  let cart = getCart();
  let names = document.getElementById("name").value;

  modal.style.display = "block";
  document.getElementById(
    "content-head"
  ).innerHTML = `<div class= summary-heading><h2>Thank You<span class ="name"> ${names}</span>, Your Order Has Been Recieved</h2>
  
  <img id ='check' src= "images/check.svg"/>
  <h1>Summary</h1>
  </div>`;

  document.getElementById(
    "content"
  ).innerHTML = `<div class = 'summary-subheading'>

  <span>S/No</span>
  <span>Item</span>
  <span>Quantity</span>
  </div>`;
  cart.forEach((item, index) => {
    document.getElementById(
      "content"
    ).innerHTML += `<div class ='summary-items'>
  <span>${index + 1}</span>
  <span> ${item.name} </span>
  <span class ="item-quantity"> ${item.quantity}</span>
  </div>`;
  });
};

//Close Modal function
const closeModal = () => {
  modal.style.display = "none";
};

//close modal when you click outside the modal
window.onclick = function (event) {
  if (event.target === modal) {
    closeModal();
  }
};
//clear cart and form input fields
const clearCart = () => {
  let cart = getCart();
  cart.splice(0, cart.length);
  localStorage.setItem(cartName, JSON.stringify(cart));
  email.value = "";
  name.value = "";
  tel.value = "";

  introRedirect();
};
