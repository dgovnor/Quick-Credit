var modal = document.getElementById("id01");
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

document.querySelector(".menu").onclick = function change() {
  this.classList.toggle("active");
  document.querySelector(".overlay").classList.toggle("menu-open");
};

var clicked = document.querySelectorAll(".nav a");
clicked.forEach(function(clicked) {
  clicked.onclick = () => {
    document.querySelector(".menu").classList.remove("active");
    document.querySelector(".overlay").classList.toggle("menu-open");
  };
});
