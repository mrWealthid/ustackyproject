const cartName = "bencart";

var products = [
  {
    index: 1,
    id: "p1",
    name: "Samsung TV",
    price: 500000,
  },
  {
    index: 2,
    id: "p2",
    name: "Pixel 4a",
    price: 250000,
  },
  {
    index: 3,
    id: "p3",
    name: "PS 5",
    price: 300000,
  },
  {
    index: 4,
    id: "p4",
    name: "MacBook Air",
    price: 800000,
  },
  {
    index: 5,
    id: "p5",
    name: "Apple Watch",
    price: 95000,
  },
  {
    index: 6,
    id: "p6",
    name: "Air Pods",
    price: 75000,
  },
];

// Creating Product markup from the array
products.forEach((product) => {
  const productMarkup = `<div class= "cards" data-price ="${product.price}" data-index = "${product.index}">
<img class ="img-class" src = "images/product${product.index}.png" alt = "${product.name}"/>
<h4 class ="priceDetails"  id ="priceDetails${product.index}"></h4>
<p>${product.name}</p>
<button class ="prices" id="actionbtn${product.id}" onclick="addToCart('${product.id}')">ADD TO CART</button> 
</div>`;

  document.querySelector(".content").innerHTML += productMarkup;
});

// Getting each card to show price
const card = document.querySelectorAll(".cards");

card.forEach((item) => {
  const price = item.getAttribute("data-price");
  const index = item.getAttribute("data-index");
  const selected = item.querySelector(".priceDetails");

  item.addEventListener("mouseenter", () => {
    selected.innerHTML = price;
    selected.style.visibility = "visible";
  });

  item.addEventListener("mouseleave", () => {
    selected.innerHTML = "";
    selected.style.visibility = "hidden";
  });
});

//image-hover
const image = document.querySelectorAll(".img-class");
image.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.opacity = 0.4;

    console.log("hi");
  });

  item.addEventListener("mouseleave", () => {
    item.style.opacity = 1;
  });
});

const getCart = () => {
  let cart = localStorage.getItem(cartName);

  if (!cart) {
    localStorage.setItem(cartName, JSON.stringify([]));
    cart = localStorage.getItem(cartName);
  }

  return JSON.parse(cart);
};

const getCounter = () => {
  const cart = getCart();
  const counter = cart.length;

  document.querySelector("#cart-count").innerHTML = counter;
};

getCounter();

// Add to cart
const addToCart = function (id) {
  const cart = getCart();
  const product = products.find((product) => product.id == id);
  const cartItem = cart.find((item) => item.id == id);

  if (cartItem) {
    const itemIndex = cart.findIndex((item) => item.id == id);
    cart[itemIndex].quantity = cartItem.quantity + 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem(cartName, JSON.stringify(cart));

  const button = document.querySelector("#actionbtn" + id);
  button.innerHTML = "REMOVE FROM CART";
  button.setAttribute("onclick", `removeFromCart('${id}')`);

  getCounter();

  alert("Added to cart");
};

// Remove from cart.
const removeFromCart = (id) => {
  const cart = getCart();

  id.innerHTML = "REMOVE FROM CART";
  const index = cart.findIndex((item) => item.id == id);

  console.log(index);

  if (index == null) {
    alert("Product does not exist in cart");

    return false;
  }

  cart.splice(index, 1);

  localStorage.setItem(cartName, JSON.stringify(cart));

  const button = document.querySelector("#actionbtn" + id);
  button.innerHTML = "ADD TO CART";
  button.setAttribute("onclick", `addToCart('${id}')`);

  alert("Product removed from cart");

  getCounter();

  return true;
};

//get counter
