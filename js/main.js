

class Player {
    constructor(){
        this.width = 1.5;
        this.height = 2;
        this.positionX = 35 - this.width / 2;
        this.positionY = 35 - this.height / 2;
        this.domElementPlayer = null;
        this.board = null;

        this.createPlayerElement();
    }

    createPlayerElement() {
        this.domElementPlayer = document.createElement("div");

        this.domElementPlayer.id = "player";
        this.domElementPlayer.style.width = this.width + "vw";
        this.domElementPlayer.style.height = this.height + "vh";
        this.domElementPlayer.style.left = this.positionX + "vw";
        this.domElementPlayer.style.bottom = this.positionY + "vh";

        this.board = document.getElementById("board");
        this.board.appendChild(this.domElementPlayer);
    }

    moveRight() {
        this.positionX++;
        this.domElementPlayer.style.left = this.positionX +"vw";
    }
    moveLeft() {
        this.positionX--;
        this.domElementPlayer.style.left = this.positionX +"vw";
    }
    moveUp() {
        this.positionY++;
        this.domElementPlayer.style.bottom = this.positionY +"vh";
    }
    moveDown() {
        this.positionY--;
        this.domElementPlayer.style.bottom = this.positionY +"vh";
    }
}

const player = new Player();


document.addEventListener('keydown', (e) => {
    if(e.code === 'ArrowLeft' || 'a'){
        player.moveLeft();
    }
    else if(e.code === 'ArrowRight' || 'd'){
        player.moveRight();
    }
    else if(e.code === 'ArrowUp' || 'w'){
        player.moveUp();
    }
    else if(e.code === 'ArrowDown' || 's'){
        player.moveDown();
    }
})