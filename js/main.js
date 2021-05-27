// collapsable NavBar
let headerLinks = document.querySelector(".header-links");
let harmburger = document.querySelector("#icons");

//when an option is clicked- it is hidden

(function hide() {
  headerLinks.onclick = function () {
    this.style.right = "100%";
  };
})();

//I didn't toggle class with display none, because it doesn't permit transitions.

(function toggle() {
  document.querySelector("#icons").onclick = () => {
    headerLinks.style.right == "100%"
      ? (headerLinks.style.right = "50%")
      : (headerLinks.style.right = "100%");
  };
})();
