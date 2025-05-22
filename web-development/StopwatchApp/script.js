let startTime, elapsedTime = 0, timerInterval;
let running = false;
let lapCount = 0;
let reminded = false;

function timeToString(time) {
  const ms = time % 1000;
  const totalSeconds = Math.floor(time / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(ms).padStart(3, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function print(txt) {
  document.getElementById('display').innerHTML = txt;
}

function startStop() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      print(timeToString(elapsedTime));
      checkReminder(elapsedTime);
    }, 10);
    running = true;
  }
}

function pause() {
  clearInterval(timerInterval);
  running = false;
}

function reset() {
  if (confirm("Are you sure you want to reset the stopwatch and clear all laps?")) {
    clearInterval(timerInterval);
    print("00:00:00.000");
    elapsedTime = 0;
    running = false;
    lapCount = 0;
    reminded = false;
    document.getElementById('laps').innerHTML = '';
    document.getElementById('reminder').innerText = '';
  }
}

function lap() {
  if (running) {
    lapCount++;
    const lapTime = timeToString(elapsedTime);
    const li = document.createElement('li');
    li.textContent = `Lap ${lapCount}: ${lapTime}`;
    document.getElementById('laps').appendChild(li);
  }
}

function checkReminder(time) {
  if (!reminded && time >= 60000) { // 1 minute = 60,000 ms
    document.getElementById('reminder').innerText = 
      "🔔 You've been tracking time for a while. Keep going, you're doing great!";
    reminded = true;
  }
}
