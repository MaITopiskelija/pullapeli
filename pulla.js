
let score = 0;
let bonusActive = false;
let leipuriActive = false;
let puotiActive = false;

// Pullan klikkaus
document.getElementById("pulla").addEventListener("click", function(event) {
    // Pisteiden lisäys 
    if (puotiActive) {
        score += 100;
    } else if (leipuriActive) {
        score += 10;
    } else if (bonusActive) {
        score += 2;
    } else {
        score += 1;
    }

    updateScore();
    createFloatingPulla();

    // Tarkistus
    if (score >= 50) {
        document.getElementById("addPulla").classList.add("active-upgrade");
    }
    if (score >= 200) {
        document.getElementById("addLeipuri").classList.add("active-upgrade");
    }
    if (score >= 1000) {
        document.getElementById("addPuoti").classList.add("active-upgrade");
    }
    if (score >= 10000) {
        endGame();
    }
});

// "Lisää pullaa" -painikkeen klikkaus
document.getElementById("addPulla").addEventListener("click", function() {
    if (score >= 50 && !bonusActive) {
        bonusActive = true;
        this.style.background = "#cccccc";
        this.style.pointerEvents = "none";
    }
});

// "Lisää Leipuri" -painikkeen klikkaus
document.getElementById("addLeipuri").addEventListener("click", function() {
    if (score >= 200 && !leipuriActive) {
        leipuriActive = true;
        this.style.background = "#cccccc";
        this.style.pointerEvents = "none";
    }
});

// "Lisää Puoti" -painikkeen klikkaus
document.getElementById("addPuoti").addEventListener("click", function() {
    if (score >= 1000 && !puotiActive) {
        puotiActive = true;
        this.style.background = "#cccccc";
        this.style.pointerEvents = "none";
    }
});

// Päivitä pisteet näytölle
function updateScore() {
    document.getElementById("score").textContent = score;
}

// Luo leijuvia pullia, jotka liikkuvat satunnaisesti koko näytöllä
function createFloatingPulla() {
    let pulla = document.createElement("img");
    pulla.src = "images/pulla.png";
    pulla.classList.add("floating-pulla");
    document.body.appendChild(pulla);

    // Satunnainen aloitussijainti
    let randomX = Math.random() * window.innerWidth;
    let randomY = Math.random() * window.innerHeight;

    // Animaation liike
    let speedX = (Math.random() - 0.5) * 2; // Liikkeen suunta
    let speedY = (Math.random() - 0.5) * 2;

    let x = randomX;
    let y = randomY;

    function move() {
        x += speedX;
        y += speedY;

        // Rajojen tarkistus
        if (x < 0 || x > window.innerWidth) speedX = -speedX;
        if (y < 0 || y > window.innerHeight) speedY = -speedY;

        pulla.style.left = x + "px";
        pulla.style.top = y + "px";

        requestAnimationFrame(move); 
    }

    move();

    // Poistetaan kuva animaation päätyttyä
    setTimeout(function() {
        pulla.style.opacity = 0;
        setTimeout(() => {
            pulla.remove();
        }, 1000);
    }, 5000);
}

// Peli päättyy
function endGame() {
    document.getElementById("endMessage").style.display = "block";
    document.getElementById("pulla-container").style.display = "none";
    document.getElementById("game-instructions").style.display = "none";
}
