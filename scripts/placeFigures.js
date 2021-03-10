/* Possible fields creator */

// Variables for the possible fields
let possibleFieldSize = 40;
let possibleFiledSizeHover = 5;
let possibleFieldCounter = 0;

let possibleField = [];

// Creates the possible fields
function possibleFields(posx, posy) {
    // Translates the fields to the actual position
    let truePosX = tileCoordinate[posy][posx][0];
    let truePosY = tileCoordinate[posy][posx][1];
    // Offset to center the fields
    let posPlus = possibleFieldSize / 2;

    // Creates the Fields
    possibleField[possibleFieldCounter] = PIXI.Sprite.from('possibleField.png');
    possibleField[possibleFieldCounter].width = tileWidth - possibleFieldSize;
    possibleField[possibleFieldCounter].height = tileHeight - possibleFieldSize;
    possibleField[possibleFieldCounter].position.set(truePosX + posPlus, truePosY + posPlus);

    // Ads the interactivity
    possibleField[possibleFieldCounter].interactive = true;

    possibleField[possibleFieldCounter].mouseover = function() {
        this.width = this.width + possibleFiledSizeHover;
        this.height = this.height + possibleFiledSizeHover;
        this.position.set(truePosX + posPlus - possibleFiledSizeHover / 2, truePosY + posPlus - possibleFiledSizeHover / 2);
    }

    possibleField[possibleFieldCounter].mouseout = function() {
        this.width = this.width - possibleFiledSizeHover;
        this.height = this.height - possibleFiledSizeHover;
        this.position.set(truePosX + posPlus, truePosY + posPlus);
    }

    // Ads the fields
    app.stage.addChild(possibleField[possibleFieldCounter]);

    // Shows where they are
    positions[posx][posy] = 8;

    // Keeps count of the fields
    possibleFieldCounter++;
}

// Deletes the fields
function deletePossibleFields() {
    // Deletes the fields
    for (let i = 0; i <= possibleFieldCounter; i++) {
        app.stage.removeChild(possibleField[i]);
        delete possibleField[i];
    }
    possibleFieldCounter = 0;

    // Deletes the values in the Array
    for (let y = 0; y < tileNumbery; y++) {

        for (let x = 0; x < tileNumberx; x++) {

            if (positions[y][x] == 8) {
                positions[y][x] = 0;
            }
        }
    }
    activeFigure = 0;
    activePosition = {x: null, y: null};
}

/* Functions for figures */
// Each figure has a State 0 = search and 1 = Move

let activeFigure;
let activePosition = {x: null, y: null};

// Places the king and the hints
function king(color, posx, posy, state) {
    // For the hints
    if (state == 0) {
        // Data about the selected figure
        activeFigure = -1;
        activePosition = {x: posx, y: posy};

        // Hints generation
        for (let x = -1; x < 2; x++) {

            for (let y = -1; y < 2; y++) {

                if (activePosition.x + x >= 0 && activePosition.y + y >= 0 && activePosition.x + x < tileNumberx && activePosition.y + y < tileNumbery && positions[activePosition.x + x][activePosition.y + y] >= 0) {
                    if (activePosition.x + x != activePosition.x || activePosition.y + y != activePosition.y) {
                        possibleFields(activePosition.x + x, activePosition.y + y);
                    }

                }
            }
        }



    }else { // For the movement
        positions[activePosition.x][activePosition.y] = 0;
        positions[posx][posy] = color;
        
        kings.position.set(tileCoordinate[posy][posx][0] + 5, tileCoordinate[posy][posx][1] + 5);
    }
}

////////

const kings = PIXI.Sprite.from('king.png');
kings.width = tileWidth - 10;
kings.height = tileHeight - 10;
kings.position.set(tileCoordinate[0][0][0] + 5, tileCoordinate[0][0][1] + 5);

/*const pawns = PIXI.Sprite.from('pawn.png');
pawns.width = tileWidth - 10;
pawns.height = tileHeight - 10;
pawns.position.set(tileCoordinate[1][1][0] + 5, tileCoordinate[1][1][1] + 5);*/

const pawns = PIXI.Sprite.from('king.png');
pawns.width = tileWidth - 10;
pawns.height = tileHeight - 10;
pawns.position.set(tileCoordinate[1][1][0] + 5, tileCoordinate[1][1][1] + 5);

app.stage.addChild(kings, pawns);