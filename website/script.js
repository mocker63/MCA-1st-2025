// Water Reminder logic
countdownEl.textContent = formatCountdown(left);
if (left <= 0) {
// trigger
notify('Time to drink water', 'Take a sip — keep hydrated!');
// schedule next
scheduleNextFromNow();
}
} else {
countdownEl.textContent = '—';
}
}


function scheduleNextFromNow() {
const minutes = Math.max(1, Number(intervalInput.value) || 45);
nextReminder = Date.now() + minutes*60*1000;
saveState();
}


function startTimer() {
if (!timer) {
// ensure browser permission asked
requestNotificationPermission();
if (!nextReminder) scheduleNextFromNow();
timer = setInterval(updateUI, 1000);
updateUI();
}
}


function stopTimer() {
if (timer) { clearInterval(timer); timer=null; }
nextReminder = null;
saveState();
updateUI();
}


// actions
startBtn.addEventListener('click', ()=>{
scheduleNextFromNow();
startTimer();
});


stopBtn.addEventListener('click', ()=>{
stopTimer();
});


drinkNowBtn.addEventListener('click', ()=>{
const ts = Date.now();
lastDrankEl.dataset.ts = ts;
lastDrankEl.textContent = formatTime(ts);
// immediately notify and schedule next
notify('Great — you drank water!', 'Next reminder scheduled.');
scheduleNextFromNow();
saveState();
updateUI();
});


// persist interval change
intervalInput.addEventListener('change', ()=>{
saveState();
});


// initialize
loadState();
if (localStorage.getItem('water_nextReminder')) {
// if previously running, resume
startTimer();
}


})();