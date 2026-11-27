const playerState = {
  name: "",
  age: 0
};
//index page:Determine whether the age meets the game's requirements
function handleInfoSubmit() {
  const ageInput = document.querySelector("#player-age");
  const nameInput = document.querySelector("#player-name");
  const formError = document.querySelector("#form-error");
  const ageValue = Number(ageInput.value);
  const nameValue = nameInput.value.trim();

  if (!ageInput.value || ageValue <= 0 || nameValue === "") {
  formError.textContent = "Please enter a valid age or name.";
  formError.classList.remove("hidden");
  return;
  }

  formError.classList.add("hidden");

  if (ageValue < 12) {
    alert("Sorry, this game is not suitable for minors (under 12).");
    ageInput.value = "";
    nameInput.value = "";
    ageInput.focus();
    return;
  }
  playerState.age = ageValue;
  playerState.name = nameValue;
  localStorage.setItem("journeyPlayerState", JSON.stringify(playerState));

  window.location.href = "/home";
}

function jumpPage(){
  const submitInfoBtn = document.querySelector("#submit-info-btn");
  if (!submitInfoBtn){
    return;
  }else{
  submitInfoBtn.addEventListener("click", handleInfoSubmit);
  }
}
jumpPage();

// home page: show welcome player function
function showWelcomeName(){
    const welcomeText = document.querySelector("#welcome-text");
    if (!welcomeText){
        return;
    }
    const savedData = localStorage.getItem("journeyPlayerState");
    const savedPlayer = JSON.parse(savedData);
    if (savedPlayer && savedPlayer.name){
        welcomeText.textContent = "Welcome " + savedPlayer.name + " !";
    }
}
showWelcomeName();

const startGameBtn = document.querySelector("#start-game-btn");
if (startGameBtn) {
  startGameBtn.addEventListener("click", function () {
    sessionStorage.removeItem("chapter1CurrentStep");
    sessionStorage.removeItem("chapter2CurrentStep");
    sessionStorage.setItem("currentChapterUrl", "/chapter-1");
  });
}

// 改动：把原来的 showStep + #chapter1-container 封装成可复用的函数
function setupChapterSteps(containerId, storageKey) {
  const container = document.querySelector(containerId);
  if (!container) {
    return;
  }

  function showStep(stepNumber) {
    const targetStep = String(stepNumber);
    sessionStorage.setItem(storageKey, targetStep);

    const steps = container.querySelectorAll(".story-step");
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      if (step.dataset.step === targetStep) {
        step.style.display = "block";
      } else {
        step.style.display = "none";
      }
    }
  }

  const savedStep = sessionStorage.getItem(storageKey) || "1";
  showStep(savedStep);

  container.addEventListener("click", function (event) {
    const btn = event.target.closest(".next-step-btn");
    if (!btn || !container.contains(btn)) {
      return;
    }
    const nextStep = btn.dataset.next;
    if (nextStep) {
      showStep(nextStep);
    }
  });
}

// 新增：分别启动第一章和第二章
setupChapterSteps("#chapter1-container", "chapter1CurrentStep");
setupChapterSteps("#chapter2-container", "chapter2CurrentStep");
/*
const chapter1 = document.querySelector("#chapter1-container");
if (chapter1){
    showStep(1);
    chapter1.addEventListener("click", function(event){
        if (event.target.classList.contains("next-step-btn")) {
        const nextStep = event.target.dataset.next; 
        showStep(nextStep);
    }})
}
*/
document.addEventListener("click", function (event) {
  const statusBtn = event.target.closest(".status-btn");//find status button
  if (!statusBtn) {
    return;
  }
  sessionStorage.setItem("statusReturnUrl", window.location.pathname);
  window.location.href = "/status";
  //sessionStorage.setItem("statusReturnUrl", window.location.href);//Store the current page URL: the URL of the webpage before navigate to the status page
  //window.location.href = "/static/html/status.html";
});

//Three buttons in status page linked to somewhere
document.addEventListener("click", function(event){
  const statusActionBtn = event.target.closest("#back-to-game-btn, #save-data-btn, #exit-to-home-btn");
  if (!statusActionBtn){
    return;
  }
  const id = statusActionBtn.id;
  if (id === "back-to-game-btn"){
    const returnUrl = sessionStorage.getItem("statusReturnUrl");
    if (returnUrl){
      window.location.href = returnUrl;
    }else {
      window.location.href = "/static/html/chapterOne.html";//wait change to current chapter html
    }
  }else if (id === "save-data-btn"){
    alert("Game data saved.");//just show message,later add data store.
  }else if (id === "exit-to-home-btn"){
    window.location.href = "/home";
  }
})

document.addEventListener("click", function(event){
  const btn = event.target.closest(".chapter2-btn");
  if (!btn) {
    return;
  }
  sessionStorage.removeItem("chapter1CurrentStep");
  sessionStorage.setItem("chapter2CurrentStep", "1");
  window.location.href = "/chapter-2";
});
