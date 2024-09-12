function getFromLocalStorage(key = "List of soldiers") {
  const value = localStorage.getItem(key);
  if (value === undefined || value=== null) return [];
  return toObject(value);
}
function toString(value) {
  return JSON.stringify(value);
}

function toObject(value) {
  return JSON.parse(value);
}

function startTimer(onScreen, timeForTimer) {
  let IntervId = setInterval(timerManger, 1000, onScreen, timeForTimer);
  return IntervId;
}
function timerManger(onScreen, time) {
  onScreen.textContent = time - countDownSec - 1;
  console.log(countDownSec);

  countDownSec += 1;
  if (countDownSec >= time) {
    clearInterval(IntervId);
  }
}
function stopTimer(timerName) {
  clearInterval(timerName);
}
function saveOnArryInLS(value) {
  let list = getFromLocalStorage("List of soldiers");
  list.push(value);
  saveAtLocalStorge(list, "List of soldiers");
}
function saveAtLocalStorge(value, key = "List of soldiers") {
  value = toString(value);
  localStorage.setItem(key, value);
}

function createSoldier(fullName, rank, position, platoon, missionTime, status) {
  const newSoldier = { fullName, rank, position, platoon, missionTime, status };
  return newSoldier;
}

function sortByName(arr, ascend) {
    arr.sort((a, b) => {        
        const nameA = a.fullName.toUpperCase(); // ignore upper and lowercase
        const nameB = b.fullName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    if (ascend){
        return arr;
    }
    else{
        return arr.reverse();
    }
   
}
function deleteSoldierByIndex(index){
    let soldiers = getFromLocalStorage("List of soldiers")
    soldiers.splice(index,1);
    saveAtLocalStorge(soldiers,"List of soldiers")

}
function addNewSoldierToArry(
  fullName,
  rank,
  position,
  platoon,
  missionTime,
  status
) {
  const newSoldier = createSoldier(
    fullName,
    rank,
    position,
    platoon,
    missionTime,
    status
  );
  saveOnArryInLS(newSoldier);
}

export default {
    sortByName,
  stopTimer,
  startTimer,
  toObject,
  toString,
  getFromLocalStorage,
  saveOnArryInLS,
  saveAtLocalStorge,
  addNewSoldierToArry,
  deleteSoldierByIndex,
};
