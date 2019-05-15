// functions
const Modal = (modal) => {
  const style = window.getComputedStyle(modal);
  const display = style.getPropertyValue('display');
  if (display === 'none') {
    modal.style.display = 'block';
  } else modal.style.display = 'none';
};

const closeWindow = (modal) => {
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
    if (!event.target.matches('.dropbtn')) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };
};

const verifyAndApprove = (verifyTab, approveTab) => {
  // check if verified is not selected
  if (verifyTab.checked == false) {
    approveTab.removeAttribute('checked');
    approveTab.setAttribute('disabled', '');
  }
  // Add eventListner to all
  verifyTab.addEventListener('click', () => {
    verifyTab.toggleAttribute('checked');

    if (verifyTab.checked == false) {
      approveTab.removeAttribute('checked');
      approveTab.setAttribute('disabled', '');
      approveTab.checked = false;
    } else {
      approveTab.removeAttribute('disabled');
    }
  });
  approveTab.addEventListener('click', () => {
    approveTab.toggleAttribute('checked');
  });
};
// toggle hambuger
const menu = document.querySelector('.menu');

menu.addEventListener('click', () => {
  menu.classList.toggle('active');
  document.querySelector('.overlay').classList.toggle('menu-open');
});
const viewTransactionModal = document.getElementById('viewTransactionModal');
const viewTransactionButton = document.querySelector('#paymentInFavour');
viewTransactionButton.addEventListener('click', () => {
  viewTransactionModal.style.display = 'block';
  closeWindow(viewTransactionModal);
});

// notification
const notificationBox = document.querySelector('#notificationBox');
const modalNotify = document.querySelector('.mobileNotify');
closeWindow(modalNotify);
notificationBox.addEventListener('click', () => {
  Modal(modalNotify);
  window.addEventListener('resize', () => {
    modalNotify.style.display = 'none';
  });
});

const emptyModal = document.getElementById('emptyModal');
const table = document.getElementsByTagName('table')[0];
const tbody = table.getElementsByTagName('tbody')[0];
const modal = document.querySelector('.modal');
const content = document.querySelector('.modal-content');
tbody.onclick = function (e) {
  e = e || window.event;

  const data = [];
  let target = e.srcElement || e.target;

  while (target && target.nodeName !== 'TR') {
    target = target.parentNode;
  }
  if (target) {
    const cells = target.getElementsByTagName('td');
    for (let i = 0; i < cells.length; i++) {
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
// current loans and repay modal
const currentModal = document.querySelector('#currentModal');
const viewCurrentButton = document.querySelector('#viewCurrentButton');
// const currentLoan = document.querySelector('.currentloan-tab');
// const repaidLoan = document.querySelector('.repaidloan-tab');
// const tabcurrent = document.querySelector('#tabcurrent');
// const tabrepaid = document.querySelector('#tabrepaid');
// const currentLoanContent = document.querySelector('#currentloan-tab-content');
// const repayLoanContent = document.querySelector('#repayloan-tab-content');

viewCurrentButton.onclick = () => {
  Modal(currentModal);
  closeWindow(currentModal);
};

const notRepaidLoan = () => {
  // const input = document.getElementById('tabcurrent');
  // const filter = input.value.toUpperCase();
  const fullTable = document.getElementById('full-table');
  const tr = fullTable.getElementsByTagName('tr');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName('td')[5];
    if (td) {
      if (td.innerHTML === 'Unpaid') {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
};
const repaidLoan = () => {
  const fullTable = document.getElementById('full-table');
  const tr = fullTable.getElementsByTagName('tr');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName('td')[5];
    if (td) {
      if (td.innerHTML === '<span class="paid">Paid</span>') {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
};
const currentLoan = () => {
  const fullTable = document.getElementById('full-table');
  const tr = fullTable.getElementsByTagName('tr');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName('td')[5];
    if (td) {
      tr[i].style.display = '';
    }
  }
};
const dropdown = () => {
  document.getElementById('myDropdown').classList.toggle('show');
};


const verify1 = document.getElementById('verify1');
const approved1 = document.getElementById('approved1');
const verify2 = document.getElementById('verify2');
const approved2 = document.getElementById('approved2');
const verify3 = document.getElementById('verify3');
const approved3 = document.getElementById('approved3');
const verify4 = document.getElementById('verify4');
const approved4 = document.getElementById('approved4');

verifyAndApprove(verify1, approved1);
verifyAndApprove(verify2, approved2);
verifyAndApprove(verify3, approved3);
verifyAndApprove(verify4, approved4);

const signout = document.getElementById('signout');
const signOutModal = document.getElementById('signOutModal');
signout.onclick = () => {
  Modal(signOutModal);
  document.querySelector('.menu').classList.remove('active');
  document.querySelector('.overlay').classList.toggle('menu-open');
};
