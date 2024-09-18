const numberhrs = document.querySelector(".number-hours");
const numberEl = [];
for (let i = 1; i <= 12; i++) {
    numberEl.push(
        `<span style="--index:${i};"><p>${i}</p></span>`
    );
}

numberhrs.insertAdjacentHTML("afterbegin", numberEl.join(""));

const handHours = document.querySelector('.hands.hours');
const handMinutes = document.querySelector('.hands.min');
const handSeconds = document.querySelector('.hands.sec');

function getCurrentTime() {
    let date = new Date();
    let currentHours = date.getHours();
    let currentMinutes = date.getMinutes();
    let currentSeconds = date.getSeconds();

    handHours.style.transform = `rotate(${currentHours * 30 + currentMinutes / 2}deg)`;
    handMinutes.style.transform = `rotate(${currentMinutes * 6}deg)`;
    handSeconds.style.transform = `rotate(${currentSeconds * 6}deg)`;
}
setInterval(getCurrentTime, 1000);




//stop watch 

let displaytime = document.getElementById("time");
document.getElementById('s1').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: "start" });
});
document.getElementById('s2').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: "stop" });
});
document.getElementById('s3').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: "reset" });
});
function updateTime() {
  chrome.runtime.sendMessage({ action: "getTime" }, (response) => {
    const { hours, minutes, seconds } = response;
    let h = (hours < 10) ? "0" + hours : hours;
    let m = (minutes < 10) ? "0" + minutes : minutes;
    let s = (seconds < 10) ? "0" + seconds : seconds;
    displaytime.innerHTML = h + ":" + m + ":" + s;
  });
}
setInterval(updateTime, 1000);
