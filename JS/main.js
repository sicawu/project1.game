class Player {
    constructor() {
        this.width = 7;
        this.height = 16.5;
        this.positionX = 30;
        this.positionY = 0;
        this.domElm = null;
        this.speed = 2;  //to change the speed of player
        //this.playerImg = null;

        this.createDomElement();
        // this.createPlayerImg ();
    }
    createDomElement() {
        this.domElm = document.createElement("div");

        this.domElm.setAttribute("id", "player");
        this.domElm.style.width = this.width + "vw";
        this.domElm.style.height = this.height + "vh";
        this.domElm.style.left = this.positionX + "vw";
        this.domElm.style.bottom = this.positionY + "vh";

        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);
    }
    /*
        createPlayerImg() {
            this.playerImg = boardElm.getElementById("board")
            const image = new Image();
            image.src = "../images/player-new.png";
            image.alt = "Player";
            this.domElm.appendChild(image);
        }
    */
    moveRight() {
        if (this.positionX + this.width < 100) {
            this.positionX += this.speed;
            this.domElm.style.left = this.positionX + "vw";
        }
    }
    moveLeft() {
        if (this.positionX > 0) {
            this.positionX -= this.speed;
            this.domElm.style.left = this.positionX + "vw";
        }
    }
    jump() {
        const maxJumpHeight = 17;  // Can jump up to this % of the screen;

        if (this.positionY + this.height < 50) {
            // let newPositionY = this.positionY += 15;

            const jumpUp = setInterval(() => {
                if (this.positionY < maxJumpHeight) {
                    this.positionY += 0.9;
                    this.domElm.style.bottom = this.positionY + "vh";
                } else {
                    clearInterval(jumpUp);
                }
            }, 0.1);

            setTimeout(() => {
                clearInterval(jumpUp);
                const gravityDown = setInterval(() => {
                    if (this.positionY >= 0) {
                        this.positionY -= 0.2;
                        //this.positionY = newPositionY;
                        this.domElm.style.bottom = this.positionY + "vh";
                    } else {
                        clearInterval(gravityDown);
                    }
                }, 5);
            }, 700);
        }
    }
}
/*
moveDown() {
    if (this.positionY > 0) {
        this.positionY--;
        this.domElm.style.bottom = this.positionY + "vw";
    }
}
*/

class Goodies {
    constructor() {
        this.width = 4;
        this.height = 7;
        this.positionX = Math.random() * 60 + 30;
        this.positionY = 100;
        this.direction = Math.random() < 0.5 ? "downRight" : "downLeft";

        this.visible = true;
        this.domElm = null;
        this.createDomElement();
    }
    createDomElement() {
        this.domElm = document.createElement("div");

        this.domElm.setAttribute("id", "goodies");
        this.domElm.style.width = this.width + "vw";
        this.domElm.style.height = this.height + "vh";
        this.domElm.style.left = this.positionX + "vw";
        this.domElm.style.bottom = this.positionY + "vh";

        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);
    }

    moveFromTop() {
        if (!this.visible) return; // avoids moving when not visible

        if (this.direction === "downRight") {
            if (this.positionX + this.width >= 100) {
                this.direction = "downLeft";
            } else {
                this.positionY -= 0.3;
                this.positionX += 0.2;
            }
        } else if (this.direction === "downLeft") {
            if (this.positionX <= 0) {
                this.direction = "downRight";
            } else {
                this.positionY -= 0.3;
                this.positionX -= 0.2;
            }
        }
        this.domElm.style.bottom = this.positionY + "vh";
        this.domElm.style.left = this.positionX + "vw";
    }
}


/////////////////////
/* Obstacle Class */
////////////////////

class Obstacles {
    constructor() {
        this.width = 3.6;
        this.height = 8;
        this.radius = this.height / 2;
        this.positionX = Math.random() * 60 + 30;
        this.positionY = 100;
        this.direction = Math.random() < 0.5 ? "downRight" : "downLeft";

        this.domElm = null;
        this.createDomElement();
    }
    createDomElement() {
        this.domElm = document.createElement("div");

        this.domElm.setAttribute("id", "obstacles");
        this.domElm.style.width = this.width + "vw";
        this.domElm.style.height = this.height + "vh";
        this.domElm.style.left = this.positionX + "vw";
        this.domElm.style.bottom = this.positionY + "vh";
        this.domElm.style.radius = this.radius + "vh";

        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);
    }

    moveFromTop() {
        if (this.direction === "downRight") {
            if (this.positionX + this.width >= 100) {
                this.direction = "downLeft";
            } else {
                this.positionY -= 0.15;
                this.positionX += 0.1;
            }
        } else if (this.direction === "downLeft") {
            if (this.positionX <= 0) {
                this.direction = "downRight";
            } else {
                this.positionY -= 0.15;
                this.positionX -= 0.1;
            }
        }
        this.domElm.style.bottom = this.positionY + "vh";
        this.domElm.style.left = this.positionX + "vw";
    }

    moveFromTopLevelTwo() {
        if (this.direction === "downRight") {
            if (this.positionX + this.width >= 100) {
                this.direction = "downLeft";
            } else {
                this.positionY -= 0.17;
                this.positionX += 0.13;
            }
        } else if (this.direction === "downLeft") {
            if (this.positionX <= 0) {
                this.direction = "downRight";
            } else {
                this.positionY -= 0.17;
                this.positionX -= 0.13;
            }
        }
        this.domElm.style.bottom = this.positionY + "vh";
        this.domElm.style.left = this.positionX + "vw";
    }
    moveFromTopLevelThree() {
        if (this.direction === "downRight") {
            if (this.positionX + this.width >= 100) {
                this.direction = "downLeft";
            } else {
                this.positionY -= 0.1;
                this.positionX += 0.3;
            }
        } else if (this.direction === "downLeft") {
            if (this.positionX <= 0) {
                this.direction = "downRight";
            } else {
                this.positionY += 0.4;
                this.positionX -= 0.05;
            }
        }
        this.domElm.style.bottom = this.positionY + "vh";
        this.domElm.style.left = this.positionX + "vw";
    }

}
/*
    moveFromTop () {
        this.positionY--;
        this.domElm.style.bottom = this.positionY + "vw";
    }

    moveFromLeft () {
        this.positionX++;
        this.domElm.style.left = this.positionX + "vw";
    }
*/


