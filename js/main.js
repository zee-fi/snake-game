const grid = 24;
const board = document.getElementById("board");
let gameOver = false;
let pointsCounter = 0;
let livesCounter = 5;

function gameEnd() {
    if (player.position[0].x < 1 || player.position[0].x > grid ||
        player.position[0].y < 1 || player.position[0].y > grid
    )
    return gameOver = true;
}


////////////////////////////////////PLAYER//////////////////////////////////

class Player {
    constructor() {
        this.speed = 2;
        this.position = [{ x: 12, y: 12 }]
        this.oldPosition = { x: 0, y: 0 };
        this.newPosition = { x: 0, y: 0 };
        this.playerElement = [];
       
        this.createPlayerElement();
    }

    createPlayerElement() {
        const playerElement = document.createElement("div");

        playerElement.className = "player";
        playerElement.style.gridColumnStart = this.position[0].x;
        playerElement.style.gridRowStart = this.position[0].y;

        this.board = document.getElementById("board");
        this.board.appendChild(playerElement);

        this.playerElement = playerElement;
    }

    movePlayer() {
        this.position[0].x += this.newPosition.x;
        this.position[0].y += this.newPosition.y;

        this.playerElement.style.gridColumnStart = this.position[0].x;
        this.playerElement.style.gridRowStart = this.position[0].y;

        this.checkCollision();
        }

    
    checkCollision() {
        const foodElementIndex = foodArr.findIndex((element) => {
            return  element.position[0].x === this.position[0].x &&
                    element.position[0].y === this.position[0].y; 
        });
        if (foodElementIndex !== -1) {
            foodArr[foodElementIndex].domElementFood.remove();
            foodArr.splice(foodElementIndex, 1);
            this.speed++;
        }

        const pointsElementIndex = pointsArr.findIndex((element) => {
            return  element.position[0].x === this.position[0].x &&
                    element.position[0].y === this.position[0].y; 
        });
        if (pointsElementIndex !== -1) {
            pointsArr[pointsElementIndex].domElementPoints.remove();
            pointsArr.splice(pointsElementIndex, 1);
            pointsCounter++;
        }

        const obstacleElementIndex = obstacleArr.findIndex((element) => {
            return  element.position[0].x === this.position[0].x &&
                    element.position[0].y === this.position[0].y; 
        });
        if (obstacleElementIndex !== -1) {
            obstacleArr[obstacleElementIndex].domElementObstacle.remove();
            obstacleArr.splice(obstacleElementIndex, 1);
            livesCounter--;
        }
    }
}

const player = new Player();


document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
        player.newPosition = { x: -1, y: 0 };
    }
})

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') {
        player.newPosition = { x: 1, y: 0 };
    }
})

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp') {
        player.newPosition = { x: 0, y: -1 };
    }
})

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowDown') {
        player.newPosition = { x: 0, y: 1 };
    }
})


////////////////////////////////////FOOD//////////////////////////////////


class Food {
    constructor() {
        this.position = [{ x: Math.floor(Math.random() * (grid -1) +1), y: Math.floor(Math.random() * (grid -1) +1) }]

        this.createFoodElement(); 
    }

    createFoodElement() {
        this.domElementFood = document.createElement("div");

        this.domElementFood.className = "food";
        this.domElementFood.style.gridColumnStart = this.position[0].x;
        this.domElementFood.style.gridRowStart = this.position[0].y;

        this.board = document.getElementById("board");
        this.board.appendChild(this.domElementFood);
    }
}


const foodArr = [];
const foodIndex = [];


function createFoodAtRandom() {

    // generate new food
    const food = new Food();
    foodArr.push(food);

    // keep generating new foods
    let randomDelay = Math.floor(Math.random() * (12000 - 5000 + 1)) + 5000;
    setTimeout(createFoodAtRandom, randomDelay);
}

createFoodAtRandom();


////////////////////////////////////POINTS//////////////////////////////////


class Points {
    constructor() {
        this.position = [{ x: Math.floor(Math.random() * (grid -1) +1), y: Math.floor(Math.random() * (grid -1) +1) }]

        this.createPointsElement(); 
    }

    createPointsElement() {
        this.domElementPoints = document.createElement("div");

        this.domElementPoints.className = "points";
        this.domElementPoints.style.gridColumnStart = this.position[0].x;
        this.domElementPoints.style.gridRowStart = this.position[0].y;

        this.board = document.getElementById("board");
        this.board.appendChild(this.domElementPoints);
    }
}

const pointsArr = [];
const pointsIndex = [];

function createPointsAtRandom() {

    // generate new food
    const points = new Points();
    pointsArr.push(points);

    // keep generating new foods
    let randomDelay = Math.floor(Math.random() * (12000 - 5000 + 1)) + 5000;
    setTimeout(createPointsAtRandom, randomDelay);
}


createPointsAtRandom();



////////////////////////////////////OBSTACLE//////////////////////////////////

class Obstacle {
    constructor() {
        this.position = [{ x: Math.floor(Math.random() * (grid -1) +1), y: Math.floor(Math.random() * (grid -1) +1) }]

        this.createObstacleElement(); 
    }

    createObstacleElement() {
        this.domElementObstacle = document.createElement("div");

        this.domElementObstacle.className = "obstacle";
        this.domElementObstacle.style.gridColumnStart = this.position[0].x;
        this.domElementObstacle.style.gridRowStart = this.position[0].y;

        this.board = document.getElementById("board");
        this.board.appendChild(this.domElementObstacle);
    }
}


const obstacleArr = [];
const obstacleIndex = [];


function createObstacleAtRandom() {

    // generate new food
    const obstacle = new Obstacle();
    obstacleArr.push(obstacle);

    // keep generating new foods
    let randomDelay = Math.floor(Math.random() * (12000 - 5000 + 1)) + 5000;
    setTimeout(createObstacleAtRandom, randomDelay);
}


function outOfLives() {
    if (livesCounter === 0) {
    return gameOver = true;
    }
}



createObstacleAtRandom();


////////////////////////////////////OBSTACLE//////////////////////////////////


let lastRender = 0;

function gameLoop(currentTime) {
    if (gameOver) {
        if (confirm('You lost. Press OK to restart.')) {
            window.location = '/'
        }
        return
    }
    
    window.requestAnimationFrame(gameLoop);
    const sinceLastRender = (currentTime - lastRender) / 1000;
    if (sinceLastRender < 1 / player.speed) return;

    lastRender = currentTime;

    player.movePlayer();
    gameEnd();
    outOfLives();
}

window.requestAnimationFrame(gameLoop);



