// collapsable NavBar
document.querySelector("#icons").onclick = () => {
  document.querySelector(".header-links").classList.toggle("icon");
};

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
<img src = "product${product.index}.png" alt = "${product.name}"/>
<h4 class ="priceDetails"  id ="priceDetails${product.index}"></h4>
<p>${product.name}</p>
<button class ="prices">ADD TO CART</button> 
</div>`;

  document.querySelector(".content").innerHTML += productMarkup;
});

// Getting each card to show price

const card = document.querySelectorAll(".cards");

card.forEach((item) => {
  const price = item.getAttribute("data-price");
  const index = item.getAttribute("data-index");
  const selectPrice = document.getElementById("priceDetails" + index);

  item.addEventListener("mouseover", () => {
    selectPrice.innerHTML = price;
    selectPrice.style.visibility = "visible";
  });

  item.addEventListener("mouseout", () => {
    selectPrice.innerHTML = "";
    selectPrice.style.visibility = "hidden";
  });
});

// To change button value when clicked

const button = document.querySelectorAll(".prices");
button.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (btn.innerHTML === "ADD TO CART") {
      this.innerHTML = "REMOVE FROM CART";
    } else {
      this.innerHTML = "ADD TO CART";
    }
  });
});
