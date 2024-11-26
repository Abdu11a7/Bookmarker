var form = document.querySelector(".form");
var nameInput = document.querySelector("#siteName");
var urlInput = document.querySelector("#siteUrl");

var submit = document.getElementById("submit");

var body = document.querySelector("#body");

var message = document.querySelector(".message");
var overlay = document.querySelector(".overlay");
var btnClose = document.querySelector(".close");
var displayMessage = function () {
  message.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  displayMessage();
});
overlay.addEventListener("click", displayMessage);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !message.classList.contains("hidden")) {
    displayMessage();
  }
});

var data = [];

if (localStorage.website != null) {
  data = JSON.parse(localStorage.website);
}

var isNameExist;

var createdata = function () {
  var newWebsite = {
    name: nameInput.value,
    url: urlInput.value,
  };

  isNameExist = false;
  for (var i = 0; i < data.length; i++) {
    if (data[i].name.toLowerCase() === newWebsite.name.toLowerCase()) {
      isNameExist = true;
      break;
    }
  }

  if (!isNameExist) {
    data.push(newWebsite);

    localStorage.setItem("website", JSON.stringify(data));
    clearFields();
  } else {
    displayMessage();
  }
};

var clearFields = function () {
  nameInput.value = "";
  urlInput.value = "";
  nameInput.blur();
  urlInput.blur();
};

var displayData = function () {
  var table = "";
  for (let i = 0; i < data.length; i++) {
    table += `<tr>
              <td class="p-2">${i + 1}</td>
              <td class="p-2">${data[i].name}</td>
              <td class="p-2">
                <button class="visit py-2 px-3">
                <a href="https://${data[i].url}" target="_blank">
                <i class="fa-solid fa-eye"></i> Visit
                </a>
                </button>
              </td>
              <td class="p-2">
                <button class="delete py-2 px-3" data-index="${i}">
                  <i class="fa-solid fa-trash-can"></i>Delete
                </button>
              </td>
            </tr>`;
  }
  body.innerHTML = table;
};

var regexUrl =
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;
var regexName = /^[a-zA-Z]{3,20}$/;

displayData();
submit.addEventListener("click", function () {
  if (regexUrl.test(urlInput.value) && regexName.test(nameInput.value)) {
    createdata();
    displayData();
    nameInput.classList.remove("is-valid");
    urlInput.classList.remove("is-valid");
  } else {
    displayMessage();
  }
});

form.addEventListener("keyup", function (e) {
  if (e.target.classList.contains("name")) {
    if (!regexName.test(nameInput.value)) {
      e.target.classList.add("is-invalid");
    } else {
      e.target.classList.replace("is-invalid", "is-valid");
    }
  }

  if (e.target.classList.contains("url")) {
    if (!regexUrl.test(urlInput.value)) {
      e.target.classList.add("is-invalid");
    } else {
      e.target.classList.replace("is-invalid", "is-valid");
    }
  }
});

// Delete Data

body.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    data.splice(e.target.dataset.index, 1);
    displayData();
    localStorage.website = JSON.stringify(data);
  }
});
