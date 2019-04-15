// var modal = document.getElementById("id01");
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };

let menu = document.querySelector(".menu");
menu.addEventListener("click", () => {
  menu.classList.toggle("active");
  document.querySelector(".overlay").classList.toggle("menu-open");
});

let clicked = document.querySelectorAll(".nav a");
clicked.forEach(clicked => {
  clicked.onclick = () => {
    document.querySelector(".menu").classList.remove("active");
    document.querySelector(".overlay").classList.toggle("menu-open");
  };
});
//signin
let signinButton = document.querySelector("#signinButton");
signinButton.addEventListener("click", () => {
  document.getElementById("signinModal").style.display = "block";
});

let close = document.querySelector("#close");
close.addEventListener("click", () => {
  document.getElementById("signinModal").style.display = "none";
});
//signup

let signupButton = document.querySelector("#signupButton");
signupButton.addEventListener("click", () => {
  document.getElementById("signupModal").style.display = "block";
});

let cancel = document.querySelector("#cancel");
cancel.addEventListener("click", () => {
  document.getElementById("signupModal").style.display = "none";
});

//Make passowrd visible
let toggle = document.querySelector(".toggle-password");
toggle.addEventListener("click", () => {
  let changeToggle = toggle.classList.toggle("fa-eye-slash");
  let input = document.querySelector(".input-field");
  if (changeToggle) input.setAttribute("type", "text");
  else input.setAttribute("type", "password");
});

let signupToggle = document.querySelector("#toggle-password");
signupToggle.addEventListener("click", () => {
  let changeToggle = signupToggle.classList.toggle("fa-eye-slash");
  let input = document.querySelector("#input-field");
  if (changeToggle) input.setAttribute("type", "text");
  else input.setAttribute("type", "password");
});
