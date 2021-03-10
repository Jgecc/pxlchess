/* Every single tile coordinate */

// This Array is storing the position in pixels for every tile on the board
// You call it like this tileCoordinate[row][column][0 or 1]
let tileCoordinate = [];

function tileCoordinates() {
    let posx = width - tileWidth;
    let posy = 0;

    for (let y = 0; y < tileNumbery; y++) {

        tileCoordinate[y] = [0];

        for (let x = 0; x < tileNumberx; x++) {

            tileCoordinate[y][x] = [posx, posy];
            posx -= tileWidth;
        }
        posy += tileHeight;
        posx = width - tileWidth;
    }
}

tileCoordinates();

/* Coordinate to tile */

function coordinatteToTile(posx, posy, what) {
    let tilePositionX = (Math.floor(posx / tileWidth) + (tileNumberx - 1)) - (Math.floor(posx / tileWidth) * 2);
    let tilePositionY = (Math.floor(posy / tileWidth) + (tileNumberx - 1)) - (Math.floor(posy / tileWidth) * 2);

    if (what == "x") {
        return tilePositionX;
    }else if (what == "y") {
        return tilePositionY;
    }else {
        return [tilePositionX, tilePositionY];
    }
}

/* Board Variable */

// All figures on the board
// You call it like this positions[row][column]
let positions = [];

// creates a Dimension for each row in an array
for (let y = 0; y < tileNumbery; y++) {

    positions[y] = [0];

    for (let x = 0; x < tileNumberx; x++) {

        positions[y][x] = 0;
    }
}

positions[0][0] = -1;
positions[1][1] = -1;

/*
 * What are the positions?
 * positions[0][0] = top right corner
 * positions[7][7] = bottom left corner
 *
 *
 * What number corresponds to what?
 *
 * 0 = Empty
 * 1 = King
 * 2 = Queen
 * 3 = Rock
 * 4 = Bishop
 * 5 = Knight
 * 6 = Pawn
 * 7 = Passant
 * 8 = Possible moves of selected figure
 *
 * If the number is negative it's a Black figure else it's white
 */

/* Read fen */

function splitMulti(str, tokens){
    let tempChar = tokens[0]; // We can use the first token as a temporary join character
    for (let i = 1; i < tokens.length; i++){
        str = str.split(tokens[i]).join(tempChar);
    }
    str = str.split(tempChar);
    return str;
}

let fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
let fenSplit = splitMulti(fen, ['/', ' ']);

/* Chess figure placement */

/* Find clickposition */

let mousePosition;

app.stage.interactive = true;
app.stage.hitArea = app.screen;
app.stage.pointerdown = findTile;

// Gets the tile the mouse cilcked at
function findTile() {
    // The mouse position
    let mouse = app.renderer.plugins.interaction.mouse.global;
    // Translate it to tile number for the positions array
    mousePosition = {
        x: coordinatteToTile(mouse.x, 0, "x"),
        y: Math.floor(mouse.y / tileHeight)
    }

    console.log(positions[mousePosition.x][mousePosition.y]);
    //console.log(mousePosition, mousePosition.y);

    // Calls the correct figure
    getCorrectFigure(positions[mousePosition.x][mousePosition.y], mousePosition.x, mousePosition.y, 0);
}

function getCorrectFigure(figure, posx, posy, state) {
    let uncoloredFigure = Math.abs(figure);

    // Deletes the unused Figure
    if (figure != 8 && activePosition != mousePosition && state == 0) {
        console.log(activeFigure + "hi");
        deletePossibleFields();
    }

    // Chooses the right Figure
    if (uncoloredFigure == 1) {
        king(figure, posx, posy, state);
    }
    else if (uncoloredFigure == 8) {
        getCorrectFigure(activeFigure, posx, posy, 1);
        deletePossibleFields();
    }
}