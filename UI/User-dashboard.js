//functions
const Modal = modal => {
  let style = window.getComputedStyle(modal);
  let display = style.getPropertyValue("display");
  if (display === "none") {
    modal.style.display = "block";
  } else modal.style.display = "none";
};

const closeWindow = modal => {
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};

//toggle hambuger
let menu = document.querySelector(".menu");
menu.addEventListener("click", () => {
  menu.classList.toggle("active");
  document.querySelector(".overlay").classList.toggle("menu-open");
});

let viewTransactionButton = document.querySelector("#viewTransactionButton");
let viewTransactionModal = document.getElementById("viewTransactionModal");
viewTransactionButton.addEventListener("click", () => {
  Modal(viewTransactionModal);
  closeWindow(viewTransactionModal);
});

let applyLoanButton = document.querySelector("#applyLoanButton");
let applyLoanModal = document.getElementById("applyLoanModal");
applyLoanButton.addEventListener("click", () => {
  Modal(applyLoanModal);
  closeWindow(applyLoanModal);
});

let paymentButton = document.querySelector("#paymentButton");
let paymentModal = document.getElementById("paymentModal");
paymentButton.addEventListener("click", () => {
  Modal(paymentModal);
  closeWindow(paymentModal);
});

let notificationBox = document.querySelector("#notificationBox");
let modalNotify = document.querySelector(".mobileNotify");
notificationBox.addEventListener("click", () => {
  Modal(modalNotify);
  window.addEventListener("resize", () => {
    document.querySelector(".mobileNotify").style.display = "none";
  });
});

let signout = document.getElementById("signout");
let signOutModal = document.getElementById("signOutModal");
signout.onclick = () => {
  Modal(signOutModal);
  document.querySelector(".menu").classList.remove("active");
  document.querySelector(".overlay").classList.toggle("menu-open");
};
