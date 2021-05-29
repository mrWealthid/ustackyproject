// collapsable NavBar
let headerLinks = document.querySelector(".header-links");
let harmburger = document.querySelector("#icons");
let main = document.querySelector("main");

//when an option on the headerlinks/ outside is clicked- it is hidden

(function hideLinks() {
  headerLinks.onclick = function () {
    this.style.right = "100%";
  };

  main.onclick = function () {
    headerLinks.style.right = "100%";
  };
})();

//I didn't toggle class with display none, because it doesn't permit transitions.

function toggle() {
  document.querySelector("#icons").onclick = () => {
    headerLinks.style.right == "100%"
      ? (headerLinks.style.right = "50%")
      : (headerLinks.style.right = "100%");
  };
}

toggle();
