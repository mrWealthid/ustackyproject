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
      errorMsg3.innerHTML = "Please enter a valid phone number";
    } else {
      errorMsg3.innerHTML = "";
    }
  });
})();