//////////////////////////////////////////////
/* Instantiate the Player & Obstacle Array */
/////////////////////////////////////////////
const player = new Player();
const goodies = [];
const obstacles = [];


///////////////////////////////////////////////
/* Creating Goodies & Obstacles- setInterval */
///////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const goodieCountElement = document.getElementById('goodieCount');
    const boardElm = document.getElementById("board");

    let collectedGoodies = 0;
    let obstacleInterval = 2000;
    let level = 1;
    let levelOne;

    const addParagraph = document.createElement("p");
    addParagraph.textContent = `Collected Treasures: ${collectedGoodies}`;
    goodieCountElement.appendChild(addParagraph);

    /*const addParagraphLevel = document.createElement("p");
    addParagraphLevel.textContent = `Level: ${level}`;
    levelCountElement.appendChild(addParagraph);*/


    setInterval(() => {
        const newObstacle = new Obstacles();
        obstacles.push(newObstacle);
    }, obstacleInterval);
    if (collectedGoodies >= 5) {
    }

    setInterval(() => {
        levelOne = obstacles.forEach((obstacleEvent) => {
            obstacleEvent.moveFromTop();
            // console.log(`There are ${obstacles.length} obstacles`)

            /* FOR TWO RECTANGLES
            if (player.positionX < obstacleEvent.positionX + obstacleEvent.width &&
                player.positionX + player.width > obstacleEvent.positionX &&
                player.positionY < obstacleEvent.positionY + obstacleEvent.height &&
                player.height + player.positionY > obstacleEvent.positionY) {
                console.log("collision detected")
                obstacleEvent.domElm.remove(); 
                //location.href = "gameover.html";
            } */

            // BETWEEN RECTANGLE & CIRCLE: Check distance between both centres, Pythagorean theorem to calculate distance, git acheck that the distance is less than the radius.
            const distanceXBetweenCentres = player.positionX + player.width / 2 - obstacleEvent.positionX - obstacleEvent.radius;
            const distanceYBetweenCentres = player.positionY + player.height / 2 - obstacleEvent.positionY - obstacleEvent.radius;

            const distance = Math.sqrt(distanceXBetweenCentres * distanceXBetweenCentres + distanceYBetweenCentres * distanceYBetweenCentres);

            if (distance < player.width / 2 + obstacleEvent.radius) {
                console.log("Collision detected");
                obstacleEvent.domElm.remove();
                location.href = "gameover.html";
            }
            if (collectedGoodies >= 5) {
                obstacleEvent.moveFromTopLevelTwo();
                boardElm.style.backgroundImage = "url('../images/level-two-desert-landscape-spaceship.jpg')";
                boardElm.style.backgroundImagePosition = "center";
            }
            if (collectedGoodies >= 10) {
                obstacleEvent.moveFromTopLevelThree();
                boardElm.style.backgroundImage = "url('../images/level-three-battefield-spaceship.jpg')";
            }
        });
    }, 15);

    setInterval(() => {
        const newGoodie = new Goodies();
        goodies.push(newGoodie);
    }, 3000);

    setInterval(() => {
        goodies.forEach((goodieEvent, index) => {
            if (goodieEvent.visible) {
                goodieEvent.moveFromTop();
            }
            //console.log(`There are ${goodies.length} goodies`)

            if (player.positionX < goodieEvent.positionX + goodieEvent.width - 2 &&
                player.positionX + player.width - 2 > goodieEvent.positionX &&
                player.positionY < goodieEvent.positionY + goodieEvent.height - 2 &&
                player.height - 2.5 + player.positionY > goodieEvent.positionY) {
                //console.log("goodie collected");

                goodies.splice(index, 1); // So it counts only once at collision
                collectedGoodies++;
                addParagraph.textContent = `Collected Treasures: ${collectedGoodies}`;
                goodieEvent.domElm.remove(); // hides element after collision
                //console.log(`${collectedGoodies}`)
            }
        });
        renderVisibleGoodies();
    }, 30);
}
)


///////////////////
///// Rendering //
//////////////////
function renderVisibleGoodies() {
    const boardElm = document.getElementById("board");

    boardElm.appendChild(player.domElm);

    goodies.forEach((goodieEvent) => {
        if (goodieEvent.visible) {
            boardElm.appendChild(goodieEvent.domElm);
        }
    });
    obstacles.forEach((obstacleEvent) => {
        boardElm.appendChild(obstacleEvent.domElm);
    });
}


///////////////////
/* EventListener */
///////////////////
document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
        console.log("left");
        player.moveLeft();
    } else if (event.code === 'ArrowRight') {
        console.log("right");
        player.moveRight();
    } else if (event.code === 'Space') {
        console.log("up");
        player.jump();
    }
})




