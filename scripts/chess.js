/*!
 *
 *   pxlchess
 *   Author: Jgecc <jgecc@gmail.com>
 *   Version: v0.0.2
 *   Url: https://github.com/jgecc/pxlchess
 *   License(s): ?
 *
 */

/* Basic Information */
const width = 600;
const height = 600;

const tileNumberx = 8;
const tileNumbery = 8;

const tileWidth = width / tileNumberx;
const tileHeight = height / tileNumbery;
const smallestTileSide = (tileWidth > tileHeight) ? tileHeight : tileWidth;

/* Create a Pixi Application */
let app = new PIXI.Application({
    width: width,
    height: height
});

document.getElementById("game").appendChild(app.view);

/* Boardcreation */

// Standars values
const fontSize = smallestTileSide / 4;
const brightTileColor = "0xEADDCA";
const darkTileColor = "0x967969";

// Fontsytle for Number on the board
const style = new PIXI.TextStyle({
    fill: '#000000',
    fontSize: fontSize
});

// Creates the actual tiles
function chessTiles(color, posX, posY, width, height, numbers, texts) {

    // The tile it self
    let tile = new PIXI.Graphics();
    tile.beginFill(color);
    tile.drawRect(posX, posY, width, height);
    tile.endFill();

    // Number on the tiles
    let number = new PIXI.Text(numbers, style);
    number.x = posX + 5;
    number.y = posY + 5;

    // Letter on tiles
    let text = new PIXI.Text(texts, style);
    text.x = posX + (tileWidth - fontSize);
    text.y = posY + ((tileHeight - fontSize) - 5);

    app.stage.addChild(tile, number, text);
}

// Calls the tiles to create
function createBoard(){
    // For the chess pattern
    var flip = 1;
    // For the Number on the tiles
    var chessNumber = tileNumbery - 1;

    //  Tile loop

    for (var x = 0; x <= width - tileWidth; x += tileWidth){

        for (var y = 0; y <= height - tileHeight; y += tileHeight){

            // For the correct Letters
            var row = x / tileWidth;

            // Tilecreation
            if (flip > 0) {
                if (x == 0 && y == height - tileHeight) {
                    chessTiles(brightTileColor, x, y, tileWidth, tileHeight, chessNumber + 1, String.fromCharCode(65 + row));

                }else if (x == 0) {
                    chessTiles(brightTileColor, x, y, tileWidth, tileHeight, chessNumber + 1);

                }else if (y == height - tileHeight) {
                    chessTiles(brightTileColor, x, y, tileWidth, tileHeight, '', String.fromCharCode(65 + row));

                }else {
                    chessTiles(brightTileColor, x, y, tileWidth, tileHeight);
                }
            }else {
                if (x == 0 && y == height - tileHeight) {
                    chessTiles(darkTileColor, x, y, tileWidth, tileHeight, chessNumber + 1, String.fromCharCode(65 + row));

                }else if (x == 0) {
                    chessTiles(darkTileColor, x, y, tileWidth, tileHeight, chessNumber + 1);

                }else if (y == height - tileHeight) {
                    chessTiles(darkTileColor, x, y, tileWidth, tileHeight, '', String.fromCharCode(65 + row));

                }else {
                    chessTiles(darkTileColor, x, y, tileWidth, tileHeight);
                }
            }
            flip *= -1;
            chessNumber--;
        }
        chessNumber = tileNumbery - 1;
        flip *= -1;
    }
}

createBoard();

