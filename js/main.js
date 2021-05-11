// collapsable NavBar
let headerLinks = document.querySelector(".header-links");
let harmburger = document.querySelector("#icons");

//when an item is selected- it is hidden
headerLinks.onclick = function () {
  this.style.right = "100%";
};

//I used this right positionin to permit transitions, toggle class with display none wouldn't achieve this.

document.querySelector("#icons").onclick = () => {
  headerLinks.style.right == "100%"
    ? (headerLinks.style.right = "50%")
    : (headerLinks.style.right = "100%");
};
