const squareWidth = 28;
const gridEl = document.querySelector(".grid");
let scoreEl = document.getElementById("score");
let messageEl = document.getElementById("message");

let squares = [];
let score = 0;

// 0: pac dots
// 1: wall
// 2: ghost fair
// 3: power pellets
// 4: empty

let layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,1,2,2,2,2,1,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,1,2,2,2,2,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

function createBoard() {
    for(let i = 0; i < layout.length; i++) {
        const square = document.createElement("div");
        gridEl.appendChild(square);
        squares.push(square);
        
        if(layout[i] === 0) {
            squares[i].classList.add("pac-dot");
        } else if(layout[i] === 1) {
            squares[i].classList.add("wall");
        } else if(layout[i] === 2) {
            squares[i].classList.add("ghost-laider");
        } else if(layout[i] === 3) {
            squares[i].classList.add("power-pellet");
        }
    }
}
createBoard();

// starting position of pacman
let currentIndexOfPacman = 490;
squares[currentIndexOfPacman].classList.add("pacman");

// key codes
// 37 left - 38 up - 39 right - 40 down
function control(e) {
    squares[currentIndexOfPacman].classList.remove("pacman");

    switch(e.keyCode) {
        case 37:
            if(
                !squares[currentIndexOfPacman - 1].classList.contains("ghost-lair") && 
                !squares[currentIndexOfPacman - 1].classList.contains("wall") && 
                currentIndexOfPacman % squareWidth !== 0
            ) {
                currentIndexOfPacman -= 1;
                if(currentIndexOfPacman === 364) {
                    currentIndexOfPacman= 391;
                }
            };
            break;
        case 38:
            if(
                !squares[currentIndexOfPacman - squareWidth].classList.contains("ghost-lair") && 
                !squares[currentIndexOfPacman - squareWidth].classList.contains("wall") && 
                currentIndexOfPacman > squareWidth - 1
                ) {
                currentIndexOfPacman -= squareWidth;
            }
            break;
        case 39:
            if(
                !squares[currentIndexOfPacman + 1].classList.contains("ghost-lair") && 
                !squares[currentIndexOfPacman + 1].classList.contains("wall") && 
                currentIndexOfPacman % squareWidth < squareWidth - 1) {
                currentIndexOfPacman +=1;
                if(currentIndexOfPacman === 391) {
                    currentIndexOfPacman= 364;
                }
            }
            break;
        case 40:
            if(
                !squares[currentIndexOfPacman + squareWidth].classList.contains("ghost-lair") && 
                !squares[currentIndexOfPacman + squareWidth].classList.contains("wall") && 
                currentIndexOfPacman + squareWidth < squareWidth * squareWidth
                ) {
                currentIndexOfPacman += squareWidth;
            }
            break;
    }

    pacDotEaten();
    powerPelletEaten();
    youWin();
    youLose();

    squares[currentIndexOfPacman].classList.add("pacman");
}
document.addEventListener("keyup", control);

function pacDotEaten() {
    if(squares[currentIndexOfPacman].classList.contains("pac-dot")) {
        squares[currentIndexOfPacman].classList.remove("pac-dot");
        score++;
        scoreEl.textContent = score;
    }
}

function powerPelletEaten() {
    if(squares[currentIndexOfPacman].classList.contains("power-pellet")) {
        squares[currentIndexOfPacman].classList.remove("power-pellet");
        score += 10;
        scoreEl.textContent = score;
        ghosts.forEach(ghost => ghost.isScared = true);
        setTimeout(unScareGhost, 10000);
    }
}

function unScareGhost() {
    ghosts.forEach(ghost => ghost.isScared = false);
}

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.isScared = false;
        this.timerId = NaN;
    }
}

const ghosts = [
    new Ghost("blinky", 376, 250),
    new Ghost("pinky", 404, 400),
    new Ghost("inky", 379, 300),
    new Ghost("clyde", 407, 150)
]

ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add("ghost");   
    squares[ghost.currentIndex].classList.add(ghost.className);
});

ghosts.forEach(ghost => moveGhosts(ghost));

function moveGhosts(ghost) {
    const directions = [-1, 1, -squareWidth, squareWidth];
    let direction = directions[Math.floor(Math.random() * directions.length)];

    ghost.timerId = setInterval(function() {
        if(
            !squares[ghost.currentIndex + direction].classList.contains("wall") &&
            !squares[ghost.currentIndex + direction].classList.contains("ghost")
        ) {
            squares[ghost.currentIndex].classList.remove(ghost.className);
            squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");
            ghost.currentIndex += direction;
            squares[ghost.currentIndex].classList.add(ghost.className);
            squares[ghost.currentIndex].classList.add("ghost");

        } else {
            direction = directions[Math.floor(Math.random() * directions.length)]
        
        }

        if(ghost.isScared) {
            squares[ghost.currentIndex].classList.add("scared-ghost");
        }
    
        if(ghost.isScared && squares[currentIndexOfPacman].classList.contains(ghost.className)) {
            squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
            ghost.currentIndex = ghost.startIndex;
            score += 100;
            scoreEl.textContent = score;
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
        }

        youLose();

    }, ghost.speed);

}

function youLose() {
    if(
        squares[currentIndexOfPacman].classList.contains("ghost") &&
        !squares[currentIndexOfPacman].classList.contains("scared-ghost")
    ) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener("keyup", control);
        scoreEl.textContent = score;
        messageEl.textContent = `YOU LOST!😥`;
    }
}

function youWin() {
    if(score >= 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener("keyup", control);
        scoreEl.textContent = score;
        messageEl.textContent = `YOU WON!🥳`;
    }
}