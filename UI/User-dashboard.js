//functions
const closed = (close, modal) => {
  close.addEventListener("click", () => {
    document.getElementById(modal).style.display = "none";
  });
};

const showModal = (show, modal) => {
  show.onclick = () => {
    document.getElementById(modal).style.display = "block";
  };
};
const Modal = modal => {
  if (modal.style.display === "none") {
    modal.style.display = "block";
  } else modal.style.display = "none";
};
//
let menu = document.querySelector(".menu");
menu.addEventListener("click", () => {
  menu.classList.toggle("active");
  document.querySelector(".overlay").classList.toggle("menu-open");
});

let viewTransactionButton = document.querySelector("#viewTransactionButton");
let applyLoanButton = document.querySelector("#applyLoanButton");
let paymentButton = document.querySelector("#paymentButton");
showModal(viewTransactionButton, "viewTransactionModal");
showModal(applyLoanButton, "applyLoanModal");
showModal(paymentButton, "paymentModal");

let close = document.querySelector("#close");
let close2 = document.querySelector("#close2");
let close3 = document.querySelector("#close3");
closed(close, "viewTransactionModal");
closed(close2, "applyLoanModal");
closed(close3, "paymentModal");

//notification
let notificationBox = document.querySelector("#notificationBox");
let modalNotify = document.querySelector(".mobileNotify");
notificationBox.onclick = () => {
  Modal(modalNotify);
  window.addEventListener("resize", () => {
    modalNotify.style.display = "none";
  });
};
