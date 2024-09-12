import helper from "./helper.js";
const tableData = document.querySelector("#soldiersList");
const sortName = document.querySelector("#sortName");
const addSoldier = document.querySelector("#addSoldier");
const soldierName = document.querySelector("#name");
const soldierRank = document.querySelector("#rank");
const soldierPosition = document.querySelector("#position");
const soldierPlatoon = document.querySelector("#platoon");
const soldierMissionTime = document.querySelector("#missionTime");
const soldierStatus = document.querySelector("#status");
const soldierNameEdit = document.querySelector("#nameEdit");
const soldierRankEdit = document.querySelector("#rankEdit");
const soldierPositionEdit = document.querySelector("#positionEdit");
const soldierPlatoonEdit = document.querySelector("#platoonEdit");
const soldierMissionTimeEdit = document.querySelector("#missionTimeEdit");
const soldierStatusEdit = document.querySelector("#statusEdit");
const editBox = document.querySelector("#editBox");
const editSave = document.querySelector("#editSave");
let taskInEdit;
let sortAscend = true;
// stopTimer,
// startTimer,
// toObject,
// toString,
//saveAtLocalStorge,
//saveOnArryInLS

//helper.addNewSoldierToArry("shneor", "samal", "north","navesiles", 30, "Retired" );

// helper.addNewSoldierToArry("csamal", "dnavesiles", "south","shneor", 40, "inactive" );

// helper.addNewSoldierToArry("bnavesiles", "dactive", "south","csamal", 50, "active" );

// helper.addNewSoldierToArry("dactive", "ashneor", "north","bnavesiles", 60, "inactive" );
let data = helper.getFromLocalStorage();
//console.log(data);
const myArr = [
  { name: "ashneor", age: 1 },
  { name: "csamal", age: 2 },
  { name: "bnavesiles", age: 3 },
  { name: "dactive", age: -100 },
];
//console.log(helper.sortByName(myArr,false));
//helper.deleteSoldierByIndex(0)
//console.log(data);
sortName.addEventListener("click", () => sortAscendOrdescend());
addSoldier.addEventListener("click", () => {
  helper.addNewSoldierToArry(
    soldierName.value,
    soldierRank.value,
    soldierPosition.value,
    soldierPlatoon.value,
    soldierMissionTime.value,
    soldierStatus.value
  );
  renderTable(helper.getFromLocalStorage("List of soldiers"));
  cleanerInput();
});
function cleanerInput() {
  soldierName.value = "";
  soldierRank.value = "";
  soldierPosition.value = "";
  soldierPlatoon.value = "";
  soldierMissionTime.value = "";
  soldierStatus.value = "";
}

function sortAscendOrdescend() {
  renderTable(
    helper.sortByName(
      helper.getFromLocalStorage("List of soldiers"),
      sortAscend
    )
  );
  sortAscend = sortAscend == false ? true : false;
}

function renderTable(list) {
  let soldiersList;
  if (!list) {
    soldiersList = helper.getFromLocalStorage("List of soldiers");
  } else {
    soldiersList = list;
  }
  tableData.innerHTML = "";

  for (let index = 0; index < soldiersList.length; index++) {
    let row = tableData.insertRow(index);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    cell1.textContent = soldiersList[index].fullName;
    cell2.textContent = soldiersList[index].rank;
    cell3.textContent = soldiersList[index].position;
    cell4.textContent = soldiersList[index].platoon;
    cell5.textContent = soldiersList[index].status;
    cell6.className = "Actions";
    cell6.appendChild(createButton("btn edit-btn", "edit", index));
    cell6.appendChild(createButton("btn delete-btn", "remove", index));
    if (soldiersList[index].status != "Retired") {
      cell6.appendChild(createButton("btn complete-btn", "סמן כהושלם", index));
    }
  }
}
function createButton(style, text, id) {
  let newButton = document.createElement("button");
  newButton.textContent = text;
  newButton.className = style;
  newButton.onclick = () => buttonAction(id, text);
  return newButton;
}

function buttonAction(id, name) {
  let soldiersList = helper.getFromLocalStorage("List of soldiers");
  switch (name) {
    case "remove":
      helper.deleteSoldierByIndex(id);
      break;
    case "סמן כהושלם":
      soldiersList[id].isDone = !soldiersList[id].isDone;
      break;
    case "edit":
      openPopUp(id);
      break;
    default:
      console.log("erorr");
  }
  //helper.saveAtLocalStorge(soldiersList)
  renderTable();
}
function openPopUp(id) {
  const soldiersList = helper.getFromLocalStorage("List of soldiers");
  taskInEdit = id;
  soldierNameEdit.value = soldiersList[id].fullName;
  soldierRankEdit.value = soldiersList[id].rank;
  soldierPositionEdit.value = soldiersList[id].position;
  soldierPlatoonEdit.value = soldiersList[id].platoon;
  soldierMissionTimeEdit.value = soldiersList[id].missionTime;
  soldierStatusEdit.value = soldiersList[id].status;
  editBox.style.display = "flex";
}
editSave.addEventListener("click", () => saveChange());

function saveChange()
{
  helper.deleteSoldierByIndex(taskInEdit);
  helper.addNewSoldierToArry(
    soldierNameEdit.value,
    soldierRankEdit.value,
    soldierPositionEdit.value,
    soldierPlatoonEdit.value,
    soldierMissionTimeEdit.value,
    soldierStatusEdit.value
  );
  editBox.style.display = "none";
}
renderTable(data);
