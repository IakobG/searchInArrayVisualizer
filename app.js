const startSearching = document.querySelector('#start-btn');
const reset = document.querySelector('#reset-btn');
const drawNumbers = document.querySelector('.drawNumbers');
const foundIndex = document.querySelector('.foundNumber');
let arrayA = [];
let arrayB = [];
let numberToFind;
let numIndex = -1;

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
function load() {
  generateRandomArray();
  numberFromArray(arrayA);
  drawNums();
}

load();

function generateRandomArray() {
  for (let i = 0; i < 10; i++) {
    arrayA[i] = Math.floor(Math.random() * 25)
  }
}
function numberFromArray(array) {
  const numberBetween = Math.floor(Math.random() * (9 - 2 + 1)) + 2; //(max - min + 1) ) + min
  numberToFind = arrayA[numberBetween];
}
function drawNums() {
  for (let i = 0; i < arrayA.length; i++) {
    const newDiv = document.createElement('DIV');
    newDiv.innerText = arrayA[i];
    newDiv.setAttribute('class', `index${i}`);
    newDiv.style.backgroundColor = '#fdca40';
    drawNumbers.append(newDiv);
  }
}
async function findNums() {
  for (let i = 0; i < arrayA.length; i++) {

    if (arrayA[i] == numberToFind) {
      let found = document.querySelector(`.index${i}`);
      found.style.backgroundColor = '#fdca40';
      await timeout(400);
      numIndex++;
      arrayB[numIndex] = i;
      found.style.backgroundColor = '#3772ff';
    }
    else {
      let notFound = document.querySelector(`.index${i}`);
      notFound.style.backgroundColor = '#fdca40';
      await timeout(400);
      notFound.style.backgroundColor = '#df2935';
    }
  }
}
async function drawIndex() {
  if (numIndex == 0) {
    const drawText = document.createElement('DIV');
    drawText.innerText = `${numberToFind} ნაპოვნია ინდექსზე - ${arrayB[numIndex]}`;
    await timeout(200);
    foundIndex.append(drawText);
  } else {
    const drawText = document.createElement('DIV');
    drawText.innerText = `${numberToFind} ნაპოვნია ინდექსებზე: `;
    await timeout(200);
    foundIndex.append(drawText);
    for (let i = 0; i <= numIndex; i++) {
      const drawFoundIndex = document.createElement('SPAN');
      drawFoundIndex.innerText = arrayB[i];
      await timeout(200);
      foundIndex.append(drawFoundIndex);
    }
  }
}
async function search() {
  startSearching.setAttribute('disabled', 'true');
  await findNums();
  await drawIndex();
  reset.removeAttribute('disabled');
}
function resetApp() {
  while (drawNumbers.hasChildNodes()) {
    drawNumbers.removeChild(drawNumbers.firstChild);
  }
  while (foundIndex.hasChildNodes()) {
    foundIndex.removeChild(foundIndex.firstChild);
  }
  numIndex = -1;
  load();
  reset.setAttribute('disabled', 'true');
  startSearching.removeAttribute('disabled')
}

startSearching.addEventListener('click', search);
reset.addEventListener('click', resetApp);