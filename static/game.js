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

function showStep(stepNumber){
    const steps = document.querySelectorAll(".story-step");//get all story-step part(different page) and stored into a array steps.
    for (let i = 0; i < steps.length; i++){
        const step = steps[i];
        const currentStep = step.dataset.step;
        const targetStep = String(stepNumber);
        if (currentStep === targetStep){
            step.style.display = "block";
        }else {
            step.style.display = "none";
        }
    }
}
const chapter1 = document.querySelector("#chapter1-container");
if (chapter1){
    showStep(1);
    chapter1.addEventListener("click", function(event){
        if (event.target.classList.contains("next-step-btn")) {
        const nextStep = event.target.dataset.next; 
        showStep(nextStep);
    }})
}


