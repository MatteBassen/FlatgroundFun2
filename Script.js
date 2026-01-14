const trickDisplay = document.getElementById("trickDisplay");
const diffDisplay = document.getElementById("diffDisplay");
const randomBtn = document.getElementById("randomButton");
const filterButtons = document.querySelectorAll(".filter-btn");

const link = document.getElementById("link")

const diffColors = {
    easy: "lightgreen",
    intermediate: "orange",
    hard: "red"
};

let flatTricks = [];
let activeFilters = new Set(["easy", "intermediate", "hard"]); // all active by default

// Load and flatten JSON
async function loadTricks() {
    const response = await fetch("tricks.json");
    const data = await response.json();

    flatTricks = [];

    for (const name in data) {
        for (const stance in data[name]) {
            flatTricks.push({
                name,
                stance,
                difficulty: data[name][stance]
            });
        }
    }
}

// Toggle filters when button is clicked
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const diff = btn.dataset.difficulty.toLowerCase();

        if (activeFilters.has(diff)) {
            activeFilters.delete(diff);
            btn.style.color = "red"; // show it’s off
        } else {
            activeFilters.add(diff);
            btn.style.color = "white"; // show it’s on
        }
    });
});

// Get random trick based on active filters
function getRandomTrick() {
    const pool = flatTricks.filter(trick =>
        activeFilters.has(trick.difficulty.toLowerCase())
    );

    if (pool.length === 0) {
        trickDisplay.innerHTML = "<h1>No tricks for selected filters!</h1>";
        diffDisplay.innerHTML = "";
        return;
    }

    const randomIndex = Math.floor(Math.random() * pool.length);
    displayTrick(pool[randomIndex]);
}

// Display trick
function displayTrick(trick) {
    trickDisplay.innerHTML = `<h1>${trick.stance} ${trick.name}</h1>`;
    const difficulty = trick.difficulty.toLowerCase();
    const color = diffColors[difficulty] || "black";
    diffDisplay.innerHTML = `<h1 style="color: ${color}">${trick.difficulty}</h1>`;
}

let lightMode = true
const lightDarkBtn = document.getElementById("darkModeBtn")

function switchDarkMode(){
    if (lightMode) {
    link.href = "StyleDarkMode.css"
    const logo = document.getElementById("fgflogo");
    logo.src = "./Assets/FlatgroundFunLogoWhiteSlim.png"
    lightMode = false
    lightDarkBtn.innerHTML = "<h3>Switch to light mode</h3>"

    }
    else {
        lightMode = true
        link.href = "Style.css"
        const logo = document.getElementById("fgflogo");
        logo.src = "./Assets/FlatgroundFunLogoSlim.png"
        lightDarkBtn.innerHTML = "<h3>Switch to dark mode</h3>"
    }   
}


// Load JSON when page loads
loadTricks();

// Random trick button
randomBtn.addEventListener("click", getRandomTrick);