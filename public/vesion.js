let mission = document.querySelector(".Mission");
let vision = document.querySelector(".Vision");
let values = document.querySelector(".Values");

function Vision() {
  if (vision.classList.contains("hidden")) {
    vision.classList.remove("hidden");
    vision.classList.add("show");
    mission.classList.add("hidden");
    values.classList.add("hidden");
  }
}

function Mission() {
  if (mission.classList.contains("hidden")) {
    mission.classList.remove("hidden");
    mission.classList.add("show");
    values.classList.add("hidden");
    vision.classList.add("hidden");
  }
}

function Values() {
  if (values.classList.contains("hidden")) {
    values.classList.remove("hidden");
    values.classList.add("show");
    vision.classList.add("hidden");
    mission.classList.add("hidden");
  }
}
