const clock = document.querySelector('.clock');
const dateEl = document.querySelector('.date');

function getTime(){
  const date = new Date();
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");

  clock.innerText = `${h}:${m}:${s}`;
}

function getDate(){
  const date = new Date();
  dateEl.innerText = date.toDateString();
}

getDate();
getTime();
setInterval(getTime, 1000);