// LISTENERS
document.addEventListener( 'keydown', keyPush );

// canvas
const canvas = document.querySelector( "canvas" );
const ctx = canvas.getContext( "2d" );

ctx.fillStyle = "darkviolet";
ctx.fillRect( 0, 0, canvas.width, canvas.height );

// player
const snakeSize = 30;
let snakePosX = 0;
let snakePosY = canvas.height / 2;
let snakeSpeed = snakeSize;

const tileCountX = canvas.width / snakeSize
const tileCountY = canvas.height / snakeSize

let velocityX = 0;
let velocityY = 0;

// food
let foodPosX = 0
let foodPosY = 0



ctx.fillStyle = 'white'
ctx.fillRect( snakePosX, snakePosY, snakeSize, snakeSize )


// loop
function gameLoop() {


    drawStuff();
    moveStuff();

    setTimeout( gameLoop, 1000/10 );
}

resetFood()
gameLoop()


/**
 *  DRAW EVERYTHING
 */
function drawStuff() {
    // background
    rectangle( 'darkviolet', 0, 0, canvas.width, canvas.height );

    
    // gird
    drawGrid()

    rectangle( 'green', foodPosX, foodPosY, snakeSize, snakeSize )

    // snake
    rectangle( 'white', snakePosX, snakePosY, snakeSize, snakeSize );
}

function drawGrid() {
    for( let i = 0; i < tileCountX; i++ ) {
        for( let j = 0; j < tileCountY; j++ ) {

            rectangle( "darkblue", snakeSize * i, snakeSize * j, snakeSize-1, snakeSize-1 )
        }
    }
}

// draw rectangle
function rectangle( color, x, y, width, height ) {
    ctx.fillStyle = color
    ctx.fillRect( x, y, width, height )

}

/**
 *  MOVE EVERYTHING
 */
function moveStuff() {
    snakePosX += snakeSpeed * velocityX;
    snakePosY += snakeSpeed * velocityY;


    // wall collision
    if( snakePosX > canvas.width - snakeSize ) {
        snakePosX = 0;
    }
    if( snakePosX < 0 ) {
        snakePosX = canvas.width;
    }
    if( snakePosY > canvas.height-snakeSize ) {
        snakePosY = 0;
    }
    if( snakePosY < 0 ) {
        console.log(canvas.height)
        snakePosY = canvas.height;
    }

    // food collision
    if( snakePosX == foodPosX && snakePosY == foodPosY ) {
        resetFood()

        
    }
    
}

function resetFood() {
    foodPosX = Math.floor( Math.random() * tileCountX ) * snakeSize 
    foodPosY = Math.floor( Math.random() * tileCountY ) * snakeSize 
}

function keyPush(event) {
    switch( event.key ) {
        case 'ArrowUp':
            if( velocityY != 1 ) {

                velocityX = 0;
                velocityY = -1;
            }
            break;
        case 'ArrowDown':
            if( velocityY != -1 ) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case 'ArrowRight':
            if( velocityX != -1 ) {

                velocityX = 1;
                velocityY = 0;
            }
            break;
        case 'ArrowLeft':
            if( velocityX != 1 ) {

                velocityX = -1;
                velocityY = 0;
            }
            break;
        

    }
}