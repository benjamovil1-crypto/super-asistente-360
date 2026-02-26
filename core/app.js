document.addEventListener("DOMContentLoaded", () => {

  const splash = document.getElementById("splash");
  const app = document.getElementById("app");

  const greeting = document.getElementById("greeting");
  const currentDate = document.getElementById("currentDate");

  const asambleaCard = document.getElementById("asambleaCard");
  const asambleaScreen = document.getElementById("asambleaScreen");
  const backFromAsamblea = document.getElementById("backFromAsamblea");

  const settingsBtn = document.getElementById("settingsBtn");
  const settingsScreen = document.getElementById("settingsScreen");
  const backFromSettings = document.getElementById("backFromSettings");

  const userNameInput = document.getElementById("userNameInput");
  const saveName = document.getElementById("saveName");
  const restoreData = document.getElementById("restoreData");

  const timerDisplay = document.getElementById("timerDisplay");
  const minutesInput = document.getElementById("minutesInput");
  const secondsInput = document.getElementById("secondsInput");

  const startTimer = document.getElementById("startTimer");
  const pauseTimer = document.getElementById("pauseTimer");
  const resetTimer = document.getElementById("resetTimer");

  const totalTimeDisplay = document.getElementById("totalTime");
  const homeAsambleaTotal = document.getElementById("homeAsambleaTotal");

  let timer;
  let remainingTime = 0;
  let accumulatedMinutes = parseInt(localStorage.getItem("asambleaTotal")) || 0;

  const alarmSound = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");

  function updateGreeting() {
    const hour = new Date().getHours();
    const name = localStorage.getItem("userName") || "Benjamín";
    if (hour < 12) greeting.textContent = `Buenos días, ${name}`;
    else if (hour < 19) greeting.textContent = `Buenas tardes, ${name}`;
    else greeting.textContent = `Buenas noches, ${name}`;
  }

  function updateDisplay() {
    let m = Math.floor(remainingTime / 60);
    let s = remainingTime % 60;
    timerDisplay.textContent =
      `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
  }

  function updateTotals() {
    totalTimeDisplay.textContent = accumulatedMinutes;
    homeAsambleaTotal.textContent = accumulatedMinutes;
  }

  updateGreeting();
  currentDate.textContent = new Date().toLocaleDateString("es-MX");
  updateTotals();

  setTimeout(() => {
    splash.style.display = "none";
    app.classList.remove("hidden");
  }, 900);

  asambleaCard.addEventListener("click", () => {
    asambleaScreen.classList.remove("hidden");
  });

  backFromAsamblea.addEventListener("click", () => {
    asambleaScreen.classList.add("hidden");
  });

  settingsBtn.addEventListener("click", () => {
    settingsScreen.classList.remove("hidden");
  });

  backFromSettings.addEventListener("click", () => {
    settingsScreen.classList.add("hidden");
  });

  userNameInput.value = localStorage.getItem("userName") || "";

  saveName.addEventListener("click", () => {
    localStorage.setItem("userName", userNameInput.value);
    updateGreeting();
    alert("Nombre guardado");
  });

  restoreData.addEventListener("click", () => {
    const healthData = localStorage.getItem("healthData");
    localStorage.clear();
    if (healthData) localStorage.setItem("healthData", healthData);
    accumulatedMinutes = 0;
    updateTotals();
    alert("Datos restaurados");
  });

  startTimer.addEventListener("click", () => {
    if (remainingTime === 0) {
      remainingTime =
        (parseInt(minutesInput.value) || 0) * 60 +
        (parseInt(secondsInput.value) || 0);
    }

    if (remainingTime <= 0) return;

    timer = setInterval(() => {
      remainingTime--;
      updateDisplay();

      if (remainingTime <= 0) {
        clearInterval(timer);
        alarmSound.play();
        accumulatedMinutes += parseInt(minutesInput.value) || 0;
        localStorage.setItem("asambleaTotal", accumulatedMinutes);
        updateTotals();
      }
    }, 1000);
  });

  pauseTimer.addEventListener("click", () => {
    clearInterval(timer);
  });

  resetTimer.addEventListener("click", () => {
    clearInterval(timer);
    remainingTime = 0;
    updateDisplay();
  });

});
