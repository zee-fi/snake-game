

class Player {
    constructor(){
        this.width = 1;
        this.height = 2;
        this.positionX = 35 - this.width / 2;
        this.positionY = 35 - this.height / 2;

        this.createPlayerElement();
    }

    createPlayerElement() {
        const domElementPlayer = document.createElement("div");

        domElementPlayer.id = "player";
        domElementPlayer.style.width = this.width + "vw";
        domElementPlayer.style.height = this.height + "vh";
        domElementPlayer.style.left = this.positionX + "vw";
        domElementPlayer.style.bottom = this.positionY + "vh";

        const board = document.getElementById("board");
        board.appendChild(domElementPlayer);
    }

    moveRigt() {
        this.positionX++;
    }
    moveLeft() {
        this.positionX--;
    }
    moveUp() {
        this.positionY++;
    }
    moveDown() {
        this.positionY--;
    }
}

const player = new Player();


