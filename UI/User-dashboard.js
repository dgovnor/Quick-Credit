let menu = document.querySelector(".menu");
menu.addEventListener("click", () => {
  menu.classList.toggle("active");
  document.querySelector(".overlay").classList.toggle("menu-open");
});

let viewTransactionButton = document.querySelector("#viewTransactionButton");
viewTransactionButton.addEventListener("click", () => {
  document.getElementById("viewTransactionModal").style.display = "block";
});

let close = document.querySelector("#close");
close.addEventListener("click", () => {
  document.getElementById("viewTransactionModal").style.display = "none";
});

let applyLoanButton = document.querySelector("#applyLoanButton");
applyLoanButton.addEventListener("click", () => {
  document.getElementById("applyLoanModal").style.display = "block";
});
let close2 = document.querySelector("#close2");
close2.addEventListener("click", () => {
  document.getElementById("applyLoanModal").style.display = "none";
});
let close3 = document.querySelector("#close3");
close3.addEventListener("click", () => {
  document.getElementById("paymentModal").style.display = "none";
});
let paymentButton = document.querySelector("#paymentButton");
paymentButton.addEventListener("click", () => {
  document.getElementById("paymentModal").style.display = "block";
});

let notificationBox = document.querySelector("#notificationBox");
let modalNotify = document.querySelector(".mobileNotify");
notificationBox.addEventListener("click", () => {
  if (modalNotify.style.display === "none") {
    modalNotify.style.display = "block";
  } else modalNotify.style.display = "none";
  window.addEventListener("resize", () => {
    document.querySelector(".mobileNotify").style.display = "none";
  });
});
