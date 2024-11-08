"use strict";

const nationalParkArrayTBody = document.querySelector("#nationalParkArrayTBody");
const locationDropdown = document.querySelector("#locationDropdown");
const typeDropdown = document.querySelector("#typeDropdown");
const byLocationRadio = document.querySelector("#byLocationRadio");
const byTypeRadio = document.querySelector("#byTypeRadio");

function buildTable(data, tableBody) {
  tableBody.innerText = "";

  data.forEach((nationalPark) => {
    let tr = tableBody.insertRow();

    let td1 = tr.insertCell();
    td1.innerText = nationalPark.LocationID;

    let td2 = tr.insertCell();
    td2.innerText = nationalPark.LocationName;

    let td3 = tr.insertCell();
    td3.innerText = nationalPark.Address || "N/A";

    let td4 = tr.insertCell();
    td4.innerText = nationalPark.City;

    let td5 = tr.insertCell();
    td5.innerText = nationalPark.State;

    let td6 = tr.insertCell();
    td6.innerText = nationalPark.ZipCode || "N/A";

    let td7 = tr.insertCell();
    td7.innerText = nationalPark.Phone || "N/A";

    let td8 = tr.insertCell();
    if (nationalPark.Visit) {
      let link = document.createElement("a");
      link.href = nationalPark.Visit
      link.target = "_blank"; 
      link.innerText = "Visit Site";
      td8.appendChild(link);
    } else {
      td8.innerText = "N/A";
    }
  });
}

function populateDropdown(data, dropdown) {
  
  
  const option = document.createElement("option");
  option.value = "All";
  option.textContent = "All";
  dropdown.appendChild(option);
  dropdown.value = "All";

  data.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    dropdown.appendChild(option);
  });
  dropdown.style.display = "inline-block";
}

function filterTable(data, tableBody, filter) {
  if (byLocationRadio.checked) {
    const filteredData = filter === "All" ? data : data.filter((nationalPark) => nationalPark.State === filter);
    buildTable(filteredData, tableBody);
  } else {
    const filteredData = filter === "All" ? data : data.filter((nationalPark) =>  nationalPark.LocationName.includes(filter));
    console.log(filteredData);
    buildTable(filteredData, tableBody);
  }
}

populateDropdown(locationsArray, locationDropdown);
buildTable(nationalParksArray, nationalParkArrayTBody);

byLocationRadio.addEventListener("change", () => {
  if (byLocationRadio.checked) {
    typeDropdown.style.display = "none";
    locationDropdown.style.display = "inline-block";
    populateDropdown(locationsArray, locationDropdown);
  }
});

byTypeRadio.addEventListener("change", () => {
  if (byTypeRadio.checked) {
    locationDropdown.style.display = "none";
    populateDropdown(parkTypesArray, typeDropdown);
  }
});

locationDropdown.addEventListener("change", () => {
  filterTable(nationalParksArray, nationalParkArrayTBody, locationDropdown.value);
});

typeDropdown.addEventListener("change", () => {
  filterTable(nationalParksArray, nationalParkArrayTBody, typeDropdown.value);
});