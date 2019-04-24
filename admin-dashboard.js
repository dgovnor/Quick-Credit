//functions
const Modal = modal => {
  if (modal.style.display === "none") {
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

let menu = document.querySelector(".menu");

menu.addEventListener("click", () => {
  menu.classList.toggle("active");
  document.querySelector(".overlay").classList.toggle("menu-open");
});

//notification
let notificationBox = document.querySelector("#notificationBox");
let modalNotify = document.querySelector(".mobileNotify");
closeWindow(modalNotify);
notificationBox.addEventListener("click", () => {
  Modal(modalNotify);
  window.addEventListener("resize", () => {
    modalNotify.style.display = "none";
  });
});

let close3 = document.querySelector("#close3");
close3.addEventListener("click", () => {
  document.getElementById("emptyModal").style.display = "none";
});

var table = document.getElementsByTagName("table")[0];
var tbody = table.getElementsByTagName("tbody")[0];
var modal = document.querySelector(".modal");
var content = document.querySelector(".modal-content");
tbody.onclick = function(e) {
  e = e || window.event;

  var data = [];
  var target = e.srcElement || e.target;

  while (target && target.nodeName !== "TR") {
    target = target.parentNode;
  }
  if (target) {
    var cells = target.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
      data.push(cells[i].innerHTML);
    }
  }
  console.log(cells);
  Modal(modal);
  content.innerHTML = `Loan id : ${data[0]} </br>
    Email : ${data[1]} </br>  Amount: ${data[2]} </br>
    Date created : ${data[3]} </br> Verified : ${data[4]}
    </br> Status : ${data[5]}`;
};
//current loans and repay modal
let currentModal = document.querySelector("#currentModal");
let viewCurrentButton = document.querySelector("#viewCurrentButton");
let currentLoan = document.querySelector(".currentloan-tab");
let repaidLoan = document.querySelector(".repaidloan-tab");
let tabcurrent = document.querySelector("#tabcurrent");
let tabrepaid = document.querySelector("#tabrepaid");
let currentLoanContent = document.querySelector("#currentloan-tab-content");
let repayLoanContent = document.querySelector("#repayloan-tab-content");

viewCurrentButton.addEventListener("click", () => {
  Modal(currentModal);
});
currentLoan.addEventListener("click", () => {
  if (currentLoanContent.style.display == "none") {
    currentLoanContent.style.display = "block";
    repayLoanContent.style.display = "none";
    tabcurrent.classList.add("active");
    tabrepaid.classList.remove("active");
    currentLoanContent.classList.add("active");
    repayLoanContent.classList.remove("active");
  }
});
repaidLoan.addEventListener("click", () => {
  if (currentLoanContent.style.display !== "none") {
    currentLoanContent.style.display = "none";
    repayLoanContent.style.display = "block";
    tabcurrent.classList.remove("active");
    tabrepaid.classList.add("active");
    currentLoanContent.classList.remove("active");
    repayLoanContent.classList.add("active");
  }
});
closeWindow(currentModal);
