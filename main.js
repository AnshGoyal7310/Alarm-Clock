// adding more options in the option values of select tag
const selectMenu = document.querySelectorAll("select");
// adding current time
const currTime = document.querySelector("h1");
// alarm button functionality
const setAlarmBtn = document.querySelector("button");
// used to disable select time section after alarm is set
const content = document.querySelector(".content");

let alarmTime, isAlarm = false;
let ringtone = new Audio('files/ringtone.mp3');

// For Hour
for (let i = 12; i > 0; i--) {
   i = i < 10 ? "0" + i : i;
   // console.log(i);
   let option = `<option value="${i}">${i}</option>`;
   selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// For Minute
for (let i = 59; i >= 0; i--) {
   i = i < 10 ? "0" + i : i;
   // console.log(i);
   let option = `<option value="${i}">${i}</option>`;
   selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// For AM/PM
for (let i = 2; i > 0; i--) {
   let ampm = i == 1 ? "AM" : "PM";
   // console.log(i);
   let option = `<option value="${ampm}">${ampm}</option>`;
   selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
   let date = new Date(),
   h = date.getHours(),
   m = date.getMinutes(),
   s = date.getSeconds(),
   ampm = "AM";

   if (h >= 12) {
      h = h - 12;
      ampm = "PM";
   }

   // if hour value is 0. set this value to 12
   h = h == 0 ? h = 12 : h;

   // adding 0 before hr, min, sec if this value is less than 10
   h = h < 10 ? "0" + h : h;
   m = m < 10 ? "0" + m : m;
   s = s < 10 ? "0" + s : s;
   currTime.innerText = `${h}:${m}:${s} ${ampm}`;

   if (alarmTime == `${h}:${m} ${ampm}`) {
      // console.log("Alarm Ringing...");
      ringtone.play();
      ringtone.loop = true;
   }
},1000);

function setAlarm() {
   if (isAlarm) {
      alarmTime = "";
      ringtone.pause();
      content.classList.remove("disable");
      setAlarmBtn.innerText = "Set Alarm";
      return isAlarm = false;
   }
   let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

   if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
      return alert("Please, Enter a valid time to set Alarm!");
   }
   isAlarm = true;
   alarmTime = time;
   content.classList.add("disable");
   // console.log(time);
   setAlarmBtn.innerText = "Clear Alarm";
}

setAlarmBtn.addEventListener("click",setAlarm);