//lets grab all variables and constants

let inputNumber = document.querySelector("#number");
let saveBtn = document.querySelector("#save");
let list = document.querySelector("#list");
let inputName = document.querySelector("#names");
let addBtn = document.querySelector("#addBtn");
let editCheck = false;
let editElement1;
let editElement2;
list.addEventListener("click", editDeleteContact);
saveBtn.addEventListener("click", addContact);
window.addEventListener("DOMContentLoaded", displayFromLocalStorage);

function addContact() {
  let name = inputName.value;
  let number = inputNumber.value;
  if (name && number && !editCheck) {
    //create new list element
    let contact = document.createElement("li");
    contact.className =
      "list-group-item d-flex justify-content-between align-items-center my-1";
    contact.innerHTML = ` <span class="name">${name}</span>
          <span class="number">${number}</span>
                 <div class="editDel">
            <span class="fas fa-edit mr-2"></span>
            <span class="fas fa-trash"></span>
          </div>`;

    list.appendChild(contact);
    addToLocalStorage(name, number);
    inputNumber.value = "";
    inputName.value = "";
  } else if (name && number && editCheck) {
    //console.log("edit this");
    editLocalStorage(
      editElement1,
      editElement2,
      inputName.value,
      inputNumber.value
    );
    editElement2.innerText = inputNumber.value;
    editElement1.innerText = inputName.value;
    addBtn.innerText = "add";
    saveBtn.innerText = "save";
    inputNumber.value = "";
    inputName.value = "";
  } else {
    alert("please add a contact");
  }
}

function editDeleteContact(e) {
  if (e.target.classList.contains("fa-edit")) {
    // console.log("edit");
    let element = e.target.parentElement.parentElement;
    editCheck = true;
    editElement1 = element.firstElementChild;
    editElement2 = editElement1.nextElementSibling;
    addBtn.innerText = "edit";
    saveBtn.innerText = "edit";

    inputNumber.value = editElement2.innerText;
    inputName.value = editElement1.innerText;
  }

  if (e.target.classList.contains("fa-trash")) {
    //console.log("delete");
    let element = e.target.parentElement.parentElement;
    list.removeChild(element);
    deleteFromLocalStorage(element);
  }
}

//lets fucking deal with our local storage baby

function addToLocalStorage(name, number) {
  let details = { name, number };
  let contact = [];
  if (localStorage.getItem("contact") === null) {
    localStorage.setItem("contact", JSON.stringify(contact));
  } else {
    contact = JSON.parse(localStorage.getItem("contact"));
  }

  contact.push(details);
  contact.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  console.log(contact);
  localStorage.setItem("contact", JSON.stringify(contact));
}

function deleteFromLocalStorage(ele) {
  let contact = [];
  if (localStorage.getItem("contact") === null) {
    localStorage.setItem("contact", JSON.stringify(contact));
  } else {
    contact = JSON.parse(localStorage.getItem("contact"));
  }

  contact.forEach(function (item, index) {
    if (ele.firstElementChild.innerText === item.name) {
      contact.splice(index, 1);
    }
  });

  localStorage.setItem("contact", JSON.stringify(contact));
}

//edit local storage

function editLocalStorage(ele1, ele2, val1, val2) {
  let contact = [];
  if (localStorage.getItem("contact") === null) {
    localStorage.setItem("contact", JSON.stringify(contact));
  } else {
    contact = JSON.parse(localStorage.getItem("contact"));
  }

  contact.forEach(function (item) {
    if (item.name === ele1.innerText && item.number === ele2.innerText) {
      item.name = val1;
      item.number = val2;
    }
  });

  localStorage.setItem("contact", JSON.stringify(contact));
}

//finally let us display from our local storage
function displayFromLocalStorage() {
  let contact = [];
  if (localStorage.getItem("contact") === null) {
    localStorage.setItem("contact", JSON.stringify(contact));
  } else {
    contact = JSON.parse(localStorage.getItem("contact"));
  }
  //create new list from ls
  contact.forEach(function (item) {
    let contact = document.createElement("li");
    contact.className =
      "list-group-item d-flex justify-content-between align-items-center my-1";
    contact.innerHTML = ` <span class="name">${item.name}</span>
          <span class="number">${item.number}</span>
                 <div class="editDel">
            <span class="fas fa-edit mr-2"></span>
            <span class="fas fa-trash"></span>
          </div>`;

    list.appendChild(contact);
  });
}
