

class Player {
    constructor() {
        this.width = 15;
        this.height = 15;
        this.positionX = (630 - this.width) / 2;
        this.positionY = (630 - this.height) / 2;
        this.domElementPlayer = null;
        this.board = null;

        this.createPlayerElement();
    }

    createPlayerElement() {
        this.domElementPlayer = document.createElement("div");

        this.domElementPlayer.id = "player";
        this.domElementPlayer.style.width = this.width + "px";
        this.domElementPlayer.style.height = this.height + "px";
        this.domElementPlayer.style.left = this.positionX + "px";
        this.domElementPlayer.style.bottom = this.positionY + "px";

        this.board = document.getElementById("board");
        this.board.appendChild(this.domElementPlayer);
    }

    moveRight() {
        const boardWidth = this.board.offsetWidth;

        if (player.positionX + this.width * 2 < boardWidth) {
            this.positionX = this.positionX + 5;
            this.domElementPlayer.style.left = this.positionX + "px";
        }
        else {
            return
            console.log("game over");
        }
    }
    moveLeft() {
        this.positionX = this.positionX - 5;
        if (player.positionX > 0) {
            this.positionX = this.positionX - 5;
            this.domElementPlayer.style.left = this.positionX + "px"
        }
        else {    
            console.log("game over");
            return
        }
    }
    
    moveUp() {
        const boardHeight = this.board.offsetHeight;

        if (player.positionY + this.height * 2 < boardHeight) {
            this.positionY = this.positionY + 5;
            this.domElementPlayer.style.bottom = this.positionY + "px";
        }
        else {
            return
            console.log("game over");
        }
    }
    moveDown() {
        if (player.positionY > 0) { 
            this.positionY = this.positionY - 5;
            this.domElementPlayer.style.bottom = this.positionY + "px";
        } else {
            return
            console.log("game over")
        }
    }
}

const player = new Player();


document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
        player.moveLeft();
    }
    else if (e.code === 'ArrowRight') {
        player.moveRight();
    }
    else if (e.code === 'ArrowUp') {
        player.moveUp();
    }
    else if (e.code === 'ArrowDown') {
        player.moveDown();
    }
})




class Food {
    constructor() {
        this.width = 15;
        this.height = 15;
        this.positionX = Math.floor(Math.random() * (615 + 1));
        this.positionY = Math.floor(Math.random() * (615 + 1));
        this.domElementFood = null;
        this.board = null;

        this.createFoodElement();
    }

    createFoodElement() {
        this.domElementFood = document.createElement("div");

        this.domElementFood.className = "food";
        this.domElementFood.style.width = this.width + "px";
        this.domElementFood.style.height = this.height + "px";
        this.domElementFood.style.left = this.positionX + "px";
        this.domElementFood.style.bottom = this.positionY + "px";

        this.board = document.getElementById("board");
        this.board.appendChild(this.domElementFood);
    }

}



const foodArr = [];

function createFoodAtRandom() {

    // generate new food
    const food = new Food();
    foodArr.push(food);

    // remove it, after a delay
    setTimeout(() => {
        foodArr[0].domElementFood.remove(); // remove from the UI
        foodArr.shift(); // remove from the array
    }, 10000);

    // keep generating new foods
    let randomDelay = Math.floor(Math.random() * (12000 - 5000 + 1)) + 5000;
    setTimeout(createFoodAtRandom, randomDelay);
}



createFoodAtRandom();