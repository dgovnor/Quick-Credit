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

const verifyAndApprove = (verifyTab, approveTab) => {
  //check if verified is not selected
  if (verifyTab.checked == false) {
    approveTab.removeAttribute("checked");
    approveTab.setAttribute("disabled", "");
  }
  //Add eventListner to all
  verifyTab.addEventListener("click", () => {
    verifyTab.toggleAttribute("checked");

    if (verifyTab.checked == false) {
      approveTab.removeAttribute("checked");
      approveTab.setAttribute("disabled", "");
      approveTab.checked = false;
    } else {
      approveTab.removeAttribute("disabled");
    }
  });
  approveTab.addEventListener("click", () => {
    approveTab.toggleAttribute("checked");
  });
};
//toggle hambuger
let menu = document.querySelector(".menu");

menu.addEventListener("click", () => {
  menu.classList.toggle("active");
  document.querySelector(".overlay").classList.toggle("menu-open");
});
let viewTransactionModal = document.getElementById("viewTransactionModal");
let viewTransactionButton = document.querySelector("#paymentInFavour");
viewTransactionButton.addEventListener("click", () => {
  viewTransactionModal.style.display = "block";
  closeWindow(viewTransactionModal);
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

let emptyModal = document.getElementById("emptyModal");
let table = document.getElementsByTagName("table")[0];
let tbody = table.getElementsByTagName("tbody")[0];
let modal = document.querySelector(".modal");
let content = document.querySelector(".modal-content");
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
  Modal(modal);
  content.innerHTML = `Loan id : ${data[0]} </br>
    Email : ${data[1]} </br>  Amount: ${data[2]} </br>
    Date created : ${data[3]} </br> Verified : ${data[4]}
    </br> Status : ${data[5]}`;

  closeWindow(emptyModal);
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

viewCurrentButton.onclick = () => {
  Modal(currentModal);
  closeWindow(currentModal);
};
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

let verify1 = document.getElementById("verify1");
let approved1 = document.getElementById("approved1");
let verify2 = document.getElementById("verify2");
let approved2 = document.getElementById("approved2");
let verify3 = document.getElementById("verify3");
let approved3 = document.getElementById("approved3");
let verify4 = document.getElementById("verify4");
let approved4 = document.getElementById("approved4");

verifyAndApprove(verify1, approved1);
verifyAndApprove(verify2, approved2);
verifyAndApprove(verify3, approved3);
verifyAndApprove(verify4, approved4);

let signout = document.getElementById("signout");
let signOutModal = document.getElementById("signOutModal");
signout.onclick = () => {
  Modal(signOutModal);
  document.querySelector(".menu").classList.remove("active");
  document.querySelector(".overlay").classList.toggle("menu-open");
};
