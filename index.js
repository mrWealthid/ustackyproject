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

products.forEach((product) => {
  const container = `<div class ='cards' data-price= ${product.price} data-id = ${product.id}> 
<img src = 'images/product${product.index}.png' alt = ${product.name}/>

<p class ="product-name">${product.name}</p>

<button onclick ="getProduct('${product.id}')" class ="button${product.id}">ADD TO CART</button>
`;

  document.querySelector(".generate").innerHTML += container;
});

const addMsg = document.querySelector(".test");
const removeMsg = document.querySelector(".test");

//checking cart status

function getCart() {
  let myCart = localStorage.getItem("wealth");

  if (!myCart) {
    localStorage.setItem("wealth", JSON.stringify([]));
    myCart = localStorage.getItem("wealth");
  }
  return JSON.parse(myCart);
}

// adding to cart

function getProduct(id) {
  let myCart = getCart();

  let myProduct = products.find((product) => product.id == id);

  let cartFind = myCart.find((item) => item.id == id);

  if (cartFind) {
    let cartIndex = myCart.findIndex((item) => item.id == id);
    myCart[cartIndex].quantity = cartFind.quantity + 1;
  } else {
    myProduct.quantity = 1;
    myCart.push(myProduct);
  }

  localStorage.setItem("wealth", JSON.stringify(myCart));

  const buttons = document.querySelector(".button" + id);
  buttons.innerHTML = "REMOVE FROM CART";
  buttons.setAttribute("onclick", `removeFromCart('${id}')`);

  addMsg.innerHTML = "Product Has Been Added";
  addMsg.classList.add("msg");
  setTimeout(() => {
    addMsg.classList.remove("msg");
  }, 1000);
}

function removeFromCart(id) {
  let myCart = getCart();

  cartIndex = myCart.findIndex((item) => item.id == id);
  if (cartIndex == null) {
    removeMsg.innerHTML = "Product does not Exist";
    removeMsg.classList.add("msg2");

    setTimeout(() => {
      removeMsg.classList.remove("msg2");
    }, 1000);
  } else {
    myCart.splice(cartIndex, 1);
    localStorage.setItem("wealth", JSON.stringify(myCart));
  }

  const buttons = document.querySelector(".button" + id);
  buttons.innerHTML = "ADD TO CART";

  buttons.setAttribute("onclick", `getProduct('${id}')`);

  removeMsg.innerHTML = "Product Has Been Removed";
  removeMsg.classList.add("msg2");

  setTimeout(() => {
    removeMsg.classList.remove("msg2");
  }, 1000);
}
