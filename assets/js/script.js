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
let snakePosY = canvas.height / 2 - snakeSize / 2;
let snakeSpeed = 30;

let velocityX = 0;
let velocityY = 0;


ctx.fillStyle = 'white'
ctx.fillRect( snakePosX, snakePosY, snakeSize, snakeSize )


// loop
function gameLoop() {


    drawStuff();
    moveStuff();

    setTimeout( gameLoop, 1000/15 );
}
gameLoop()


/**
 *  DRAW EVERYTHING
 */
function drawStuff() {
    rectangle( 'darkviolet', 0, 0, canvas.width, canvas.height );
    rectangle( 'white', snakePosX, snakePosY, snakeSize, snakeSize );

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



    if( snakePosX > canvas.width + snakeSize ) {
        snakePosX = -snakeSize;
    }
    if( snakePosX < -snakeSize ) {
        snakePosX = canvas.width;
    }
    if( snakePosY < -snakeSize ) {
        snakePosY = canvas.height;
    }
    if( snakePosY > canvas.height ) {
        snakePosY = 0;
    }
    
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