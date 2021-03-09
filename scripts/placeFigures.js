/* Possible fields creator */

// Variables for the possible fields
var possibleFieldSize = 40;
var possibleFiledSizeHover = 5;
var possibleFieldCounter = 0;

var possibleField = [];

// Creates the possible fields
function possibleFields(posx, posy) {
    // Translates the fields to the actual position
    var truePosX = tileCoordinate[posy][posx][0];
    var truePosY = tileCoordinate[posy][posx][1];
    // Offset to center the fields
    var posPlus = possibleFieldSize / 2;

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
    for (var i = 0; i <= possibleFieldCounter; i++) {
        app.stage.removeChild(possibleField[i]);
        delete possibleField[i];
    }
    possibleFieldCounter = 0;

    // Deletes the values in the Array
    for (var y = 0; y < tileNumbery; y++) {

        for (var x = 0; x < tileNumberx; x++) {

            if (positions[y][x] == 8) {
                positions[y][x] = 0;
            }
        }
    }
}

/* Functions for figures */
// Each figure has a State 0 = search and 1 = Move

var activeFigure;
var activePosition;

function king(color, posx, posy, state) {
    if (state == 0) {
        activeFigure = -1;
        activePosition = {x: posx, y: posy};
        possibleFields(1, 0);
        possibleFields(2, 0);
    }else {
        positions[activePosition.y][activePosition.x] = 0;
        positions[posx][posy] = color;
        kings.position.set(tileCoordinate[posy][posx][0] + 5, tileCoordinate[posy][posx][1]);
    }
}

////////

const kings = PIXI.Sprite.from('king.png');
kings.width = tileWidth - 10;
kings.height = tileHeight - 10;
kings.position.set(tileCoordinate[0][0][0] + 5, tileCoordinate[0][0][1] + 5);

const pawns = PIXI.Sprite.from('pawn.png');
pawns.width = tileWidth - 10;
pawns.height = tileHeight - 10;
pawns.position.set(tileCoordinate[1][1][0] + 5, tileCoordinate[1][1][1] + 5);

app.stage.addChild(kings, pawns);