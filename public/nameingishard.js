let mission = document.querySelector(".Mission");
let vision = document.querySelector(".Vision");
let values = document.querySelector(".Values");
let img1 = document.querySelector('.img1');
let img2 = document.querySelector('.img2');
let img3 = document.querySelector('.img3');
function Vision() {
  if (vision.classList.contains("hidden")) {
    vision.classList.remove("hidden");
    img2.classList.remove("hiddenImg");
    img2.classList.add("showImg");

    img1.classList.add("hiddenImg");
    img3.classList.add("hiddenImg");

    vision.classList.add("show");
    mission.classList.add("hidden");
    values.classList.add("hidden");
  }
}

function Mission() {
    console.log("I'm amazingly here")
  if (mission.classList.contains("hidden")) {
    img3.classList.remove("hiddenImg");
    img3.classList.add("showImg");

    img1.classList.add("hiddenImg");
    img2.classList.add("hiddenImg");
    

    mission.classList.remove("hidden");
    mission.classList.add("show");
    values.classList.add("hidden");
    vision.classList.add("hidden");
  }
}

function Values() {
  if (values.classList.contains("hidden")) {
    img1.classList.remove("hiddenImg");
    img1.classList.add("showImg");

    img2.classList.add("hiddenImg");
    img3.classList.add("hiddenImg");
    
    values.classList.remove("hidden");
    values.classList.add("show");

    vision.classList.remove("show")
    mission.classList.remove("show")
    vision.classList.add("hidden");
    mission.classList.add("hidden");
  }
}
